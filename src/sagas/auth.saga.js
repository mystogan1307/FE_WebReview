import { call, put, takeLatest } from "redux-saga/effects";

import { GET_PROFILE_USER, getProfileUserSuccess, getProfileUserFailed } from "../actions/auth.action";
import AuthApi from "../api/auth.api";

function* getProfileUser(){
    try {
        const user = yield call(AuthApi.CheckLogin);
        yield put(getProfileUserSuccess(user));
    } catch (error) {
        yield put(getProfileUserFailed(error))
    }
}

export function* watchAuthSagaAsync(){
    yield takeLatest(GET_PROFILE_USER, getProfileUser)
}
