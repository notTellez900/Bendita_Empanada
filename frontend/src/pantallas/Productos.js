import React, { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

import BuscarProducto from '../components/BuscarProducto'


import { listProducts } from '../actions/productActions'

function Productos() {

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);

  const {error, loading, productos} = productList;

  let location = useLocation()
  let keyword = location.search

  useEffect(()=>{
    dispatch(listProducts(keyword))
    
  }, [dispatch, keyword])

  return (
    <Row>
    <h1>Todos Los Productos</h1>
    <BuscarProducto/>
      {error ? <Message variant='danger'>{error}</Message>
            : loading ? <Loader/>
            :
            <Row>
              {productos.map(producto => (
                <Col key={producto._id} sm={12} md={6} lg={4} xl={4}>
                  <Product product={producto} />
                </Col>
              ))}
            </Row>
            
        }
    </Row>
  )
}

export default Productos