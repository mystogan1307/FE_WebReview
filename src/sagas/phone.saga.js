import { call, put, takeEvery } from "redux-saga/effects";

import { getProductByIdSuccess, getProductByIdFailed, getProductsSuccess, getProductsFailed } from "../actions/phone.action";
import ProductApi from "../api/phone.api";
import { GET_PRODUCT_BY_ID, GET_PRODUCTS } from "../actions/phone.action";

function* getProductById(action){
    try {
        const product = yield call(ProductApi.getProductById, action.params);
        yield put(getProductByIdSuccess(product));
    } catch (error) {
        yield put(getProductByIdFailed());
    }
}

function* getProducts(action){
    try {
        // console.log(action)
        const products = yield call(ProductApi.getProducts, action.params);
        yield put(getProductsSuccess(products));
    } catch (error) {
        yield put(getProductsFailed());
    }
}

export function* watchProductSagaAsync(){
    yield takeEvery(GET_PRODUCT_BY_ID, getProductById);
    yield takeEvery(GET_PRODUCTS, getProducts);
}
