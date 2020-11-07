import { MAKE_INVESTMENT_CONTRIBUTION, CREATE_INVESTMENT, UPDATE_INVESTMENT, GET_INVESTMENT_ITEM, GET_INVESTMENT_LIST, RESET_INVESTMENT_DATA, DELETE_INVESTMENT, GET_MY_CONTRIBUTIONS} from "../_actions/types";

const initialState = {
  newContribution: null,
  currentUserContributions: [],


  investmentItems: [],
  investmentData: null,
  newInvestment: null,
  updatedInvestment: null,
  deletedInvestment: null
}
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    
    case MAKE_INVESTMENT_CONTRIBUTION:
      return {
        ...state,
        newContribution: payload
      }
    case GET_MY_CONTRIBUTIONS:
      return {
        ...state,
        currentUserContributions: payload
      }
    case GET_INVESTMENT_LIST:
      return {
        ...state,
        investmentItems: payload
      }
    case GET_INVESTMENT_ITEM:
      return {
        ...state,
        investmentData: payload
      }
    case CREATE_INVESTMENT:
      return {
        ...state,
        newInvestment: payload
      }
    case UPDATE_INVESTMENT:
      return {
        ...state,
        updatedInvestment: payload
      }
    case DELETE_INVESTMENT:
      return {
        ...state,
        deletedInvestment: payload
      }
    case RESET_INVESTMENT_DATA:
      return {
        ...state,
        newInvestment: null,
        updatedInvestment: null,
        deletedInvestment: null
      }
  
    default:
      return state;
  }
}