import {
    GET_LABEL_LIST, GET_LABEL_LIST_FAILED, GET_LABEL_LIST_SUCCESS
} from "../actions/label.action";

const initLabels = {};

const labelReducer = (state = initLabels, action) => {
    switch (action.type) {
        case GET_LABEL_LIST:
            return Object.assign({}, state, {
                loading: true,
                failed: false
            });

        case GET_LABEL_LIST_SUCCESS:
            return Object.assign({}, state, {
                labelList: action.data.labelList,
                labelTotal: action.data.labelNumber,
                loading: false,
                failed: false
            });

        case GET_LABEL_LIST_FAILED:
                return Object.assign({}, state, {
                    loading: false,
                    failed: true
                });
        default:
            return state;
    }
}

export default labelReducer;
