import React, { useState } from "react"
import Layout from "../components/layout/Layout"
import { css } from "@emotion/react"
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario"
import useValidacion from "../hooks/useValidacion"
import validarRegistro from "../validacion/validarRegistro"
import firebase from "../firebase"
import Router from 'next/router'

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: '',
}

export default function Registro() {


  const registrar = async () => {
    try {
      await firebase.registrar(valores.nombre, valores.email, valores.password)
      Router.push('/')
    } catch (error) {
      console.log(error)
      console.error('Hubo un error al crear el usuario ', error.message)
      setError(error.message)
    }
    
  }

  const [error, setError] = useState(false)

  const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarRegistro, registrar)


  return (
    <div>
      <Layout>
        <>
        </>
        <h1 css={css`
          text-align: center;
          margin-top: 5rem;
        `}>Registro</h1>
        <Formulario onSubmit={handleSubmit} noValidate>
          <Campo>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" placeholder="Tu nombre" name="nombre" value={valores.nombre} onChange={handleChange} onBlur={handleBlur} />
          </Campo>

          {errores.nombre && <Error>{errores.nombre}</Error>}

          <Campo>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Tu email" name="email" value={valores.email} onChange={handleChange} onBlur={handleBlur} />
          </Campo>

          {errores.email && <Error>{errores.email}</Error>}

          <Campo>
            <label htmlFor="password">Cotnraseña</label>
            <input type="password" id="password" placeholder="Tu contraseña" name="password" value={valores.password} onChange={handleChange} onBlur={handleBlur} />
          </Campo>

          {errores.password && <Error>{errores.password}</Error>}

          {error && <Error>{error}</Error>}

          <InputSubmit type="submit" value="Crear cuenta" />
        </Formulario>
      </Layout>
      
    </div>
  )
}
