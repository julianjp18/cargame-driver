import { SIGNIN, SIGNUP, IS_SIGNUP, LOGOUT } from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    isSignUp: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case IS_SIGNUP:
            return {
                ...state,
                isSignUp: action.isSignUp,
            }
        case SIGNIN:
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId,
                isSignUp: false,
            }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};