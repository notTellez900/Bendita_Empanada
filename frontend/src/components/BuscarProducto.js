import React, {useState} from 'react'

import { Button, Form } from 'react-bootstrap'

import { useNavigate, useLocation } from 'react-router-dom'

function BuscarProducto() {

    const [keyword, setKeyword] = useState('')

    let history = useNavigate()
    let location = useLocation()

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword){
            history(`?keyword=${keyword}`)
        }else{
            history(history(location.pathname))
        }

    }
  return (
    <Form onSubmit={submitHandler}>
        <Form.Control
            type='text'
            name='q'
            onChange={ (e) => setKeyword(e.target.value)}
            className='mb-3 p-3'
        >

        </Form.Control>

        <Button 
            type='submit'
            variant='outline-success'
            className='btn btn-lg'
        >
            Buscar
        </Button>
    </Form>
  )
}

export default BuscarProducto