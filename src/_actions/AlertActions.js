// import { v4 } from 'uuid';
import { SET_ALERT, LOADED, CLEAR_ALERT } from './types';


export const setAlert = (alertText, origin = 'AUTH', type="danger",  timeout = 3000) => dispatch => {
  // const alertId = v4();
  const alertId = Math.floor(Math.random() * 10);
  dispatch({
    type: SET_ALERT,
    payload: { alertText, alertId, origin, type }
  });
  dispatch({ type: LOADED})

  setTimeout(() => (dispatch({
    type: CLEAR_ALERT,
    payload: alertId
  })), timeout)
}

export const clearAlert = (alertId = null) => dispatch => {
  dispatch({
    type: CLEAR_ALERT,
    payload: alertId
  });
};

