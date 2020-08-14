import {
  SEARCH_EMPLOYEE,
  SEARCH_JOBS,
  LOADING_DATA,
  CLEAR_EMPLOYEES,
  CLEAR_JOBS,
  GET_PROFILE,
  CLEAR_PROFILE
} from "./types";

const initialState = {
  loading: false,
  jobs: [],
  employees: [],
  profile :[]
};

// TODO:// if search is clicked again delete current searches
export default function (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
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
        employees: action.payload,
        loading: false,
      };

    case SEARCH_JOBS:
      return {
        jobs: action.payload,
        loading: false,
      };

      case GET_PROFILE:
        return {
          profile : action.payload,
          loading: false,
        };


    case CLEAR_PROFILE:
      return {
        ...state,
        profile: [],
      };
    default:
      return state;
  }
}
