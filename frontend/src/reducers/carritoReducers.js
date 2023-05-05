import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,

    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
} from '../constants/carritoConstants';

export const carritoReducer = (state = {carritoItems:[], shippingAddress: {}}, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.carritoItems.find(x => x.producto === item.producto);

            if(existItem){
                return {
                    ...state,
                    carritoItems: state.carritoItems.map(x => 
                        x.producto === existItem.producto ? item : x)
                }
            }else{
                return {
                    ...state,
                    carritoItems: [...state.carritoItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                carritoItems: state.carritoItems.filter(x => x.producto !== action.payload)
            }
        
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                carritoItems: []
            }

        default:
            return state;
    }
}