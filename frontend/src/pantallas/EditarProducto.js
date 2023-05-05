import React, {useState, useEffect} from 'react'
//import axios from 'axios'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/formContainer'

import { listProductDetails, updateProduct } from '../actions/productActions'

import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function EditarProducto() {

  const {id} = useParams();
  
  const [nombre, setName] = useState(''); 
  const [precio, setPrice] = useState(0); 
  const [imagen, setImage] = useState(''); 
  const [categoria, setCategory] = useState(''); 
  const [cantidad, setCountInStock] = useState(0); 
  const [descripcion, setDescription] = useState(''); 
  //const [uploading, setUploading] = useState(false); 
  

  const dispatch = useDispatch();
  const history = useNavigate()
  

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, producto } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {

    if(successUpdate){
        dispatch({
            type: PRODUCT_UPDATE_RESET
        })
        history('/admin/productlist')
    }

    if(!producto.nombre || producto._id !== Number(id)){
        dispatch(listProductDetails(id))
    }else{
        setName(producto.nombre)
        setPrice(producto.precio)
        setImage(producto.imagen)
        setCategory(producto.categoria)
        setCountInStock(producto.cantidad)
        setDescription(producto.descripcion)
    }
    
  }, [id, dispatch, producto, history, successUpdate])

  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(updateProduct({
        _id: id,
        nombre,
        precio,
        imagen,
        categoria,
        cantidad,
        descripcion
    }))
  }

  return (
    <div>

        <Link to='/admin/productlist'>
            Atras
        </Link>

        <FormContainer>
            <h1>Editar Producto</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}


            {loading ? <Loader/> : error ? <Message variant='warning'>{error}</Message> 
            : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Ingresa tu nombre'
                            value={nombre}
                            onChange={(e) => setName(e.target.value)}
                            
                            >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='precio'>
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Ingresa el precio del producto'
                            value={precio}
                            onChange={(e) => setPrice(e.target.value)}
                            
                            >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='categoria'>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingresa la categoria del producto'
                            value={categoria}
                            onChange={(e) => setCategory(e.target.value)}
                            
                            >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='cantidad'>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Ingresa la cantidad de productos'
                            value={cantidad}
                            onChange={(e) => setCountInStock(e.target.value)}
                            
                            >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='descripcion'>
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingresa la descripcion del producto'
                            value={descripcion}
                            onChange={(e) => setDescription(e.target.value)}
                            
                            >

                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='warning'> Actualizar </Button>
                </Form>
            )}


        </FormContainer>
    </div>
  )
}

export default EditarProducto