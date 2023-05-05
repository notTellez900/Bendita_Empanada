import React, {useState, useEffect} from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'

import { listUsers, deleteUser } from '../actions/userActions'


function ListaUsuarios() {

    const history = useNavigate()
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history('/login/')
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('¿Estas seguro que deseas eliminar este usuario? ')){
            dispatch(deleteUser(id))
        }
    }

  return (
    <div>
        <h1>Usuarios</h1>
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
                        <th>CORREO</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? (
                                <i className='fas fa-check' style={{color: 'green'}}></i>
                            ): (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='info' className='btn btn-sm'>
                                        <i className='fas fa-edit' ></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn btn-sm' onClick={() => deleteHandler(user._id)}>
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

export default ListaUsuarios