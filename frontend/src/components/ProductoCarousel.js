import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Carousel, Image } from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'

import { listTopProducts } from '../actions/productActions'


function ProductoCarousel() {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, productos } = productTopRated


    useEffect(()=>{
        dispatch(listTopProducts())
    }, [dispatch])

  return (
    
    loading ? <Loader/>
    : error
    ? <Message variant='danger'>{error}</Message>
    : (
        <Carousel pause='hover' className='bg-primary'>
            {productos.map(producto => (
                <Carousel.Item key={producto._id}>
                    <Link to={`/producto/${producto._id}`}>
                        <Image src={producto.imagen} alt={producto.nombre} fluid/>
                        <Carousel.Caption className='carousel.caption'>
                            <h4>{producto.nombre} ($ {producto.precio})</h4>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
  )
}

export default ProductoCarousel