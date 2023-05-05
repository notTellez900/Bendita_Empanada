import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { listProductDetails } from '../actions/productActions'


function Producto() {

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, producto} = productDetails;
  
  const { id } = useParams();
  const  history = useNavigate();

  const addToCarritoHandler = () =>{
    
    history(`/cart/${id}?qty=${qty}`);
    
  }

  useEffect(()=>{
    dispatch(listProductDetails(id))
    
  }, [dispatch, id])

  if(!producto) return null;

  return (
    <div>
      <Link to='/' className='btn btn-primary my-3'>Atras</Link>
      {loading ? <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
          :
          (<Row>
            <Col md={6}>
              <Image src={producto.imagen} alt={producto.nombre} fluid style={{
                minWidth:'400px'
              }}/>
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{producto.nombre}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating value={producto.calificacion} text={`${producto.numOpiniones} opiniones`} color={'#E31414'}/>
                </ListGroup.Item>

                <ListGroup.Item>
                  Price: ${producto.precio}
                </ListGroup.Item>

                <ListGroup.Item>
                  Descripcion: {producto.descripcion}
                </ListGroup.Item>

              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Precio: </Col>
                      <Col>
                        <strong>${producto.precio}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Estado: </Col>
                      <Col>
                        {producto.cantidad > 0 ? 'Disponible' : 'Agotado'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {producto.cantidad > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Cantidad</Col>
                        <Col xs='auto' className='my-1'>
                          <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                            {
                              [...Array(producto.cantidad).keys()].map((x) => (
                                <option key={x+1} value={x+1}>
                                  {x+1}
                                </option>
                              ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button 
                      onClick={addToCarritoHandler}
                      className='btn btn-lg btn-primary' 
                      disabled={producto.cantidad <= 0} 
                      type='button'>Agregar al Carrito
                      </Button>
                  </ListGroup.Item>
                  
                </ListGroup>
              </Card>
            </Col>
          </Row>)
      }
    </div>
  )
}

export default Producto