import React, {useState, useEffect} from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/formContainer'


import { login } from '../actions/userActions'

function Login() {  
  
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  
  const location = useLocation();
  const history = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin;

  useEffect(() => {
    if(userInfo){
        history(redirect);
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(login(email, password))
  }  


    
  return (
    <FormContainer>
        <h1>Ingreso</h1>
        {error && <Message variant='primary'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Direccion de Correo</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Ingresa tu correo'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

            <Button type='submit' variant='warning'> Ingresar </Button>
        </Form>

        <Row className='py-3'>
            <Col>Eres nuevo? 
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Registro
                </Link> 
            </Col>
        </Row>
    </FormContainer>
  )
}

export default Login