import { call, put, takeLatest } from "redux-saga/effects";

import {GET_COMMENT_LIST, getCommentListSuccess, getCommentListFailed} from "../actions/comment.action";
import CommentApi from "../api/comment.api";

function* getComment(action){
    try {
        let comment = yield call(CommentApi.getCommentsByProductId, action.params);
        yield put(getCommentListSuccess(comment));
    } catch (error) {
        yield put(getCommentListFailed(error.message));
    }
}

export function* watchCommentSagaAsync(){
    yield takeLatest(GET_COMMENT_LIST, getComment);
}
