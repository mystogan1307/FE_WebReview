export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS";
export const GET_PRODUCT_BY_ID_FAILED = "GET_PRODUCT_BY_ID_FAILED";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILED = "GET_PRODUCTS_FAILED";

export const getProductById = (params) => {
    return {
        type: GET_PRODUCT_BY_ID,
        params
    }
}

export const getProductByIdSuccess = (product) => {
    return {
        type: GET_PRODUCT_BY_ID_SUCCESS,
        data: product
    }
}

export const getProductByIdFailed = () => {
    return {
        type: GET_PRODUCT_BY_ID_FAILED
    }
}

export const getProducts = (params) => {
    return {
        type: GET_PRODUCTS,
        params
    }
}

export const getProductsSuccess = (products) => {
    return {
        type: GET_PRODUCTS_SUCCESS,
        data: products
    }
}

export const getProductsFailed = (err) => {
    return {
        type: GET_PRODUCTS_FAILED,
        err
    }
}
