import {
  CREATE_USER, SHOW_USER, CHANGE_PHONE_NUMBER,
} from '../actions/users';

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_USER:
    case CREATE_USER:
      return {
        id: action.id,
        name: action.name,
        numberId: action.numberId,
        phone: action.phone,
        referidNumber: action.referidNumber,
        userId: action.userId
      };
    case CHANGE_PHONE_NUMBER:
      return {
        ...state,
        phone: action.phone,
      }
    default:
        return state;
  }
};
