import React, {useState, useEffect} from "react";
import { View, ScrollView, Text } from "react-native"
import {
    NativeBaseProvider,
    StatusBar, Input,
    Button, Select,
    CheckIcon, Stack,
    HStack, Center,
    IconButton
} from 'native-base'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import PaymentComponent from "../Payment/PaymentComponent";
import {
    validarCedula, validarTelefono, 
    validarCorreo, validarContrasenia, 
    validarSimilitudContrasenias
    } from "./RegistroPC";
import data from '../../../enviroment';
import axios from 'axios';

function getEdades() {
    let ages = []
    for (let i = 12; i < 100; i++) {
        ages.push(i.toString())
    }
    return ages
}


const Register= ( props) => {
    const [form, setForm] = useState({
        nombre: "",
        genero:"",
        edad:0,
        identificacion: "",
        telefono: "",
        correo: "",
        username: "",
        password: "",
        password2: "",
        nro_tarjeta: "",
        fecha_tarjeta: "",
        cvc_tarjeta: "",
        codigoF: ""
      })

    const [checkCodigo, setCheckCodigo] = useState(false)
    const [userNames, setUserNames] = useState([])

    const signUp = async() =>{
        const checkCedula = validarCedula(form.identificacion)
        const checkTelefono = validarTelefono(form.telefono)
        const checkCorreo = validarCorreo(form.correo)
        const checkUsername = validarUsername()
        const checkPassword = validarContrasenia(form.password)
        let checksimilitud=  false
        
        
        const contrasenaValida = checkPassword=== "Contraseña válida"
        if ( contrasenaValida ){
            checksimilitud = validarSimilitudContrasenias(form.password, form.password2)

        }else{
            console.log("No son iguales")
        }

        const datosValidos = checkCedula && checkTelefono && checkCorreo && checkUsername 
        && contrasenaValida && checksimilitud && checkCodigo
        console.log(form.identificacion, checkCedula, checkTelefono, checkCorreo, checkUsername, checkPassword,checksimilitud )
        
        if (datosValidos){
            postToBackend()

        }else{
            alert("Corrija los datos ingresados")
        }
      

    }
    const postToBackend = () =>{
        const data = {
            nombre: form.nombre,
            identificacion: form.identificacion,
            edad: parseInt(form.edad, 10),
            telefono: form.telefono,
            correo: form.correo,
            username: form.username,
            genero: form.genero,
            contrasena: "$2a$10$spFVpvU..pU41zpJxRJnIum93qDM9kjhoIKctFMZsFTsRtJuruKk2",
            vendedorTipo: 0,
            role: 0,
            id_etapa: 1
          }
        axios.post(`http://${data.number}/personas`, data)
        .then(response => {
            response.data
            console.log("LLego aquí")
        })
        .then(res => console.log(res))
        .catch(e=> console.log("dkaj", e))
        alert('Usuario Registrado')

    }

    const validarCodigo = () =>{
        let url = `http://${data.number}/familias?filter[where][clave]=` + form.codigoF;
    
        axios.get(url)
        .then(response => {
          return response.data})
        .then( res=> {
          if(res.length>0 ){
            setCheckCodigo(true)
          }
          
        }) 
        .catch(e=> {
          console.log(e, "Hubo un error");
        })
        
      }

    const validarUsername = ()=> {
        let check = true
        userNames.map( (u)=>{
            if (u.username == form.username){
                check=  false;
            }
        } )
        return check;
      }

    useEffect( ()=>{
        axios.get(`http://${data.number}/personas?filter[fields][username]=true`)
        .then(response => response.data)
        .then(res => {
          setUserNames(res)
        })
        .catch(e => {
          console.log(e)
        })

    }, [])

    const handleChangeForm = (name, valor) =>{
        setForm({
            ...form, [name]: valor
          
        })
      }
    const edades = getEdades()

    return (
        <NativeBaseProvider>
            <View >
                <StatusBar backgroundColor="#506048" barStyle="light-content" />
                <View style={styles.header} >
                    <HStack space={0} alignItems="center">
                        <IconButton
                            icon={<Icon name="chevron-left" color="white" size={25} style={{ marginRight: 0 }} />} 
                            style={{ marginRight: 0 }}
                            onPress={()=>props.navigation.navigate("Login")}
                        />
                        <View>
                            <Text style={styles.title}> UrbazApp </Text>
                            <Text style={styles.subtitle}> ¡Todo lo que buscas más cerca que nunca! </Text>
                        </View>
                    </HStack>
                    
                <View className="Decoradores" style={styles.decorator}/>
            <View className="Decoradores" style={styles.decorator2}/>
                    
                </View>

                <ScrollView stickyHeaderIndices={[1]} >
                    <Stack space={3} alignItems="center" style={{ marginBottom: "50%" }}>
                        {/* Nombre Completo*/}
                        <Center style={{ width: "90%" }}  >
                            <Input 
                                placeholder="Nombre Completo"
                                style={{ width: "100%" }}
                                InputLeftElement={
                                    <Icon name="user" color="#DADADA" size={25} style={{ marginLeft: "3%" }} />
                                }
                                name="nombre" 
                                onChangeText={text => handleChangeForm("nombre", text)}
                            />
                        </Center>

                        {/* Inputs alineados horizontalmente */}
                        <HStack space={3} alignItems="center">
                            {/**Género */}
                            <Center style={{ width: "43%" }}  >
                                <Select
                                    minWidth="100%"
                                    InputLeftElement={<Icon name="venus-mars" color="#DADADA" size={25} style={{ marginLeft: "3%" }} />}
                                    placeholder="Género"
                                    _selectedItem={{
                                        bg: "cyan.600",
                                        endIcon: <CheckIcon size={4} style={{ color: "#DADADA" }} />,
                                    }}
                                    
                                name="genero"
                                onValueChange={value => handleChangeForm("genero", value)}
                                    >

                                    <Select.Item label="Masculino" value="Masculino" />
                                    <Select.Item label="Femenino" value="Femenino" />
                                    <Select.Item label="Otro" value="Otro" />
                                </Select>
                            </Center>
                            {/*Edad*/}
                            <Center style={{ width: "43%" }}  >
                                <Select
                                    minWidth="100%"
                                    InputLeftElement={
                                        <Icon name="sort-numeric-desc" color="#DADADA" size={25} style={{ marginLeft: "3%" }} />
                                    }
                                    placeholder="Edad"
                                    _selectedItem={{
                                        bg: "cyan.600",
                                        endIcon: <CheckIcon size={4} style={{ color: "#DADADA" }} />,
                                    }}
                                    
                                name="edad"
                                onValueChange={value => handleChangeForm("edad", value)}
                                >

                                    {edades.map(edad => (
                                        <Select.Item key={edad} label={edad} value={edad} />
                                    ))}


                                </Select>
                            </Center>
                        </HStack>

                        <View style={styles.divider} />

                        {/**Identificación */}

                        <Center style={{ width: "90%" }}  >
                            <Input variant="outline"
                                placeholder="Identificación"
                                style={{ width: "100%" }}
                                InputLeftElement={
                                    <Icon name="id-card-o" color="#DADADA" size={25} style={{ marginLeft: "3%" }} />
                                }
                                name="identificacion"
                                onChangeText={text => handleChangeForm("identificacion", text)}
                            />
                        </Center>

                        {/**Teléfono */}
                        <Center style={{ width: "90%" }}  >
                            <Input variant="outline"
                                placeholder="Teléfono"
                                style={{ width: "100%" }}
                                InputLeftElement={
                                    <Icon name="phone" color="#DADADA" size={25} style={{ marginLeft: "3%" }} />
                                }
                                name="telefono"
                                onChangeText={text => handleChangeForm("telefono", text)}
                            />
                        </Center>

                        {/**Correo */}
                        <Center style={{ width: "90%" }}  >
                            <Input variant="outline"
                                placeholder="Correo"
                                style={{ width: "100%" }}
                                InputLeftElement={
                                    <Icon name="envelope" color="#DADADA" size={25} style={{ marginLeft: "3%" }} />
                                }
                                name="correo"
                                onChangeText={text => handleChangeForm("correo", text)}
                            />
                        </Center>

                        <View style={styles.divider} />

                        <Center style={{ width: "90%" }}  >
                            <Input variant="outline"
                                placeholder="Nombre de usuario"
                                style={{ width: "100%" }}
                                InputLeftElement={
                                    <Icon name="user" color="#DADADA" size={25} style={{ marginLeft: "3%" }} />
                                }
                                
                                name="username"
                                onChangeText={text => handleChangeForm("username", text)}
                            />
                        </Center>

                        <HStack space={3} alignItems="center">
                            {/**Password */}
                            <Center style={{ width: "43%" }}  >
                                <Input
                                    placeholder="Contraseña"
                                    style={{ width: "100%" }}
                                    InputLeftElement={
                                        <Icon name="key" color="#DADADA" size={25} style={{ marginLeft: "3%" }} />
                                    }
                                    name="password"
                                    onChangeText={text => handleChangeForm("password", text)}
                                />
                            </Center>
                            {/*Password*/}
                            <Center style={{ width: "43%" }}  >
                                <Input
                                    placeholder="Confirmar"
                                    style={{ width: "100%" }}
                                    InputLeftElement={
                                        <Icon name="key" color="#DADADA" size={25} style={{ marginLeft: "3%" }} />
                                    }
                                    name="password2"
                                    onChangeText={text => handleChangeForm("password2", text)}
                                />
                            </Center>
                        </HStack>


                        <View style={styles.divider} />

                        <Center style={{ width: "90%" }}>
                            <PaymentComponent />
                        </Center>
                        <View style={styles.divider} />
                        {/**Código familiar */}
                        <Center style={{ width: "90%" }}  >
                            <Input
                                placeholder="Código Familiar"
                                style={{ width: "100%" }}
                                InputLeftElement={
                                    <Icon name="users" color="#DADADA" size={25} style={{ marginLeft: "3%" }} />
                                }
                                name="codigoF"
                                onChangeText={text => handleChangeForm("codigoF", text)}
                                onBlur={validarCodigo}
                                
                            />
                            <Text style={styles.message}>*Tu administrador de etapa debe proporcionarte este código</Text>
                        </Center>
                        <Center style={{ width: "90%" }}>

                            <Button backgroundColor="#506048" width="80%" style={{ marginTop: 10 }} onPress={signUp} >Registrarme</Button>
                        </Center>











                    </Stack>


                </ScrollView>

            </View>
        </NativeBaseProvider>
    )
}

export default Register
