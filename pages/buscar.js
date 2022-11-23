import Layout from "../components/layout/Layout"
import { useRouter } from "next/router"
import DetallesProducto from '../components/layout/DetallesProducto'
import React, {useEffect, useState} from 'react'
import useProductos from "../hooks/useProductos"

export default function Buscar() {

  const router = useRouter()
  const busqueda = router.query.q.toLowerCase()

  const { productos } = useProductos('creado')

  const [resultado, setResultado] = useState([])

  useEffect(() => {
    const productosFiltrados = productos.filter(producto => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    })
    setResultado(productosFiltrados)
  }, [busqueda, productos])
  

    return (
      <div>
        <Layout>
          <div className='listado-productos'>
            <div className='contenedor'>
              <div className='bg-white'>
                {resultado.map(producto => (
                  <DetallesProducto key={producto.id} producto={producto} />
                ))}
              </div>
            </div>
          </div>
  
        </Layout>
        
      </div>
    )
}
