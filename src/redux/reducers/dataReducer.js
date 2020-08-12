import { SEARCH_EMPLOYEE, SEARCH_JOBS, LOADING_DATA } from "./types";

const initialState = {
  loading: false,
  jobs: [],
  employees: [],
};

export default function (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
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
