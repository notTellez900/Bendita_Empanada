import React, {useEffect} from 'react';

import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';

import Message from '../components/Message';
import { addToCarrito, removeFromCarrito } from '../actions/carritoActions';


function Carrito() {

  const { id } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const history = useNavigate();

  const carrito = useSelector(state => state.carrito);
  const {carritoItems} = carrito;


  useEffect(() =>{
    if(id){
      dispatch(addToCarrito(id, qty))
    }
  }, [dispatch, id, qty]);

  const removeFromCarritoHandler = (id) => {
    dispatch(removeFromCarrito(id));
  }

  const checkouthandler = () => {
    history('/shipping');
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Carrito de Compras</h1>
        {carritoItems.length === 0 ? (
          <Message>
            Tu carrito está vacio <Link to='/'>Vamos a Comprar!</Link>
          </Message>
        ): (
          <ListGroup variant='flush'>
            {carritoItems.map(item => (
              <ListGroup key={item.producto}>
                <Row>
                  <Col md={2}>
                    <Image src={item.imagen} alt={item.nombre} fluid rounded/>
                  </Col>

                  <Col md={3}>
                    <Link to={`/producto/${item.producto}`}>{item.nombre}</Link>
                  </Col>

                  <Col md={2}>
                    ${item.precio}
                  </Col>

                  <Col md={3}>
                    <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCarrito(item.producto, Number(e.target.value)))}>
                              {
                                [...Array(item.cantidad).keys()].map((x) => (
                                  <option key={x+1} value={x+1}>
                                    {x+1}
                                  </option>
                                ))
                              }
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button type='button' variant='light' onClick={() => removeFromCarritoHandler(item.producto)}>
                      <i className='fas fa-trash'></i>      
                    </Button>          
                  </Col>
                </Row>

              </ListGroup>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({carritoItems.reduce((acc, producto)=> acc + producto.qty, 0)}) productos</h2>
              ${carritoItems.reduce((acc, producto)=> acc + producto.qty * producto.precio, 0).toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button 
                type='button' 
                className='btn btn-lg' 
                disabled={carritoItems.length === 0}
                onClick={checkouthandler} 
                style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                Continuar con el pago
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Carrito