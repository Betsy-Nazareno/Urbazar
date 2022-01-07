import React, {Component} from 'react';
import LoginPV from "./LoginPV";
import axios from 'axios';


class LoginPC extends Component{




    login = async() =>{
               
        
        let data = {
            'username': document.getElementById('username').value,
            'password': document.getElementById('password').value,
        }

        let feed = document.getElementById("FeedbackLogin");
    
                console.log(data)
                axios.post(`http://localhost:3000/login`, data)
                    .then(response => {
                        if (response.status == 200) {                            
                            return response.data
                        }
                    })
                    .then(res => {
                        if (res.data.role!=2){
                            feed.innerHTML = "No tienes permisos de acceso";
                            feed.style.color="red";

                        }
                        else{
                            console.log(res)
                            localStorage.setItem('user', res.data.username);
                            localStorage.setItem('nombre_usuario', res.data.nombre);
                            localStorage.setItem('userId', res.data.id);
                            localStorage.setItem('auth', 1);
                            localStorage.setItem('token', res.token);
                            localStorage.setItem('role', res.data.role);
                            document.location.href="/report"
                        
                       
                        }
                    
                    })
    
                    .catch ( (err) => {
                        feed.innerHTML = "Usuario o clave incorrectos";
                        
                        feed.style.color="red";
                        console.log(err);
            } )
    }

    

    
    render(){
        return( <LoginPV 
            login={this.login}
            auth= {this.props.auth} /> );
    }


}


  
export default LoginPC;