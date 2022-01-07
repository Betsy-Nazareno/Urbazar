import React, { useState,useEffect } from 'react'
import { Navbar, NavbarToggler, NavbarBrand } from 'reactstrap'
import axios from 'axios'
import ToggleMenu from './ToggleMenuPC'
import '../../../css/MainComponent.css'
import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
export let idCarritoDef
export let cantidadProd = 0
import data from '../../../enviroment';
const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [cantProductos, setCantProductos] = useState(0)
  const [idCarrito, setIdCarrito] = useState(0)
  const toggle = () => setIsOpen(true)

  useEffect(() => {
    console.log(localStorage.getItem('userId'))
    
  },[])

  idCarritoDef = idCarrito
  let cantidad = 0


  return (
    <>
      <Navbar color='faded' dark className='navbar'>
        <NavbarToggler onClick={toggle} className="toggler mr-2 custom-toggler" />
        {/* menu toggler */}
        <ToggleMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <NavbarBrand data-intro="¡Bienvenido a UrbazApp! Demos un tour" href='/' className='logo'><span className="Urbaz-part">Urbaz</span><span className="app-part">App</span></NavbarBrand>
        <NavbarBrand href='/' className='logo2'>UApp</NavbarBrand>

        <form className='mr-auto search_form' action={`http://${window.location.host}/buscador`}>
          <input id="myInput" data-intro="Busca productos de tu interés" type='text' placeholder='Buscar...' name='search' required />
          <button type='submit'><i className='fas fa-search mr-auto'></i></button>
        </form>

        <p id='p_bienvenido'>Bienvenido</p>
        <p id='nombre_user'>{localStorage.getItem('nombre_usuario')}!</p>

        <button type='button' className='button_nav boton_notificacion'><i className='fas fa-bell fa-lg'></i></button>
        <div id="cont_icon_carrito">
          <a href={`/carrito/${Number(idCarrito)}`}><button type='button' data-intro="Accede a tu carrito de compras" className='button_nav' href="/carrito"><i className='fas fa-shopping-cart fa-lg'></i> </button></a>
          <p> {cantProductos}
          </p>
        </div>
      </Navbar>

    </>
  )
}

export default NavbarComponent
