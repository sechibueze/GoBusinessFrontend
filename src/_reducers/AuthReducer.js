import {
  LOADING,
  LOADED,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_CURRENT_USER,
  LOGOUT,

  // GET_ACCESS,
  // ADD_ACCESS,
  // DELETE_ACCESS,
  // UPLOAD_ACCESS,
  // FLUSH_ACCESS_LIST,
  // RESET_ACCESS_DATA,
} from '../_actions/types';
const initialState = {
  token: null,
  isAuthenticated: null,
  currentUser: null,
  loading: false,

  accessList: [],
  newAccess: null,
  updatedAccess: null,
  deleteAccess: null,
  updatedAccessList: null,
  newAccessUpload: null,
};
export default function (state = initialState, action) {
  const { type, payload} = action;

  switch (type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload,
        isAuthenticated: true
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: null,
        currentUser: null
      };
    case LOAD_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true
      };
    
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case LOADED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};