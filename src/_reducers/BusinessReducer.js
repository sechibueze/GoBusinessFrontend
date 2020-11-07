import { CREATE_BUSINESS, UPDATE_BUSINESS, GET_BUSINESS_ITEM, GET_BUSINESS_LIST, RESET_BUSINESS_DATA, DELETE_BUSINESS} from "../_actions/types";

const initialState = {
  businessItems: [],
  businessData: {},
  newBusiness: null,
  updatedBusiness: null,
  deletedBusiness: null

}
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BUSINESS_LIST:
      return {
        ...state,
        businessItems: payload
      }
    case GET_BUSINESS_ITEM:
      return {
        ...state,
        businessData: payload
      }
    case CREATE_BUSINESS:
      return {
        ...state,
        newBusiness: payload
      }
    case UPDATE_BUSINESS:
      return {
        ...state,
        updatedBusiness: payload
      }
    case DELETE_BUSINESS:
      return {
        ...state,
        deletedBusiness: payload
      }
    case RESET_BUSINESS_DATA:
      return {
        ...state,
        newBusiness: null,
        updatedBusiness: null,
        deletedBusiness: null
      }
  
    default:
      return state;
  }
}