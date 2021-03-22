import {
  AUTHENTICATE,
  IS_SIGNUP,
  LOGOUT,
  CHANGE_TYPE_SERVICE_SELECTED,
  ERROR,
} from "../actions/auth";

const initialState = {
  token: null,
  driverId: null,
  isSignUp: false,
  email: null,
  typeServiceSelected: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_SIGNUP:
      return {
        ...state,
        isSignUp: action.isSignUp,
      };
    case AUTHENTICATE:
      return {
        ...state,
        token: action.idToken,
        driverId: action.driverId,
        email: action.email,
      };
    case CHANGE_TYPE_SERVICE_SELECTED:
      return {
        ...state,
        typeServiceSelected: action.typeServiceSelected,
      };
    case ERROR:
      return {
        ...state,
        error: action.message,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};