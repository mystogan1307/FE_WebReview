import { GET_PROFILE_USER, GET_PROFILE_USER_SUCCESS, GET_PROFILE_USER_FAILED } from "../actions/auth.action";

const initUser = {}

const AuthReducer = (state = initUser, action) => {
    switch (action.type) {
        case GET_PROFILE_USER:
            return Object.assign({}, state, {
                loading: true,
                failed: false
            })

        case GET_PROFILE_USER_SUCCESS:
            return Object.assign({}, state, {
                user: action.data,
                loading: false,
                failed: false
            })

        case GET_PROFILE_USER_FAILED:
            return Object.assign({}, state, {
                error: action.error,
                loading: false,
                failed: true
            })
        default:
            return state
    }
}

export default AuthReducer;
