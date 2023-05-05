import React, {useState, useEffect} from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'

import { listProducts, deleteProduct, createProduct } from '../actions/productActions'

import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


function ListaProductos() {

    const history = useNavigate()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, productos } = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    

    useEffect(() => {

        dispatch({
            type: PRODUCT_CREATE_RESET
        })

        if(!userInfo.isAdmin){
            history('/login/')
        }

        if(successCreate){
            history(`/admin/producto/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if(window.confirm('¿Estas seguro que deseas eliminar este producto? ')){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

  return (
    <div>
        <Row className='align-items-center'>
            <Col>
                <h1>Productos</h1>
            </Col>
            
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Crear Producto
                </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='warning'>{errorDelete}</Message>}

        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='warning'>{errorCreate}</Message>}

        {loading 
        ? (<Loader/>)
            : error 
            ? <Message variant='warning'>{error}</Message>
            : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>PRECIO</th>
                            <th>CATEGORIA</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto._id}>
                                <td>{producto._id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.categoria}</td>
                                <td>
                                    <LinkContainer to={`/admin/producto/${producto._id}/edit`}>
                                        <Button variant='info' className='btn btn-sm'>
                                            <i className='fas fa-edit' ></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn btn-sm' onClick={() => deleteHandler(producto._id)}>
                                        <i className='fas fa-trash' ></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        )}
    </div>
  )
}

export default ListaProductos