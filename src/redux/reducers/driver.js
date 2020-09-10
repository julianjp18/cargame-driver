import {
  CREATE_DRIVER,
  SHOW_DRIVER,
  CHANGE_PHONE_NUMBER,
  CHANGE_PROFILE_PICTURE,
} from '../actions/drivers';

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DRIVER:
    case CREATE_DRIVER:
      return {
        id: action.id,
        name: action.name,
        numberId: action.numberId,
        phone: action.phone,
        referidNumber: action.referidNumber,
        driverId: action.driverId,
        profilePicture: action.profilePicture,
      };
    case CHANGE_PHONE_NUMBER:
      return {
        ...state,
        phone: action.phone,
      };
    case CHANGE_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.profilePicture,
      };
    default:
        return state;
  }
};
