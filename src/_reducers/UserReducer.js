import {
  
  TOGGLE_ADMIN_AUTH,
  GET_ALL_USERS,
  DELETE_USER
} from '../_actions/types';
const initialState = {
  secret: null,
  users: [],
  deletedUser: null,
};
export default function (state = initialState, action) {
  const { type, payload} = action;

  switch (type) {
    case TOGGLE_ADMIN_AUTH:
      return {
        ...state,
        secret: payload
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload
      };
    case DELETE_USER:
      return {
        ...state,
        deletedUser: payload
      };
    
    default:
      return state;
  }
};