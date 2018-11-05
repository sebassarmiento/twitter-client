import * as Actions from './actions';

const initialStore = {
    logged: false
}

const reducer = (state = initialStore, action) => {
    switch (action.type) {
        case Actions.LOGIN_SUCCESS:
            return {
                ...state,
                logged: true,
                token: action.payload.token,
                userId: action.payload.userId,
                username: action.payload.username
            }
        case Actions.LOGIN_FAILURE:
            return state
        case Actions.SIGNUP_SUCCESS:
            return { ...state, logged: true, username: action.payload.username }
        case Actions.NEW_TWEET:
            return { ...state, newTweet: true }
        case Actions.NEW_TWEET_CLOSE:
            return { ...state, newTweet: false }
        default:
            return state
    }
}

export default reducer;