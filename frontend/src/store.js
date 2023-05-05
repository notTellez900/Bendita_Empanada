import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { 
    listaProductoReducer, 
    productoDetailsReducer,
    productoDeleteReducer,
    productoCreateReducer,
    productoUpdateReducer,
    productoTopRatedReducer,
} from './reducers/productoReducers'
import { carritoReducer } from './reducers/carritoReducers'  
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer,
    userUpdateReducer, 
} from './reducers/userReducers'
import { 
    ordenCreateRecurder, 
    ordenDetailsRecurder, 
    ordenPayRecurder, 
    orderListMyReducer,
    orderListReducer,
    ordenDeliverRecurder,
 } from './reducers/ordenReducers'


const reducer = combineReducers({
    productList: listaProductoReducer,
    productDetails: productoDetailsReducer,
    productDelete: productoDeleteReducer,
    productCreate: productoCreateReducer,
    productUpdate: productoUpdateReducer,
    productTopRated: productoTopRatedReducer,
    carrito: carritoReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,


    ordenCreate: ordenCreateRecurder,
    ordenDetails: ordenDetailsRecurder,
    ordenPay: ordenPayRecurder,
    ordenListMy: orderListMyReducer,
    ordenList: orderListReducer,
    ordenDeliver: ordenDeliverRecurder,
});

const carritoItemsFromStorage = localStorage.getItem('carritoItems') ? 
    JSON.parse(localStorage.getItem('carritoItems')) : [];


const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
    JSON.parse(localStorage.getItem('shippingAddress')) : {};

const initialState = {
    carrito: { 
        carritoItems: carritoItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
      },
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;