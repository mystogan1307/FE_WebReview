import { takeLatest, put, call } from "redux-saga/effects";

import { GET_USER_LIST, getUserListSuccess, getUserListFailed } from "../actions/user.action";
import UserApi from "../api/user.api";

function* getUser(action){
    try {
        let user = yield call(UserApi.getUser, action.params);
        yield put(getUserListSuccess(user))
    } catch (error) {
        yield put(getUserListFailed(error));
    }
}

export function* watchUserSagaAsync(){
    yield takeLatest(GET_USER_LIST, getUser);
}
