import {
CREATE_USER
} from '../actions/users';
import User from '../../models/User';

const initialState = {
  userData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      const newUser = new User(
        action.userData.id,
        action.userData.name,
        action.userData.numberId,
        action.userData.phone,
        action.userData.email,
        action.userData.referidNumber,
      );
      return {
        ...state,
        userData: state.userData.concat(newProduct)
      };
    default:
        return state;
  }
};
