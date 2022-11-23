import React, { useEffect, useContext, useState } from 'react'
import {useRouter} from 'next/router'
import {FirebaseContext} from '../../firebase'
import {collection, getDoc, doc, updateDoc, increment, deleteDoc} from 'firebase/firestore'
import Layout from '../../components/layout/Layout'
import Error404 from '../../components/layout/404'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { formatDistanceToNow } from 'date-fns'
import es from 'date-fns/locale/es'
import { Campo, InputSubmit } from '../../components/ui/Formulario'
import {Boton, BotonA} from '../../components/ui/Boton'

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: var(--naranja);
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`

const Producto = () => {

    const [producto, setProducto] = useState({})
    const [error, setError] = useState(false);
    const [comentario, setComentario] = useState({});
    const [consultarDB, setConsultarDB] = useState(true)

    const router = useRouter()
    const {query: {id}} = router

    const {firebase, usuario} = useContext(FirebaseContext)

    useEffect(() => {
      if(id && consultarDB) {
        const getProducto = async () => {
            const productoQuery = await doc(collection(firebase.db, 'productos'), id);             
            const productoID = await  getDoc(productoQuery);
            if(productoID.exists()){
                setProducto(productoID.data());
                setConsultarDB(false)
            }else{
                setError(true);
                setConsultarDB(false)
            }
        }
        getProducto()
      }
    }, [id])

    const votarProducto = () => {
        if (!usuario) {
            return router.push('/login')
        }

        if(producto.haVotado.includes(usuario.uid)) return

        const nuevoTotal = producto.votos + 1

        const nuevoHaVotado = [...producto.haVotado, usuario.uid]

        //Query de tu colección en Firebase
        const docRef = doc(firebase.db, "productos", `${id}`);
        
        updateDoc(docRef, {
            votos: increment(nuevoTotal), 
            haVotado: nuevoHaVotado
        });

        setProducto({
            ...producto,
            votos: nuevoTotal
        })

        setConsultarDB(true)
    }

    const esCreador = id => {
        if(producto.creador.id === id) {
            return true
        } else {
            return false
        }
    }

    const submitComentario = async e => {
        e.preventDefault()

        if(!usuario) {
            return
        }

        comentario.usuarioId = usuario.uid
        comentario.usuarioNombre = usuario.displayName

        const nuevosComentarios = [...producto.comentarios, comentario]

        const productoQuery = await doc(collection(firebase.db, 'productos'), id);
  
        updateDoc(productoQuery, {
            comentarios: nuevosComentarios       
        });

        setProducto({...producto, comentarios: nuevosComentarios})
        setConsultarDB(true)
    }

    const puedeBorrar = () => {
        if(!usuario) return false

        if(producto.creador.id === usuario.uid) return true
    }

    const eliminarProducto = async () => {
        if(!usuario) {
            router.push('/login')
        }

        if(producto.creador.id === usuario.uid) {
            router.push('/')
        }

        try {
            const docRef = doc(firebase.db, "productos", `${id}`);

            await deleteDoc(docRef)

            router.push('/')
            
        } catch (error) {
            console.log(error)
        }

    }


    if(Object.keys(producto).length === 0 && !error) return 'Cargando...'

  return (
    <Layout>
        <>
            {error ? <Error404/> : (

                <div className='contenedor'>
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}>
                        {producto.nombre}
                    </h1>
                    <ContenedorProducto>
                        <div>
                            <p>Publicado hace: {formatDistanceToNow(new Date(producto.creado), {locale: es})}</p>
                            <p>Por: {producto.creador.nombre} de {producto.empresa}</p>
                            <img src={producto.imagen} />
                            <p>{producto.descripcion}</p>

                            {usuario && (
                                <>
                                    <h2>Agrega tu comentario</h2>
                                    <form onSubmit={submitComentario}>
                                        <Campo>
                                            <input type='text' name='mensaje' onChange={e => setComentario({...comentario, [e.target.name]: e.target.value})} />
                                        </Campo>
                                        <InputSubmit type="submit" value="Agregar comentario" />
                                    </form>

                                    <h2 css={css`
                                        margin: 2rem 0;
                                    `}>Comentarios</h2>
                                    
                                    {producto.comentarios.length === 0 ? 'Aún no hay comentarios' : (
                                        <ul>
                                            {producto.comentarios.map((comentario, i) => (
                                                <li key={i} css={css`
                                                    border: 1px solid var(--gris3);
                                                    padding: 2rem;
                                                `}>
                                                    <p>{comentario.mensaje}</p>
                                                    <p>Escrito por: <span css={css`font-weight:bold;`}>{comentario.usuarioNombre}</span></p>
                                                    {esCreador(comentario.usuarioId) && <CreadorProducto>Es creador</CreadorProducto>}
                                                </li>
                                            ))}
                                        </ul>

                                    )}
                                </>
                            )}
                        </div>

                        <aside>
                            <BotonA target="_blank" bgColor="true" href={producto.url} >Visitar URL</BotonA>

                            <div css={css`
                                margin-top: 5rem;
                            `}>
                                <p css={css`
                                    text-align: center;
                                `}>{producto.votos} Votos</p>

                                {usuario && (
                                    <Boton onClick={votarProducto}>Votar</Boton>
                                )}
                            </div>
                        </aside>
                    </ContenedorProducto>
                    {puedeBorrar() && <Boton onClick={eliminarProducto}>Eliminar producto</Boton>}
                </div>
            )}
        </>
    </Layout>
  )
}

export default Producto