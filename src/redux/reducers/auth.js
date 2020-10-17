import {
  AUTHENTICATE,
  IS_SIGNUP,
  LOGOUT,
  CHANGE_TYPE_SERVICE_SELECTED,
} from "../actions/auth";

const initialState = {
  token: null,
  driverId: null,
  isSignUp: false,
  email: null,
  typeServiceSelected: null,
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
        token: action.token,
        driverId: action.driverId,
        email: action.email,
      };
    case CHANGE_TYPE_SERVICE_SELECTED:
      return {
        ...state,
        typeServiceSelected: action.typeServiceSelected,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};