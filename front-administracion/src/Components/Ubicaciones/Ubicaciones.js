import React, { useState, useEffect } from 'react'
import { Container, Table, FormGroup, Input, Label } from 'reactstrap'
import { GraphMA } from '../../GraphMA'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
const Ubicaciones = () => {
  const [matriz, setMatriz] = useState('')
  const [source, setSource] = useState('')
  const [dest, setDest] = useState('')
  const [valor, setValor] = useState('')
  const [lista, setLista] = useState([])
  const [listaFilas, setListaFilas] = useState([])
  const [load, setLoad] = useState(false)
  const listItems = () => {
    const l = []
    matriz.vertexes.map((etapa) => {
      l.push(<th>{etapa}</th>)
    })
    return l
  }
  useEffect(() => {
    axios.get('http://localhost:3000/matriz/1').then((response) => {
      const respuesta = JSON.parse(response.data.data)
      const mat = new GraphMA(false)
      console.log(respuesta)
      mat.vertexes = respuesta.vertexes
      mat.capacity = respuesta.capacity
      mat.matrix = respuesta.matrix
      mat.directed = respuesta.directed
      setMatriz(mat)
      setLoad(true)
    }).catch((err) => {
      console.log(err)
      axios.post('http://localhost:3000/matriz', {
        id: 1,
        data: JSON.stringify(new GraphMA(false)),
        urbanizacion: 'Villa Bonita'
      }).then((response) => {
        console.log(response)
        window.location.reload()
      }).catch((err) => {
        console.log(err)
      })
    })
  }, [])
  const listRows = () => {
    const l = []
    matriz.vertexes.map((etapa) => {
      l.push(<tr>
                <td><strong>{etapa}</strong></td>
                {matriz.vertexes.map((valor) => {
                  return <td key="row">{matriz.getEdge(valor, etapa)}</td>
                })}
            </tr>)
    })
    return l
  }
  const auth = parseInt(localStorage.getItem('auth'), 10)
  const role = localStorage.getItem('role')

  if (auth && role === '3') {
    return (

            <Container className="mt-5 mb-5 mx-5">
                {load
                  ? <>   <h1 className="mb-3">Etapas de la urbanización: Villa Bonita</h1>
                <Table bordered className="bg-white text-center table-bordered">
                    <thead>
                        <th key="field">Etapas</th>
                        {lista}
                    </thead>
                    <tbody>
                        {listaFilas}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center">
                <button className="btnUapp" onClick={e => {
                  setLista(listItems())
                  setListaFilas(listRows())
                }}>Refresh</button>
                </div>
                <div className="mt-3 card card-body">
                    <h1>
                        Agregar Datos
                    </h1>
                        <FormGroup>
                            <Label for="source">Nombre Etapa Fuente</Label>
                            <Input name="source" id="source" type="text"
                            onChange={e => setSource(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="dest">Nombre Etapa Destino</Label>
                            <Input name="dest" id="dest" type="text"
                            onChange={e => setDest(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="valor">Valor</Label>
                            <Input name="valor" id="valor" type="text"
                            onChange={e => setValor(e.target.value)}></Input>
                        </FormGroup>
                        <div className="d-flex justify-content-center">
                        <button className="btnUapp" onClick={e => {
                          matriz.addVertex(source)
                          matriz.addVertex(dest)
                          matriz.addEdge(source, dest, valor)
                          axios.put('http://localhost:3000/matriz/1', {
                            id: 1,
                            data: JSON.stringify(matriz),
                            urbanizacion: 'Villa Bonita'
                          }).then(() => {

                          })
                          setLista(listItems())
                          setListaFilas(listRows())
                        }}>Agregar</button>
                        </div>

                </div>
                <div className="mt-3 card card-body">
                    <h1>
                        Actualizar Matriz
                    </h1>
                        <FormGroup>
                            <Label for="source">Nombre Etapa Fuente</Label>
                            <Input name="source" id="source" type="text"
                            onChange={e => setSource(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="dest">Nombre Etapa Destino</Label>
                            <Input name="dest" id="dest" type="text"
                            onChange={e => setDest(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="valor">Valor</Label>
                            <Input name="valor" id="valor" type="text"
                            onChange={e => setValor(e.target.value)}></Input>
                        </FormGroup>
                        <div className="d-flex justify-content-center">
                        <button className="btnUapp" onClick={e => {
                          matriz.setEdge(source, dest, valor)
                          axios.put('http://localhost:3000/matriz/1', {
                            id: 1,
                            data: JSON.stringify(matriz),
                            urbanizacion: 'Villa Bonita'
                          }).then(() => {

                          })
                          setLista(listItems())
                          setListaFilas(listRows())
                        }}>Cambiar</button>
                        </div>

                </div></>
                  : <></>}

            </Container>
    )
  } else {
    return <Redirect to="/"/>
  }
}

export default Ubicaciones
