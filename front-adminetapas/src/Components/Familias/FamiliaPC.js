import React, { Component } from 'react'
import FamiliaPV from './FamiliaPV'
import axios from 'axios'
import crypto from 'crypto'
// var crypto = require("crypto");

class FamiliaPC extends Component {
  constructor (props) {
    super(props)
    this.state = {
      etapas: []
    }
  }

  generateCode () {
    const textarea = document.getElementById('codigoF')
    textarea.textContent = crypto.randomBytes(5).toString('hex')
  }

  addFamily () {
    const apellidoComp = document.getElementById('apellidos')
    const etapaComp = document.getElementById('select_et')
    const codigoFComp = document.getElementById('codigoF')

    const data = {
      idEtapa: parseInt(etapaComp.value, 10),
      apellido: apellidoComp.value,
      clave: codigoFComp.value
    }

    console.log(data)

    axios.post('http://localhost:3000/familias', data)
      .catch(e => console.log(e))

    apellidoComp.value = ''
    etapaComp.value = ''
    codigoFComp.value = ''
    document.location.href = '/familias'
  }

  render () {
    return (
            <FamiliaPV
                generateCode = {this.generateCode}
                addFamily = {this.addFamily}/>
    )
  }
}

export default FamiliaPC
