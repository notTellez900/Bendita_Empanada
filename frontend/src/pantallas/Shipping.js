import React, {useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/formContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import { saveShippingAddress } from '../actions/carritoActions'

function Shipping() {

  const history = useNavigate()

  const carrito = useSelector(state => state.carrito)
  const { shippingAddress } = carrito  

  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = (e) =>{
    e.preventDefault()

    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history('/payment')
  }  

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Envio</h1>
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='address'>
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Ingresa tu direccion'
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Ingresa tu Ciudad'
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Codigo Postal</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Ingresa tu Codigo Postal'
                    value={postalCode ? postalCode : ''}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Pais</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Ingresa tu Pais'
                    value={country ? country : ''}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    >

                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continuar
            </Button>
        </Form>
    </FormContainer>
  )
}

export default Shipping