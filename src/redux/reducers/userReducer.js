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
  RESET_USER,
  GET_INBOX,
  CLEAR_INBOX,
  DELETE_ITEM_INBOX,
  SEND_ITEM_INBOX,
} from "./types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  profile: {},
  editing: false,
  editJobId: "",
  jobs: [],
  inbox: [],
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
    case RESET_USER:
      return initialState;

    case GET_INBOX:
      return {
        ...state,
        loading: false,
        inbox: action.payload,
      };

    case DELETE_ITEM_INBOX:
      console.log(action.payload);
      console.log(action.inboxMethod);
      if (action.inboxMethod === "recipient") {
        return {
          ...state,
          inbox: {
            inboxAll: [
              ...state.inbox.inboxAll.filter(
                (item) => item.messageId !== action.payload
              ),
            ],
            sentAll: [...state.inbox.sentAll],
          },
        };
      } else if (action.inboxMethod === "sender") {
        return {
          ...state,
          inbox: {
            inboxAll: [...state.inbox.inboxAll],
            sentAll: [
              ...state.inbox.sentAll.filter(
                (item) => item.messageId !== action.payload
              ),
            ],
          },
        };
      }

    // case CLEAR_INBOX:

    // SEND_ITEM_INBOX:

    default:
      return state;
  }
}
