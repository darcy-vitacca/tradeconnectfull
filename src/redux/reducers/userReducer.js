import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  LOADING_USER,
  SET_UNAUTHENTICATED,
  SET_PROFILE,
  DELETE_PROFILE_CREATED,
  SET_ERRORS_PROFILE,
  DELETE_PROFILE,
  EDIT_PROFILE,
  JOB_DASHBOARD,
  DELETE_JOB,
  EDIT_JOB,
} from "./types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  profile: {},
  editing: false,
  editJobId: "",
  jobs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,

        ...action.payload,
      };
    case SET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case DELETE_PROFILE_CREATED:
      return {
        ...state,
        loading: false,
        credentials: {
          ...state.credentials,
          profileCreated: false,
        },
        profile: "Profile not found",
      };
    case SET_ERRORS_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload.error,
      };
    case EDIT_PROFILE:
      let editState = !state.editing;
      return {
        ...state,
        editing: editState,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case JOB_DASHBOARD:
      return {
        ...state,
        jobs: action.payload,
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: [...state.jobs.filter((job) => job.jobId !== action.payload)],
      };
    case EDIT_JOB:
      let editJobState = !state.editing;
      return {
        ...state,
        editJobId: action.payload,
        editing: editJobState,
      };
    default:
      return state;
  }
}
