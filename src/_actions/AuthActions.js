import { setAlert } from './AlertActions';
import { baseURL, LOADED, LOADING, SIGNUP_SUCCESS, SIGNUP_FAIL, AUTH_ERROR, LOAD_CURRENT_USER, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './types';

export const getRequestConfig = (method="GET", body = null ) => {
  let requestConfig = {
      method: method,
      headers: {
        'Content-Type':'application/json'
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      requestConfig.headers['x-auth-token'] = token;
    }
    if(body){
      requestConfig["body"] = JSON.stringify(body)
    }

    return requestConfig;
};
export const loadCurrentUser = () => dispatch => {
    const url = `${ baseURL }/api/auth`;
    const requestConfig = getRequestConfig();
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        response.json().then(errorResponse => {          
          setAlert(errorResponse.error, AUTH_ERROR);
        })       
      })
      .then(data => {
        if (data) {         
          dispatch({
            type: LOAD_CURRENT_USER,
            payload: data.data
          });        
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {       
        setAlert('Network error, please try again later', AUTH_ERROR);
        dispatch({ type: LOADED })
      })
}
export const signupUser = userData => dispatch => {
  dispatch({ type: LOADING })
    const url = `${ baseURL }/api/auth/signup`;
    let requestConfig = getRequestConfig("POST", userData);
    // Call HTTP
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        response.json().then(errorResponse => {
          
          setAlert(errorResponse.error, SIGNUP_FAIL);
        })
        
      })
      .then(data => {
        if (data) {
          const { token } = data;
          localStorage.setItem('token', token);
          dispatch(loadCurrentUser());
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: token
          });         
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {      
        setAlert('Network error, please try again later', SIGNUP_FAIL);
        dispatch({ type: LOADED })
      })
};
export const loginUser = userData => dispatch => {
  dispatch({ type: LOADING })
  const body = JSON.stringify(userData);
    const url = `${ baseURL }/api/auth/login`;
    let requestConfig = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: body
    };
    // Call HTTP
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        // Response is outsie 2xx range
        response.json().then(errorResponse => {
          
          setAlert(errorResponse.error, LOGIN_FAIL);
        })
        
      })
      .then(data => {
        if (data) {
          const { token } = data;
          localStorage.setItem('token', token);

          dispatch(loadCurrentUser());

          dispatch({
            type: LOGIN_SUCCESS,
            payload: token
          });
          
          dispatch({ type: LOADED })
        }
      }) 
      .catch(err => {
        
        setAlert('Network error, please try again later', LOGIN_FAIL);
        dispatch({ type: LOADED })
      })
};
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


export const logout = () => dispatch => {
  dispatch({ type: LOGOUT})
}