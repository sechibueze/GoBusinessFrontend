import { combineReducers } from 'redux';
import AlertReducer from './AlertReducer';

export default combineReducers({
  alerts: AlertReducer
});