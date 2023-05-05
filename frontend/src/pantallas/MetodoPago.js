import React, {useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/formContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import { savePaymentMethod } from '../actions/carritoActions'

function MetodoPago() {

  const history = useNavigate()

  const carrito = useSelector(state => state.carrito)
  const { shippingAddress } = carrito 
  
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  
  if(!shippingAddress.address){
    history('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod));

    history('/placeorder');
  }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Selecciona tu medoto de pago</Form.Label>
                <Col>
                    <Form.Check 
                        type='radio'
                        label='Paypal o Tarjeta de Credito'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submite' variant='primary'>
                Continuar
            </Button>
        </Form>
    </FormContainer>
  )
}

export default MetodoPago