import React, {useState, useEffect} from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/formContainer'

import { register } from '../actions/userActions'

function Register() {

  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');


  const dispatch = useDispatch();
  
  const location = useLocation();
  const history = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if(userInfo){
        history(redirect);
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) =>{
    e.preventDefault();

    if(password !== confirmPassword){
        setMessage('Las Contraseñas no coinciden');
    }else{
        dispatch(register(name, email, password))
    }
    
  }
  return (
    <div>
        <FormContainer>
            <h1>Registro</h1>
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
                        required
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
                        required
                        >

                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='warning'> Registrar </Button>
            </Form>

            <Row className='py-3'>
                <Col>Ya tienes una cuenta? 
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Ingresa a tu cuenta
                    </Link> 
                </Col>
            </Row>
        </FormContainer>
    </div>
  )
}

export default Register