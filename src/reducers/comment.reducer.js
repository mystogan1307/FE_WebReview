import { GET_COMMENT_LIST, GET_COMMENT_LIST_SUCCESS, GET_COMMENT_LIST_FAILED } from "../actions/comment.action";

const initComment = []

const commentReducer = (state = initComment, action) => {
    switch (action.type) {
        case GET_COMMENT_LIST:
            return Object.assign({}, state, {
                loading: true,
                failed: false
            })
            
        case GET_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, {
                commentList: action.data.comments,
                commentTotal: action.data.commentsNumber,
                loading: false,
                failed: false
            })

        case GET_COMMENT_LIST_FAILED:
            return Object.assign({}, state, {
                error: action.error,
                loading: false,
                failed: true
            })
        default:
            return state;
    }
}

export default commentReducer;
