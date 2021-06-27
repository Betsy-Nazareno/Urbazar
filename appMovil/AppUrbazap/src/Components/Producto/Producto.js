import React from 'react'
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap'

const Producto = ({ nombre, precio, foto_src, id, navegacion }) => {
  return (
        <div onClick={() => {
          navegacion.push('ProductoDetail', {
            id
          })
        }}>
        <div className='slide_product'>
            {/* importar card */}
            <div className="cont">
            <Card className="card-product-sld">
                <CardImg className="img" top width='100%' src={foto_src} alt={nombre} />
                <CardBody>
                    <CardTitle id="name_product" tag='h5'>{nombre}</CardTitle>
                    <CardSubtitle tag='h6' className='mb-2 text-muted'>${precio}</CardSubtitle>
                </CardBody>
            </Card>
            </div>
        </div>

        </div>
  )
}

export default Producto
