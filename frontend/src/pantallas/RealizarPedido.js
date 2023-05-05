import React, {useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

import { createOrden } from '../actions/ordenActions'
import { ORDER_CREATE_RESET } from '../constants/ordenConstants'

function RealizarPedido() {

    const ordenCreate = useSelector(state => state.ordenCreate)
    const {orden, error, success} = ordenCreate

    const dispatch = useDispatch()
    const carrito = useSelector(state => state.carrito)
    const history = useNavigate()

    carrito.productosPrecio = carrito.carritoItems.reduce((acc , item) => acc + (item.precio * item.qty), 0).toFixed(2)
    carrito.precioEnvio = (carrito.productosPrecio > 15 ? 0 : 5).toFixed(2)
    carrito.precioIVA = Number((0.19) * carrito.productosPrecio).toFixed(2)

    carrito.total = (Number(carrito.productosPrecio) + Number(carrito.precioEnvio) + Number(carrito.precioIVA)).toFixed(2)

    if(!carrito.paymentMethod){
        history('/payment')
    }

    useEffect(()=>{
        if(success){
            history(`/order/${orden._id}`)
            dispatch({
                type: ORDER_CREATE_RESET
            })
        }
    }, [success, history])

    const placeOrder = () =>{
        dispatch(createOrden({
            ordenItems: carrito.carritoItems,
            direccionEnvio: carrito.shippingAddress,
            metodoPago: carrito.paymentMethod,
            precioProductos: carrito.productosPrecio,
            precioEnvio: carrito.precioEnvio,
            precioFactura: carrito.precioIVA,
            precioTotal: carrito.total,
        }))
    }
    
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col m={8}>
                <ListGroup variant='flus'>
                    <ListGroup.Item>
                        <h2>Envio</h2>
                        <p>
                            <strong>Envio a: </strong>
                            {carrito.shippingAddress.address}, {carrito.shippingAddress.city}
                            {'   '}
                            {carrito.shippingAddress.postalCode},
                            {'   '}
                            {carrito.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Metodo de pago</h2>
                        <p>
                            <strong>Metodo de pago: </strong>
                            {carrito.paymentMethod}
                        </p>
                    </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Productos Escogidos</h2>
                    {carrito.carritoItems.length === 0 ? <Message variant='info'>
                        Tu carrito esta vacio
                    </Message>: (
                        <ListGroup variant='flush'>
                            {carrito.carritoItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.imagen} alt={item.nombre} fluid rounded/>
                                        </Col>

                                        <Col>
                                            <Link to={`/producto/${item.producto}`}>{item.nombre}</Link>
                                        </Col>

                                        <Col md={4}>
                                            {item.qty} X ${item.precio} = ${(item.qty * item.precio).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                    </ListGroup.Item>
                </ListGroup>
                
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Resumen del Pedido</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Producto: </Col>
                                <Col>${carrito.productosPrecio}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Envio: </Col>
                                <Col>${carrito.precioEnvio}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col>IVA: </Col>
                                <Col>${carrito.precioIVA}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total: </Col>
                                <Col>${carrito.total}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            { error && <Message variant='warning'>{error}</Message> }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button 
                                type='button'
                                className='btn btn-lg'
                                disabled = {carrito.carritoItems === 0}
                                onClick={placeOrder}
                            >
                                Realizar Pedido
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default RealizarPedido