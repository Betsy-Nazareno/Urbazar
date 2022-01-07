import React, { Component } from 'react'
import PanelEtapasV from './PanelEtapasV'
import ModalAdd from './ModalEtapa'
import axios from 'axios'

class Admin_EtapasPC extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liveDemo: false,
      id_persona: 0,
      form: {
        nombre_etapa: '',
        id_etapa: '',
        ubicacion: '',
        nombre_admin: ''

      }
    }
    this.handleModal = this.handleModal.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.addEtapa = this.addEtapa.bind(this)
  }

  addEtapa () {
    // Por el momento todas las etapas van a ser registradas con el identificador de la urbanizacion 1
    const data_etapa = {
      id: parseInt(this.state.form.id_etapa, 10),
      nombre: this.state.form.nombre_etapa,
      ubicacion: this.state.form.ubicacion,
      idUrbanizacion: 1
    }
    console.log(data_etapa)

    axios.post('http://localhost:3000/etapas', data_etapa)
      .catch(e => console.log(e))

    axios.get('http://localhost:3000/personas?filter[where][nombre]=' + this.state.form.nombre_admin)
      .then(response => response.data[0])
      .then(res => {
        if (res) {
          res.role = 3
          return (res)
        }
      })
      .then(res => {
        const persona = res

        const data_admin = {
          idPersona: parseInt(res.id, 10),
          idEtapa: parseInt(this.state.form.id_etapa, 10)
        }

        axios.post('http://localhost:3000/administrador-etapas', data_admin)
          .then(response => {
            axios.put('http://localhost:3000/personas/' + persona.id, persona)
              .then(res => {
                this.handleModal()
              })
              .catch(e => console.log(e))
          })
          .catch(e => console.log(e))
      })
      .catch(e => console.log(e))
  }

  handleModal () {
    this.setState({ liveDemo: !this.state.liveDemo })
  }

  handleForm (e) {
    this.setState({
      form: {
        ...this.state.form, [e.target.name]: e.target.value
      }
    })
    console.log(this.state.form)
  }

  render () {
    return (
        <>
        <PanelEtapasV
            handleModal={this.handleModal}
             />

        <ModalAdd
            handleModal={this.handleModal}
            estado={this.state.liveDemo}
            handleForm= {this.handleForm}
            id_etapa= {this.state.form.id_etapa}
            addEtapa= {this.addEtapa}/>
        </>
    )
  }
}

export default Admin_EtapasPC
