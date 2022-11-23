import React, { useState, useContext } from "react"
import Layout from "../components/layout/Layout"
import { css } from "@emotion/react"
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario"
import useValidacion from "../hooks/useValidacion"
import validarProducto from "../validacion/validarProducto"
import { FirebaseContext } from "../firebase"
import Router from 'next/router'
import { collection , addDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import Error404 from "../components/layout/404"

const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  imagen: '',
  url: '',
  descripcion: '',
}

export default function NuevoProducto() {


  const crearProducto = async () => {
    if(!usuario) {
      Router.push('/login')
    }

    const producto = {
      nombre: nombre.value,
      empresa: empresa.value,
      imagen: URLImage,
      url: url.value,
      descripcion: descripcion.value,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotado: []
    }

    try {
        await addDoc(collection(firebase.db,"productos"), producto);
        Router.push('/')
    } catch (error) {
        console.error(error)
    }
    
  }

  // States para la subida de la imagen
  const [uploading, setUploading] = useState(false);
  const [URLImage, setURLImage] = useState('');
  const [error, setError] = useState(false)

  const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarProducto, crearProducto)

  const {firebase, usuario} = useContext(FirebaseContext)

  const handleImageUpload = e => {
    // Se obtiene referencia de la ubicación donde se guardará la imagen
    const file = e.target.files[0];
    const imageRef = ref(firebase.storage, 'products/' + file.name);

    // Se inicia la subida
    setUploading(true);
    const uploadTask = uploadBytesResumable(imageRef, file);

    // Registra eventos para cuando detecte un cambio en el estado de la subida
    uploadTask.on('state_changed', 
        // Muestra progreso de la subida
        snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Subiendo imagen: ${progress}% terminado`);
        },
        // En caso de error
        error => {
            setUploading(false);
            console.error(error);
        },
        // Subida finalizada correctamente
        () => {
            setUploading(false);
            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                console.log('Imagen disponible en:', url);
                setURLImage(url);
            });
        }
    );
  };


  return (
    <div>
      <Layout>
        {!usuario ? <Error404 /> : (
          <>
            <h1 css={css`
              text-align: center;
              margin-top: 5rem;
            `}>Nuevo Producto</h1>
            <Formulario onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>Información general</legend>
              
                <Campo>
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" placeholder="Nombre del producto" name="nombre" value={valores.nombre} onChange={handleChange} onBlur={handleBlur} />
                </Campo>

                {errores.nombre && <Error>{errores.nombre}</Error>}

                <Campo>
                  <label htmlFor="empresa">Empresa</label>
                  <input type="text" id="empresa" placeholder="Nombre de empresa" name="empresa" value={valores.empresa} onChange={handleChange} onBlur={handleBlur} />
                </Campo>

                {errores.empresa && <Error>{errores.empresa}</Error>}

                <Campo>
                  <label htmlFor="imagen">Imagen</label>
                  <input type="file" id="imagen" name="imagen" accept="image/*" onChange={handleImageUpload} />
                </Campo>

                {errores.imagen && <Error>{errores.imagen}</Error>}

                <Campo>
                  <label htmlFor="url">URL</label>
                  <input type="text" id="url" placeholder="URL de tu producto" name="url" value={valores.url} onChange={handleChange} onBlur={handleBlur} />
                </Campo>

                {errores.url && <Error>{errores.url}</Error>}

              </fieldset>

              <fieldset>

                <legend>Sobre tu producto</legend>

                <Campo>
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea id="descripcion" name="descripcion" value={valores.descripcion} onChange={handleChange} onBlur={handleBlur} />
                </Campo>

                {errores.descripcion && <Error>{errores.descripcion}</Error>}

              </fieldset>

              {error && <Error>{error}</Error>}

              <InputSubmit type="submit" value="Crear producto" />
            </Formulario>
          </>
        )}
      </Layout>
      
    </div>
  )
}
