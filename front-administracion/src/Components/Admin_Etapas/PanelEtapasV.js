import React from 'react'
import { Input } from 'reactstrap'
import AddIcon from '@material-ui/icons/Add'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import CreateIcon from '@material-ui/icons/Create'
import '../../css/PanelEtapas.css'
import LoadEtapas from './LoadEtapas'
import { Redirect } from 'react-router-dom'

export default function PanelEtapasV (props) {
  const etapas = LoadEtapas('http://localhost:3000/etapas/')

  const auth = parseInt(localStorage.getItem('auth'), 10)
  const role = localStorage.getItem('role')

  if (auth && role === '3') {
    return (

        <div className="cont_panel">
            <div id="search">
                <Input className="col-md-12 input_busq" placeholder="Buscar..." />
            </div>

            <TableContainer component={Paper}>
            <Toolbar className="header_table" >
                <Typography variant="h6" id="tableTitle" component="div">
                    Etapas Villa bonita
                </Typography>
                <div id="button_Add" onClick={props.handleModal}>
                 <AddIcon/>
                </div>

            </Toolbar >
                <Table size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Identificador</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Ubicación</TableCell>
                    <TableCell align="right">Habitantes</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                    <TableBody>

                    {etapas.map((etapa, id) => (
                        <TableRow key={id} >
                            <TableCell component="th" scope="row">
                                {etapa.id}
                            </TableCell>
                            <TableCell align="right">
                                {etapa.nombre}
                            </TableCell>
                            <TableCell align="right">
                                {etapa.ubicacion}
                            </TableCell>

                        <TableCell align="right">
                                342
                            </TableCell>
                        <TableCell align="right">
                            <div align="right" className="controles" >
                                <CreateIcon />
                                <DeleteOutlineIcon/>
                            </div>
                        </TableCell>

                        </TableRow>

                    ))}
                    </TableBody>

                </Table>
            </TableContainer>
            </div>

    )
  } else {
    return <Redirect to='/'/>
  }
}
