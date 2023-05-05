import React, {useState, useEffect} from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'

import { listOrdenes } from '../actions/ordenActions'


function ListaOrdenes() {

    const history = useNavigate()
    const dispatch = useDispatch()

    const ordenList = useSelector(state => state.ordenList)
    const {loading, error, orders } = ordenList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrdenes())
        }else{
            history('/login/')
        }
    }, [dispatch, history, userInfo])

  return (
    <div>
        <h1>Pedidos</h1>
        {loading 
        ? (<Loader/>)
        : error 
        ? <Message variant='warning'>{error}</Message>
        : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USUARIO</th>
                        <th>FECHA</th>
                        <th>TOTAL</th>
                        <th>FECHA PAGO</th>
                        <th>FECHA ENVIO</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(orden => (
                        <tr key={orden._id}>
                            <td>{orden._id}</td>
                            <td>{orden.usuario && orden.usuario.name}</td>
                            <td>{orden.fechaCreacion.substring(0, 10)}</td>
                            <td>${orden.precioTotal}</td>
                            <td>{orden.pagado ? (
                                orden.fechaPago.substring(0, 10)
                            ): (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>

                            <td>{orden.enviado ? (
                                orden.fechaEnvio.substring(0, 10)
                            ): (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>

                            <td>
                                <LinkContainer to={`/order/${orden._id}`}>
                                    <Button variant='info' className='btn btn-sm'>
                                        Detalles
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </div>
  )
}

export default ListaOrdenes