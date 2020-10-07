export const GET_PROFILE_USER = "GET_PROFILE_USER";
export const GET_PROFILE_USER_SUCCESS = "GET_PROFILE_USER_SUCCESS";
export const GET_PROFILE_USER_FAILED = "GET_PROFILE_USER_FAILED";

export const getProfileUser = (token) => {
    return {
        type: GET_PROFILE_USER,
        token
    }
}

export const getProfileUserSuccess = (user) => {
    return {
        type: GET_PROFILE_USER_SUCCESS,
        data: user
    }
}

export const getProfileUserFailed = (error) => {
    return {
        type: GET_PROFILE_USER_FAILED,
        error
    }
}
