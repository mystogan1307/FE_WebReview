export const GET_COMMENT_LIST = "GET_COMMENT_LIST";
export const GET_COMMENT_LIST_SUCCESS = "GET_COMMENT_LIST_SUCCESS";
export const GET_COMMENT_LIST_FAILED = "GET_COMMENT_LIST_FAILED";

export const getCommentList = (params) => {
    return {
        type: GET_COMMENT_LIST,
        params
    }
}

export const getCommentListSuccess = (commentList) => {
    return {
        type: GET_COMMENT_LIST_SUCCESS,
        data: commentList
    }
}

export const getCommentListFailed = (error) => {
    return {
        type: GET_COMMENT_LIST_FAILED,
        error
    }
}
