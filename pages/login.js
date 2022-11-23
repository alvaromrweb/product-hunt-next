import React, { useState } from "react"
import Layout from "../components/layout/Layout"
import { css } from "@emotion/react"
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario"
import useValidacion from "../hooks/useValidacion"
import validarLogin from "../validacion/validarLogin"
import firebase from "../firebase"
import Router from 'next/router'

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: '',
}

export default function Login() {


  const login = async () => {
    try {
      const usuario = await firebase.login(valores.email, valores.password)
      console.log(usuario)
      Router.push('/')
    } catch (error) {
      console.log(error)
      console.error('Hubo un error al iniciar sesión ', error.message)
      setError(error.message)
    }
    
  }

  const [error, setError] = useState(false)

  const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarLogin, login)


  return (
    <div>
      <Layout>
        <>
        </>
        <h1 css={css`
          text-align: center;
          margin-top: 5rem;
        `}>Login</h1>
        <Formulario onSubmit={handleSubmit} noValidate>

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

          <InputSubmit type="submit" value="Login" />
        </Formulario>
      </Layout>
      
    </div>
  )
}
