
import React from 'react'
import '../../../css/register.css';
import NavbarComponent from "./navBarRegistro";
import StepComponent from "./StepComponent";
import {Redirect} from 'react-router-dom';
import { Card, CardTitle,
        Container} from 'reactstrap';
import logo2 from "../../../imagenes/banner_reg_ofi.png";

function Register (props) {
  const [checkTarjeta, setCheckTarjeta] = React.useState(false)

  const auth = parseInt(localStorage.getItem('auth'), 10)
  const role = localStorage.getItem('role')

  if (auth && (role == '2' || role == '3')) {
    return <Redirect to='/admin/dashboard/report'/>
  } else if (auth && (role == '0' || role == '1')) {
    return <Redirect to='/'/>
  } else {
    return (
            <div id="cont_general">

                <div className="cabecera">
                    <NavbarComponent isLogin={0}/>
                </div>

                <div id="cont_secForm">
                    <div id="seccionForm">
                        <div className="img_urbi col-md-5">
                            <img src={logo2} />
                        </div>
                        <div className="panelDatos col-md-7">
                            <Container className="container_reg">
                                <Card body id="tarjeta" className="trj">
                                    <div id="logo_resp">
                                        <img src={logo2} />
                                    </div>
                                    <CardTitle>
                                    <h4> ¡Registrate en UrbazApp!</h4>
                                      <p>  Todo lo que buscas más cerca que nunca </p>
                                      <div id="feedbackvacios"></div>
                                    </CardTitle>
                                    <div id="contenido_registro">
                                        <form>
                                        <StepComponent
                                            signUp={props.signUp}
                                            usernames = {props.usernames}
                                            validarCedula={props.validarCedula}
                                            validarTelefono={props.validarTelefono}
                                            validarCorreo = {props.validarCorreo}
                                            validarVacios = {props.validarvacios}
                                            handleModal={props.handleModal}/>
                                        </form>
                                    </div>
                                </Card>
                            </Container>

                        </div>
                    </div>
                </div>
            </div>

        
       


    );
    }
    

}


export default Register
