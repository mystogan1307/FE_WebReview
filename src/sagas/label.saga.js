import { put, takeLatest } from "redux-saga/effects";

import {
    getLabelListFailed,
    getLabelListSuccess,
    GET_LABEL_LIST
} from "../actions/label.action";
import LabelApi from "../api/label.api";

function* getLabel(action){
    try {
        // console.log(action)
        let labels = yield LabelApi.getLabel(action.params);
        yield put(getLabelListSuccess(labels));
    } catch (error) {
        yield put(getLabelListFailed(error));
    }
}

export function* watchLabelSagaAsync(){
    yield takeLatest(GET_LABEL_LIST, getLabel);
}
