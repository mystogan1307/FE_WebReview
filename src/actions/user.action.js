export const GET_USER_LIST = "GET_USER_LIST";
export const GET_USER_LIST_SUCCESS = "GET_USER_LIST_SUCCESS";
export const GET_USER_LIST_FAILED = "GET_USER_LIST_FAILED";

export const getUserList = (params) => {
    return {
        type: GET_USER_LIST,
        params
    }
}

export const getUserListSuccess = (data) => {
    return {
        type: GET_USER_LIST_SUCCESS,
        data
    }
}

export const getUserListFailed = (error) => {
    return {
        type: GET_USER_LIST_FAILED,
        error
    }
}
