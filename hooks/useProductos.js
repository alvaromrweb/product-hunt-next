import React, {useState, useEffect, useContext} from 'react'
import { FirebaseContext } from '../firebase'
import {collection, getDocs, query, orderBy} from 'firebase/firestore'

const useProductos = orden => {
    const [productos, setProductos] = useState([])

    const {firebase} = useContext(FirebaseContext)

    useEffect( () => {
    const getProductos = async () => {
        const q = query(collection(firebase.db, "productos"), orderBy(orden, "desc"));
        const querySnapshot = await getDocs(q);
        const productos = querySnapshot.docs.map(doc => {
        return {
            id: doc.id,
        ...doc.data()
        }
        });
        setProductos(productos)
        
    }
    getProductos()
    }, [])

    return {
        productos
    }
}

export default useProductos