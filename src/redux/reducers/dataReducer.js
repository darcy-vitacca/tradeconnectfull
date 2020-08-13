import {
  SEARCH_EMPLOYEE,
  SEARCH_JOBS,
  LOADING_DATA,
  CLEAR_EMPLOYEES,
  CLEAR_JOBS
} from "./types";

const initialState = {
  loading: false,
  jobs: [],
  employees: [],
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
    default:
      return state;
  }
}
