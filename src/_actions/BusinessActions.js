import { baseURL, GET_BUSINESS_ITEM, GET_BUSINESS_LIST, RESET_BUSINESS_DATA, LOADED, LOADING, CREATE_BUSINESS, UPDATE_BUSINESS } from "./types";
import { getRequestConfig } from './AuthActions';
import { setAlert } from "./AlertActions";

export const createBusiness = (businessData) => dispatch => {
  dispatch({ type: LOADING})
  let url = `${ baseURL }/api/business`;
  const reqConfig = getRequestConfig("POST", businessData);
  fetch(url, reqConfig)
    .then(response => {
      if(!response.ok) {
        return response.json().then(errorObj => dispatch(setAlert(errorObj.error, CREATE_BUSINESS)))
      }     
      return response.json();
    })
    .then(data => {
      if(data){
        dispatch({ type: CREATE_BUSINESS, payload: data.data});
        dispatch(setAlert(data.message, CREATE_BUSINESS, 'success'));
      }
      dispatch({ type: LOADED})
    }).catch(err => {
      return dispatch(setAlert("A network error has occurred", CREATE_BUSINESS));
    })
};
export const editBusiness = (businessData) => dispatch => {
  dispatch({ type: LOADING})
  let url = `${ baseURL }/api/business/${businessData._id}`;
  
  const reqConfig = getRequestConfig("PUT", businessData);
  fetch(url, reqConfig)
    .then(response => {
      if(!response.ok) {
        return response.json().then(errorObj => dispatch(setAlert(errorObj.error, UPDATE_BUSINESS)));
      }
      
      return response.json();
    })
    .then(data => {
      if(data){
        dispatch({ type: UPDATE_BUSINESS, payload: data.data});
        dispatch(setAlert(data.message, UPDATE_BUSINESS, 'success'));
      }
      dispatch({ type: LOADED})
    }).catch(err => {
      return dispatch(setAlert("A network error has occurred", UPDATE_BUSINESS));
    })
};
export const getBusinessListByFilter = (filter={}) => dispatch => {
  dispatch({ type: LOADING})
  let url = `${ baseURL }/api/business`;
  url = new URL(url);
  if (filter.ownerId || filter.businessId) {
    url.search = new URLSearchParams(filter);
  }
  const reqConfig = getRequestConfig();
  fetch(url, reqConfig)
    .then(response => {
      if(response.ok) return response.json();
    })
    .then(data => {
      dispatch({ type: GET_BUSINESS_LIST, payload: data.data});
      dispatch({ type: LOADED})
    }).catch(err => {
      return dispatch(setAlert("A network error has occurred", GET_BUSINESS_LIST));
    })
};
export const getBusinessById = (filter={}) => dispatch => {
  dispatch({ type: LOADING})
  let url = `${ baseURL }/api/business`;
  url = new URL(url);
  if (filter.ownerId || filter.businessId) {
    url.search = new URLSearchParams(filter);
  }
  console.log('get business url', url)
  const reqConfig = getRequestConfig();
  fetch(url, reqConfig)
    .then(response => {
      if(response.ok) return response.json();
    })
    .then(data => {
      
      dispatch({ type: GET_BUSINESS_ITEM, payload: data.data[0]});
      dispatch({ type: LOADED})
    }).catch(err => {
      return dispatch(setAlert("A network error has occurred", GET_BUSINESS_ITEM));
    })
};

export const resetBusinessData = () => dispatch => {
  return dispatch({ type: RESET_BUSINESS_DATA})
};