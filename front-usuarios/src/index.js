import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import LoginComponent from './Components/UsersComponents/Login/LoginPC'
import Register from './Components/UsersComponents/Registro/RegisterPC'
import CarritoComponent from './Components/UsersComponents/Carrito/CarritoPC'
import ProductComponent from './Components/UsersComponents/Producto/ProductDeatilComponent'
import MainComponent from './Components/UsersComponents/Main/MainPC'
import CategoriaComponent from './Components/UsersComponents/navBar/CategoriaComponent'
import ContactanosComponent from './Components/UsersComponents/Adicionales/ContactanosComponent'
import DesarrolladoresComponent from './Components/UsersComponents/Adicionales/DesarrolladoresComponent'
import AboutUsComponent from './Components/UsersComponents/Adicionales/AboutUSComponent'
import testJSON from './Components/testJSON'
import GraphComponent from './Components/AdminsComponents/GraphAndMaps/GraphComponent'
import MainAdmins from './Components/AdminsComponents/Main/MainAdmins'
import PanelProducts from './Components/AdminsComponents/PanelProductos/PanelProducts'
import AccountComponent from './Components/AdminsComponents/Account/Account'
import ClientesComponent from './Components/AdminsComponents/PanelClientes/ClientesComponent'
import MapComponent from './Components/AdminsComponents/GraphAndMaps/MapComponent'
import CatalogoComponent from './Components/UsersComponents/Busqueda/CatalogoComponent'
import PerfilComponent from './Components/UsersComponents/Perfil/PerfilPC'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import RootR from './store/reducers/RootR'

const Index = () => {
  React.useEffect(() => {
    if (!localStorage.getItem('carrito')) {
      localStorage.setItem('carrito', '')
    }
    if (!localStorage.getItem('precio')) {
      localStorage.setItem('precio', 0)
    }
    if (!localStorage.getItem('contador_items')) {
      localStorage.setItem('contador_iems', 0)
    }
    if (!localStorage.getItem('auth')) {
      localStorage.setItem('auth', 0)
    }
    if (!localStorage.getItem('nombre_usuario')) {
      localStorage.setItem('nombre_usuario', '')
    }
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', '')
    }
    if (!localStorage.getItem('role')) {
      localStorage.setItem('role', 0)
    }
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', '')
    }
    if (!localStorage.getItem('etapa')) {
      localStorage.setItem('etapa', '')
    }
  })

  return (
    <React.StrictMode>
      <Router>
          <Switch>
            <Route path="/login" exact component={LoginComponent}/>
            <Route path="/registro" exact component={Register}/>
            <Route path="/" exact component={MainComponent}/>
            <Route path="/carrito/:idCarrito" exact component={CarritoComponent}/>
            <Route path="/productdetail/:id/:idvendedor" exact component={ProductComponent}/>
            <Route path="/categoria" exact component={CategoriaComponent}/>
            <Route path="/contactanos" exact component={ContactanosComponent}/>
            <Route path="/devs" exact component={DesarrolladoresComponent}/>
            <Route path="/aboutus" exact component={AboutUsComponent}/>
            <Route path="/test" exact component={testJSON}/>
            <Route path="/admin/dashboard" exact component={MainAdmins}/>
            <Route path="/admin/dashboard/report" exact component={GraphComponent}/>
            <Route path="/admin/dashboard/panel" exact component={PanelProducts}/>
            <Route path="/admin/dashboard/account" exact component={AccountComponent}/>
            <Route path="/admin/dashboard/customer" exact component={ClientesComponent}/>
            <Route path="/admin/dashboard/map" exact component={MapComponent}/>
            <Route path="/buscador" exact component={CatalogoComponent}/>
            <Route path="/buscador/:id" exact>
              <CatalogoComponent></CatalogoComponent>
            </Route>
            <Route path="/perfil" exact component={PerfilComponent}/>
            </Switch>
      </Router>
    </React.StrictMode>
  )
}

const store = createStore(
  RootR,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
)

//Comentarios*************
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
