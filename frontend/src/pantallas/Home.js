import React, { useEffect } from 'react'

import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductoCarousel from '../components/ProductoCarousel'

import { listProducts } from '../actions/productActions'

function Home() {

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);

  const {error, loading, productos} = productList;

  useEffect(()=>{
    dispatch(listProducts())
    
  }, [dispatch])

  return (
    <div>
      <h1>Productos Populares</h1>
        <Row>
          <ProductoCarousel/>
        </Row>
        <h1>Productos</h1>
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

    </div>
  )
}

export default Home