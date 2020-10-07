import {
    GET_USER_LIST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAILED
} from "../actions/user.action";

const initUser = {};

const UserReducer = (state = initUser, action) => {
    switch (action.type) {
        case GET_USER_LIST:
            return Object.assign({}, state, {
                loading: true,
                failed: false
            })
    
        case GET_USER_LIST_SUCCESS:
            return Object.assign({}, state, {
                userList: action.data.userList,
                userTotal: action.data.userNumber,
                loading: false,
                failed: false
            })

        case GET_USER_LIST_FAILED:
            return Object.assign({}, state, {
                loading: false,
                failed: true
            })

        default:
            return state;
    }
}

export default UserReducer;
