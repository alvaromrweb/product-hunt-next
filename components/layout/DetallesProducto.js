import React from 'react'
import styled from '@emotion/styled'
import { formatDistanceToNow } from 'date-fns'
import es from 'date-fns/locale/es'
import Link from 'next/link'

const Imagen = styled.img`
    width: 200px;
`

const Producto = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--gris3);
`

const Descripcion = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`

const Comentarios = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;


    div {
        display: flex;
        align-items: center;
        border: 1px solid var(--gris3);
        padding: .3rem 1rem;
        margin-right: 2rem;
    }

    img {
        width: 2rem;
        margin-right: 2rem;
    }

    p {
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;

        &:last-of-type {
            margin: 0;
        }
    }
`

const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid var(--gris3);
    padding: 1rem 3rem;

    div {
        font-size: 2rem;
    }
    p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`

const Titulo = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    cursor:pointer;
    color: var(--gris);
`

const TextoDescripcion = styled.p`
    font-size: 1.6rem;
    margin: 0;
    color: #888;

`

const DetallesProducto = ({producto}) => {
  return (
    <Producto>
        <Descripcion>
            <div>
                <Imagen src={producto.imagen} />
            </div>
            <div>
                <Link href="/productos/[id]" as={`/productos/${producto.id}`}>
                    <Titulo>{producto.nombre}</Titulo>
                </Link>
                <TextoDescripcion>{producto.descripcion}</TextoDescripcion>
                <Comentarios>
                    <div>
                        <img src='/static/img/comentario.png' />
                        <p>{producto.comentarios.length}</p>

                    </div>
                </Comentarios>
                <p>Publicado hace: {formatDistanceToNow(new Date(producto.creado), {locale: es})}</p>
            </div>
        </Descripcion>
        <Votos>
            <div>&#9650;</div>
            <p>{producto.votos}</p>
        </Votos>
            
    </Producto>
  )
}

export default DetallesProducto