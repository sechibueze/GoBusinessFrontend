import { setAlert } from './AlertActions';
import { baseURL, LOADED, LOADING, TOGGLE_ADMIN_AUTH, GET_ALL_USERS, DELETE_USER } from './types';
import { getRequestConfig } from "./AuthActions";

export const getAllusers = (filter={}) => dispatch => {
    dispatch({ type: LOADING});
    const url = `${ baseURL }/api/users`;
    const requestConfig = getRequestConfig("GET");
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        return response.json().then(errorResponse => {          
          setAlert(errorResponse.error, GET_ALL_USERS);
          dispatch({ type: LOADED })
        })       
      })
      .then(data => {
        if (data) {         
          dispatch({
            type: GET_ALL_USERS,
            payload: data.data
          });  
          dispatch(setAlert(data.message, GET_ALL_USERS, "success"));      
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {       
        setAlert('Network error, please try again later', GET_ALL_USERS);
        dispatch({ type: LOADED })
      })
}
export const toggleAdminAuth = (userId) => dispatch => {
    dispatch({ type: LOADING});
    const url = `${ baseURL }/api/users/${ userId }/admin`;
    const requestConfig = getRequestConfig("PUT");
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        return response.json().then(errorResponse => {          
          setAlert(errorResponse.error, TOGGLE_ADMIN_AUTH);
          dispatch({ type: LOADED })
        })       
      })
      .then(data => {
        if (data) {         
          dispatch({
            type: TOGGLE_ADMIN_AUTH,
            payload: data.data
          });  
          dispatch(setAlert(data.message, TOGGLE_ADMIN_AUTH, "success"));      
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {       
        setAlert('Network error, please try again later', TOGGLE_ADMIN_AUTH);
        dispatch({ type: LOADED })
      })
}
export const deleteUserById = (userId) => dispatch => {
    dispatch({ type: LOADING});
    const url = `${ baseURL }/api/users/${ userId }`;
    const requestConfig = getRequestConfig("DELETE");
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        return response.json().then(errorResponse => {          
          setAlert(errorResponse.error, DELETE_USER);
          dispatch({ type: LOADED })
        })       
      })
      .then(data => {
        if (data) {         
          dispatch({
            type: DELETE_USER,
            payload: data.data
          });  
          dispatch(setAlert(data.message, DELETE_USER, "success"));      
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {       
        setAlert('Network error, please try again later', DELETE_USER);
        dispatch({ type: LOADED })
      })
}


// export const setRequestConfig = (method='GET', body = {}, contentType='application/json') => {
//    return  {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       //body: JSON.stringify(payload) // body data type must match "Content-Type" header
//     }
// }


