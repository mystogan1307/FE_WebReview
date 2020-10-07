import { combineReducers } from "redux";

import phone from "./phone.reducer";
import auth from "./auth.reducer";
import phoneList from "./phone.list.reducer";
import labelList from "./label.reducer";
import user from "./user.reducer";
import comment from "./comment.reducer";

export default combineReducers({
    phone,
    auth,
    phoneList,
    labelList,
    user,
    comment
})
