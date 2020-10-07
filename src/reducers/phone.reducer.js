import { GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_BY_ID_FAILED } from "../actions/phone.action";

const initProduct = {}

const ProductReducer = (state = initProduct, action) => {
    switch (action.type) {
        case GET_PRODUCT_BY_ID:
            return Object.assign({}, state, {
                loading: true,
                failed: false
            });

        case GET_PRODUCT_BY_ID_SUCCESS: 
            return Object.assign({}, state, {
                phone: action.data,
                loading: false,
                failed: false
            });

        case GET_PRODUCT_BY_ID_FAILED:
            return Object.assign({}, state, {
                loading: true,
                failed: true
            })
        default:
            return state;
    }
}

export default ProductReducer
