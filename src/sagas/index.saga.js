import { all, fork } from "redux-saga/effects";

import {watchProductSagaAsync} from "./phone.saga";
import {watchAuthSagaAsync} from "./auth.saga";
import {watchLabelSagaAsync} from "./label.saga";
import {watchUserSagaAsync} from "./user.saga";
import {watchCommentSagaAsync} from "./comment.saga";

export default function* saga(){
    yield all([
        fork(watchProductSagaAsync),
        fork(watchAuthSagaAsync),
        fork(watchLabelSagaAsync),
        fork(watchUserSagaAsync),
        fork(watchCommentSagaAsync)
    ])
}
