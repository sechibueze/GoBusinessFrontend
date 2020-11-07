import { combineReducers } from 'redux';
import AlertReducer from './AlertReducer';
import AuthReducer from './AuthReducer';
import BusinessReducer from './BusinessReducer';
import InvestmentReducer from './InvestmentReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  alerts: AlertReducer,
  auth: AuthReducer,
  business: BusinessReducer,
  investment: InvestmentReducer,
  user: UserReducer
});