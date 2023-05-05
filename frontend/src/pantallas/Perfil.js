import React, {useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'

import { getUserDetails, updateUserProfile } from '../actions/userActions'

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

import { listMyOrdenes } from '../actions/ordenActions'

function Perfil() {

    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
  
  
    const dispatch = useDispatch();
    
    const history = useNavigate();
  
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const ordenListMy = useSelector(state => state.ordenListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = ordenListMy;
  
    useEffect(() => {
      if(!userInfo){
          history('/login');
      }else{
        if(!user || !user.name || success || userInfo._id !== user._id){
            dispatch({
                type: USER_UPDATE_PROFILE_RESET
            })
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrdenes())
        }else{
            setName(user.name)
            setEmail(user.email)
        }
      }
    }, [dispatch, history, user, userInfo, success])
  
    const submitHandler = (e) =>{
      e.preventDefault();
  
      if(password !== confirmPassword){
          setMessage('Las Contraseñas no coinciden');
      }else{
          dispatch(updateUserProfile({
            'id':user._id,
            'name': name,
            'email': email,
            'password': password

          }))
          setMessage('');
      }
      
    }
  return (
    <Row>
        <Col md={3}>
            <h2>Perfil del Usuario</h2>
            
            {message && <Message variant='info'>{message}</Message>}
            {error && <Message variant='primary'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Ingresa tu nombre'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Direccion de Correo</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Ingresa tu correo'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Ingresa tu contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                        >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirma tu Contraseña</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirma tu contraseña'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        
                        >

                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='warning'> Guardar </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>Mis Pedidos</h2>
            {loadingOrders ? (
                <Loader/>
            ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
            ) : (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Pagado</th>
                            <th>Detalles</th>
                            <th>Enviado</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(orden => (
                            <tr key={orden._id}>
                                <td>{orden._id}</td>
                                <td>{orden.fechaCreacion.substring(0,10)}</td>
                                <td>${orden.precioTotal}</td>
                                <td>{orden.pagado ? orden.fechaPago.substring(0,10) : (
                                    <i className='fas fa-times' style={{color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${orden._id}`}>
                                        <Button className='btn btn-sm'>Detalles</Button>
                                    </LinkContainer>
                                </td>
                                <td>{orden.enviado}</td>
                                <td>{orden._id}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default Perfil