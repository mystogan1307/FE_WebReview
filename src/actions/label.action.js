export const GET_LABEL_LIST = "GET_LABEL_LIST";
export const GET_LABEL_LIST_SUCCESS = "GET_LABEL_LIST_SUCCESS";
export const GET_LABEL_LIST_FAILED = "GET_LABEL_LIST_FAILED";

export const getLabelList = (params) => {
    return {
        type: GET_LABEL_LIST,
        params
    }
}

export const getLabelListSuccess = (labelList) => {
    return {
        type: GET_LABEL_LIST_SUCCESS,
        data: labelList
    }
}

export const getLabelListFailed = (error) => {
    return {
        type: GET_LABEL_LIST_FAILED,
        error
    }
}
