import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Table } from 'reactstrap'
const Productos = () => {
  const [productoLista, setProductoLista] = useState([])
  const [load, setLoad] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:3000/productos/').then((response) => {
      setProductoLista(response.data)
      setLoad(true)
    })
  }, [])
  return (
        <Container className="d-flex justify-content-center mt-5">
            <Table bordered hover className="bg-white ml-5 text-center">
                <thead>
                    <tr>
                        <td colSpan="5">Productos</td>
                    </tr>
                </thead>
                <tbody>
                    {load
                      ? productoLista.map((item, id) => {
                        return (
                            <tr key={id}>
                                <td>{item.id}</td>
                                <td>{item.nombre}</td>
                                <td>{item.precio}</td>
                                <td>{item.activo === 1 ? 'Activo' : 'Desactivado' }</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-success mx-2" onClick={e => {
                                          axios.get(`http://134.209.215.193:3000/productos/${item.id}`).then((response) => {
                                            const producto = response.data
                                            producto.activo = 1
                                            axios.put(`http://134.209.215.193:3000/productos/${item.id}`, producto).then((response) => {
                                              window.location.reload()
                                            })
                                          })
                                        }}>Activar</button>
                                        <button className="btn btn-dark mx-2" onClick={e => {
                                          axios.get(`http://134.209.215.193:3000/productos/${item.id}`).then((response) => {
                                            const producto = response.data
                                            producto.activo = 0
                                            axios.put(`http://134.209.215.193:3000/productos/${item.id}`, producto).then((response) => {
                                              window.location.reload()
                                            })
                                          })
                                        }}>Desactivar</button>
                                        <button className="btn btn-danger mx-2" onClick={e => {
                                          axios.get(`http://134.209.215.193:3000/productos/${item.id}`).then((response) => {
                                            axios.delete(`http://134.209.215.193:3000/productos/${item.id}`).then((response) => {
                                              window.location.reload()
                                            })
                                          })
                                        }}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        )
                      })
                      : <></> }
                </tbody>
            </Table>
        </Container>
  )
}

export default Productos
