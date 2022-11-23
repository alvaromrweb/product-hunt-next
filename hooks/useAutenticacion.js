import React, { useState, useEffect } from "react";
import firebase from "../firebase";

function useAutenticacion () {
    const [userLogged, setUserLogged] = useState(null)

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if(usuario) {
                setUserLogged(usuario)
            } else {
                setUserLogged(null)
            }
        })
      return () => unsuscribe()
    }, [])
    
    return userLogged
}

export default useAutenticacion