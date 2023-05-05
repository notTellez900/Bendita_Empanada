import React, {useState, useEffect} from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { PayPalButton } from 'react-paypal-button-v2'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { getOrdenDetails, payOrden, deliverOrden } from '../actions/ordenActions'

import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/ordenConstants'


function Orden() {

    const { id } = useParams()
    const history = useNavigate()
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] =  useState(false)

    const ordenDetails = useSelector(state => state.ordenDetails)
    const {orden, error, loading} = ordenDetails

    const ordenPay = useSelector(state => state.ordenPay)
    const {loading: loadingPay, success: successPay} = ordenPay

    const ordenDeliver = useSelector(state => state.ordenDeliver)
    const {loading: loadingDeliver, success: successDeliver} = ordenDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    if(!loading && !error){
        orden.productosPrecio = orden.ordenItems.reduce((acc , item) => acc + (item.precio * item.qty), 0).toFixed(2)
    }

    // id cliente cuenta fake de paypal: AdJNsL7nvyKSsU8d-dH-rhtT__HqmjTBXI_YyVnofxvBp-SnC0mHocyWT159ZCLwMwNFpOxJ7w7CUAi8

    const addPayPalScript = () =>{

        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AdJNsL7nvyKSsU8d-dH-rhtT__HqmjTBXI_YyVnofxvBp-SnC0mHocyWT159ZCLwMwNFpOxJ7w7CUAi8'
        script.async = true
        script.onload = () =>{
            setSdkReady(true)
        }

        document.body.appendChild(script)
    }

    useEffect(()=>{

        if(!userInfo){
            history('/login')
        }

        if(!orden || successPay ||orden._id !== Number(id) || successDeliver){
            dispatch({
                type: ORDER_PAY_RESET
            })

            dispatch({
                type: ORDER_DELIVER_RESET
            })

            dispatch(getOrdenDetails(id))
        }else if(!orden.pagado){
           if(!window.paypal){
                addPayPalScript()
           }else{
                setSdkReady(true)
           }
        }
    }, [orden, id, dispatch, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrden(id, paymentResult))
    }

    const deliverHandler = () =>{
        dispatch(deliverOrden(orden))
    }

    
  return loading ? (
    <Loader/>
    ) : error ? (
        <Message variant='warning'>{error}</Message>
    ) : (
    <div>
        <h1>Orden: {orden._id}</h1>
        <Row>
            <Col m={8}>
                <ListGroup variant='flus'>
                    <ListGroup.Item>
                        <h2>Envio</h2>
                        <p>
                            <strong>Nombre: </strong> {orden.usuario.name}
                        </p>

                        <p>
                            <strong>Correo: </strong> <a href={`mailto:${orden.usuario.email}`}>{orden.usuario.email}</a>
                        </p>

                        <p>
                            <strong>Envio a: </strong>
                            {orden.direccionEnvio.direccion}, {orden.direccionEnvio.ciudad}
                            {'   '}
                            {orden.direccionEnvio.codigoPostal},
                            {'   '}
                            {orden.direccionEnvio.pais}
                        </p>

                        {orden.enviado ? (
                            <Message variant='success'>Enviado el dia {orden.fechaEnvio}</Message>
                        ) : (
                            <Message variant='warning'>Sin enviar</Message>
                        )}
                    </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Metodo de pago</h2>
                        <p>
                            <strong>Metodo de pago: </strong>
                            {orden.metodoPago}
                        </p>

                        {orden.pagado ? (
                            <Message variant='success'>Pagado el dia {orden.fechaPago}</Message>
                        ) : (
                            <Message variant='warning'>Sin pagar</Message>
                        )}
                    </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Productos Escogidos</h2>
                    {orden.ordenItems.length === 0 ? <Message variant='info'>
                        Tu orden esta vacio
                    </Message>: (
                        <ListGroup variant='flush'>
                            {orden.ordenItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.nombre} fluid rounded/>
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
                                <Col>${orden.productosPrecio}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Envio: </Col>
                                <Col>${orden.precioEnvio}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col>IVA: </Col>
                                <Col>${orden.precioFactura}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total: </Col>
                                <Col>${orden.precioTotal}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!orden.pagado && (
                            <ListGroup.Item>
                                {loadingPay && <Loader/>}

                                {!sdkReady ? (
                                    <Loader/>
                                ) : (
                                    <PayPalButton
                                        amount={orden.precioTotal}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>

                    {loadingDeliver && <Loader/>}

                    {userInfo && userInfo.isAdmin && orden.pagado && !orden.enviado && (
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn btn-lg'
                                onClick={deliverHandler}
                            >
                                Marcar como enviado
                            </Button>
                        </ListGroup.Item>
                    )}
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default Orden