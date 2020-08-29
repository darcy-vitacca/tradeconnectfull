import {
  SEARCH_EMPLOYEE,
  SEARCH_JOBS,
  LOADING_DATA,
  ERROR_CLEAR_LOADING,
  CLEAR_EMPLOYEES,
  CLEAR_JOBS,
  GET_PROFILE,
  CLEAR_PROFILE,
  RESET_DATA,
} from "./types";

const initialState = {
  loading: false,
  jobs: [],
  employees: [],
  profile: [],
};

// TODO:// if search is clicked again delete current searches
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case ERROR_CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_EMPLOYEES:
      return {
        ...state,
        employees: [],
      };
    case CLEAR_JOBS:
      return {
        ...state,
        jobs: [],
      };
    case SEARCH_EMPLOYEE:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };
    case SEARCH_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: [],
      };
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
}
