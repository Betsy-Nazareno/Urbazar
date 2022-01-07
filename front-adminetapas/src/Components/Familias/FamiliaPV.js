import React from 'react'
import family from '../../imagenes/family.png'
import '../../css/FamiliaComponent.css'
import { Input, Label, FormGroup, Col, Button } from 'reactstrap'
import StickyHeadTable from './Tabla'
import LoadInfo from './LoadInfo'

const FamiliaPV = (props) => {
  const etapas = LoadInfo('http://localhost:3000/etapas')

  return (

        <div id="familypanel">
            <div className="addFamily">
                <div id="title">
                    <div> Nueva familia</div>
                    <div> <img src={family}/></div>
                </div>
                <div id="content_add">
                    <FormGroup row className="groupLabels">
                        <div className="first_child" >
                            <Label for="apellidos" sm={3}>Apellidos</Label>
                            <Col className="cont_input" sm={9}>
                                <Input id="apellidos" name="apellidos" />

                            </Col>
                        </div>

                        <div className="second_child" >
                            <Label for="etapa" sm={2}>Etapa</Label>
                            <Col className="cont_input" sm={10}>
                                <Input className="second_child" type="select" id="select_et" name="etapa" >
                                    <option value=""> </option>
                                    {
                                    etapas.map((etapa, id) => (
                                        <option key={id} value={etapa.id}> {etapa.nombre} </option>
                                    ))
                                    }

                                </Input>
                            </Col>

                        </div>

                    </FormGroup>

                    <div id="codigoArea">
                        <FormGroup>
                            <Input type="textarea" name="codigoF" id="codigoF" />
                            <Button id="btn_codigo" onClick={props.generateCode}>Generar código Familiar</Button>
                        </FormGroup>
                    </div>

                    <div id="button_add">
                        <a id="btn_agg" onClick={props.addFamily}> Añadir</a>

                    </div>

                </div>

            </div>

            <div id="cont_familias">
                <StickyHeadTable/>
            </div>
        </div>
  )
}

export default FamiliaPV
