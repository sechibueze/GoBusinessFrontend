import { 
  baseURL, GET_INVESTORS, GET_INVESTMENT_ITEM, GET_INVESTMENT_LIST,
   RESET_INVESTMENT_DATA, LOADED, LOADING, CREATE_INVESTMENT, UPDATE_INVESTMENT
  ,MAKE_INVESTMENT_CONTRIBUTION, GET_MY_CONTRIBUTIONS } from "./types";
import { getRequestConfig } from './AuthActions';
import { setAlert } from "./AlertActions";

export const getInvestorsOfInvestment = (investmentId) => dispatch => {
  dispatch({ type: LOADING});
  let url = `${ baseURL }/api/investments/${ investmentId }/investors`;
  const reqConfig = getRequestConfig("GET");
  fetch(url, reqConfig)
    .then(response => {
      if(!response.ok) {
        return response.json().then(errorObj => dispatch(setAlert(errorObj.errors, GET_INVESTORS)))
      }     
      return response.json();
    })
    .then(data => {
      if(data){
        dispatch({ type: GET_INVESTORS, payload: data.data});
        dispatch(setAlert(data.message, GET_INVESTORS, 'success'));
      }
      dispatch({ type: LOADED})
    }).catch(err => {
      return dispatch(setAlert("A network error has occurred", GET_INVESTORS));
    })
};
export const getCurrentUserContributions = () => dispatch => {
  dispatch({ type: LOADING});
  let url = `${ baseURL }/api/users/investments`;
  const reqConfig = getRequestConfig("GET");
  fetch(url, reqConfig)
    .then(response => {
      if(!response.ok) {
        return response.json().then(errorObj => dispatch(setAlert(errorObj.errors, GET_MY_CONTRIBUTIONS)))
      }     
      return response.json();
    })
    .then(data => {
      if(data){
        dispatch({ type: GET_MY_CONTRIBUTIONS, payload: data.data});
        dispatch(setAlert(data.message, GET_MY_CONTRIBUTIONS, 'success'));
      }
      dispatch({ type: LOADED})
    }).catch(err => {
      return dispatch(setAlert("A network error has occurred", GET_MY_CONTRIBUTIONS));
    })
};
export const makeInvestmentContribution = (contributionData) => dispatch => {
  dispatch({ type: LOADING});
  const { investmentId, units } = contributionData;
  let url = `${ baseURL }/api/investments/${ investmentId }/subscriptions`;
  const reqConfig = getRequestConfig("PUT", { units });
  fetch(url, reqConfig)
    .then(response => {
      if(!response.ok) {
        return response.json().then(errorObj => dispatch(setAlert(errorObj.errors, MAKE_INVESTMENT_CONTRIBUTION)))
      }     
      return response.json();
    })
    .then(data => {
      if(data){
        dispatch({ type: MAKE_INVESTMENT_CONTRIBUTION, payload: data.data});
        dispatch(setAlert(data.message, MAKE_INVESTMENT_CONTRIBUTION, 'success'));
      }
      dispatch({ type: LOADED})
    }).catch(err => {
      return dispatch(setAlert("A network error has occurred", MAKE_INVESTMENT_CONTRIBUTION));
    })
};
export const createInvestment = (investmentData) => dispatch => {
  dispatch({ type: LOADING})
  let url = `${ baseURL }/api/investments`;
  const reqConfig = getRequestConfig("POST", investmentData);
  fetch(url, reqConfig)
    .then(response => {
      if(!response.ok) {
        return response.json().then(errorObj => dispatch(setAlert(errorObj.error, CREATE_INVESTMENT)))
      }     
      return response.json();
    })
    .then(data => {
      if(data){
        dispatch({ type: CREATE_INVESTMENT, payload: data.data});
        dispatch(setAlert(data.message, CREATE_INVESTMENT, 'success'));
      }
      dispatch({ type: LOADED})
    }).catch(err => {
      return dispatch(setAlert("A network error has occurred", CREATE_INVESTMENT));
    })
};
export const editInvestment = (investmentData) => dispatch => {
  dispatch({ type: LOADING})
  let url = `${ baseURL }/api/investments/${investmentData._id}`;
  
  const reqConfig = getRequestConfig("PUT", investmentData);
  fetch(url, reqConfig)
    .then(response => {
      if(!response.ok) {
        return response.json()
          .then(errorObj => dispatch(setAlert(errorObj.error, UPDATE_INVESTMENT)));
      }
      
      return response.json();
    })
    .then(data => {
      if(data){
        dispatch({ type: UPDATE_INVESTMENT, payload: data.data});
        dispatch(setAlert(data.message, UPDATE_INVESTMENT, 'success'));
      }
      dispatch({ type: LOADED})
    }).catch(err => {
      return dispatch(setAlert("A network error has occurred", UPDATE_INVESTMENT));
    })
};
export const getInvestmentList = (filter={}) => dispatch => {
  dispatch({ type: LOADING})
  let url = `${ baseURL }/api/investments`;
  url = new URL(url);
  if (filter.ownerId || filter.investmentId || filter.businessOwner || filter.isVerified) {
    url.search = new URLSearchParams(filter);
  }
  const reqConfig = getRequestConfig();
  fetch(url, reqConfig)
    .then(response => {
      if(response.ok) return response.json();
    })
    .then(data => {
      dispatch({ 
        type: filter.investmentId ? GET_INVESTMENT_ITEM:  GET_INVESTMENT_LIST, 
        payload: data.data});
      dispatch({ type: LOADED})
    }).catch(err => {
      return dispatch(setAlert("A network error has occurred", filter.investmentId ? GET_INVESTMENT_ITEM:  GET_INVESTMENT_LIST));
    })
};

export const resetInvestmentData = () => dispatch => {
  return dispatch({ type: RESET_INVESTMENT_DATA})
};