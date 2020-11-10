export const APP_NAME = 'GoBusiness';
export const baseURL = process.env.NODE_ENV === 'production'? 'https://gobusiness-backend.herokuapp.com': 'http://localhost:4000';

/**** USERS *********/
export const TOGGLE_ADMIN_AUTH = "TOGGLE_ADMIN_AUTH";
export const DELETE_USER = "DELETE_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";

/**** INVESTMENTS *********/
export const MAKE_INVESTMENT_CONTRIBUTION = "MAKE_INVESTMENT_CONTRIBUTION";
export const GET_MY_CONTRIBUTIONS = "GET_MY_CONTRIBUTIONS";
export const GET_INVESTORS = "GET_INVESTORS";


export const CREATE_INVESTMENT = "CREATE_INVESTMENT";
export const UPDATE_INVESTMENT = "UPDATE_INVESTMENT";
export const GET_INVESTMENT_LIST = "GET_INVESTMENT_LIST";
export const GET_INVESTMENT_ITEM = "GET_INVESTMENT_ITEM";
export const DELETE_INVESTMENT = "DELETE_INVESTMENT";
export const RESET_INVESTMENT_DATA = "RESET_INVESTMENT_DATA";

/**** BUSINESS *********/
export const CREATE_BUSINESS = "CREATE_BUSINESS";
export const UPDATE_BUSINESS = "UPDATE_BUSINESS";
export const GET_BUSINESS_LIST = "GET_BUSINESS_LIST";
export const GET_BUSINESS_ITEM = "GET_BUSINESS_ITEM";
export const DELETE_BUSINESS = "DELETE_BUSINESS";
export const RESET_BUSINESS_DATA = "RESET_BUSINESS_DATA";


/**** AUTH *********/

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOAD_CURRENT_USER = "LOAD_CURRENT_USER";
export const LOADING = "LOADING";
export const LOADED = "LOADED";
export const LOGOUT = "LOGOUT";

/**** ALERTS******** */
export const CLEAR_ALERT = "CLEAR_ALERT";
export const SET_ALERT = "SET_ALERT";