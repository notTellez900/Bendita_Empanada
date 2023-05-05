import axios from 'axios';
import { 
    CART_ADD_ITEM, CART_REMOVE_ITEM, 

    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
} from '../constants/carritoConstants';

export const addToCarrito = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/producto/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            producto: data._id,
            nombre: data.nombre,
            imagen: data.imagen,
            precio: data.precio,
            cantidad: data.cantidad,
            qty
        }
    })


    localStorage.setItem('carritoItems', JSON.stringify(getState().carrito.carritoItems))
}


export const removeFromCarrito = (id)=> (dispatch, getState) =>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id, 
    })
    
    localStorage.setItem('carritoItems', JSON.stringify(getState().carrito.carritoItems))
}

export const saveShippingAddress = (data)=> (dispatch) =>{
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data, 
    })
    
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data)=> (dispatch) =>{
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data, 
    })
    
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}