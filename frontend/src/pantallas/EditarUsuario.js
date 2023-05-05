import React, {useState, useEffect} from 'react'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/formContainer'

import { getUserDetails, updateUser } from '../actions/userActions'

import { USER_UPDATE_RESET } from '../constants/userConstants'

function EditarUsuario() {

  const {id} = useParams();
  
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [isAdmin, setAdmin] = useState(false);

  const dispatch = useDispatch();
  const history = useNavigate()
  

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;

  useEffect(() => {

    if(successUpdate){
        dispatch({
            type: USER_UPDATE_RESET
        })
        history('/admin/userlist')
    }else{
        if(!user.name || user._id !== Number(id)){
            dispatch(getUserDetails(id))
        }else{
            setName(user.name)
            setEmail(user.email)
            setAdmin(user.isAdmin)
        }
    }
    
  }, [id, dispatch, user, successUpdate, history])

  const submitHandler = (e) =>{
    e.preventDefault();

    dispatch(updateUser({
        _id: user._id,
        name,
        email,
        isAdmin
    }))
  }
  return (
    <div>

        <Link to='/admin/userlist'>
            Atras
        </Link>

        <FormContainer>
            <h1>Editar Usuario</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='warning'>{errorUpdate}</Message>}

            {loading ? <Loader/> : error ? <Message variant='warning'>{error}</Message> 
            : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Ingresa tu nombre'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            
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
                            
                            >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isadmin'>
                        <Form.Check
                            type='checkbox'
                            label='Es Administrador'
                            checked={isAdmin}
                            onChange={(e) => setAdmin(e.target.checked)}
                            >

                        </Form.Check>
                    </Form.Group>

                    <Button type='submit' variant='warning'> Actualizar </Button>
                </Form>
            )}


        </FormContainer>
    </div>
  )
}

export default EditarUsuario