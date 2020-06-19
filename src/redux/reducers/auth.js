import {
    SIGNIN,
    SIGNUP, 
    IS_SIGNUP,
    LOGOUT,
    CHANGE_TYPE_SERVICE_SELECTED,
} from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    isSignUp: false,
    typeServiceSelected: null,
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
                ...state,
                token: action.token,
                userId: action.userId,
            }
        case CHANGE_TYPE_SERVICE_SELECTED:
            return {
                ...state,
                typeServiceSelected: action.typeServiceSelected,
            }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};