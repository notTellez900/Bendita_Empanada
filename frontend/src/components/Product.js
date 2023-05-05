import React from 'react'
import { Card } from 'react-bootstrap'

import Rating from './Rating'

import { Link } from 'react-router-dom'

export default function Product({ product }) {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/producto/${product._id}`} style={{
            height: '200px',
            overflow: 'hidden'
        }}>
            <Card.Img src={product.imagen} style={{
                position: 'relative',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)'
            }}></Card.Img>
        </Link>

        <Card.Body>
            <Link to={`/producto/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.nombre}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="div">
                <div className='my-3'>
                    <Rating value={product.calificacion} text={`${product.numOpiniones} opiniones`} color={'#E31414'} />
                </div>
            </Card.Text>

            <Card.Text as="h3">
                ${product.precio}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}
