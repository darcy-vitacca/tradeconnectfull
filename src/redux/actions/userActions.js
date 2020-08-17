import {
  SET_USER,
  SET_ERRORS,
  SET_ERRORS_PROFILE,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SEARCH_EMPLOYEE,
  SEARCH_JOBS,
  LOADING_DATA,
  CLEAR_EMPLOYEES,
  CLEAR_JOBS,
  GET_PROFILE,
  CLEAR_PROFILE,
  SET_PROFILE,
  LOADING_USER,
} from "../reducers/types";
import axios from "axios";
// TODO: WHEN YOU CHANGE PAGES REMOVE DATA FROM REDUX

//this is taken from the login page and we need to user dispatch because we have asynchronous code. We can set the login from the  action itself here we use dispatch to set the type whcih is loading UI. We dispatch the type then catch it from the user. We need to redirect by passing in history from the login component to the action then the action will use it
//LOGIN USER
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      //We need to pass the type clear errors in case there is any errors in our form then redirect
      dispatch({ type: CLEAR_ERRORS });
      //this is a method we use to push a path to go to it this will redirect
      //TODO: this should go to create a profile or profile if they have a profile
      history.push("/myprofile");
    })
    .catch((err) => {
      console.log(err);
      //if there are errors we need to dispatch to the global state to show errors this is similar to what we had in the components but this will set it to the global state
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//LOGOUT USER
export const logoutUser = (history) => (dispatch) => {
  //THIS REMOVES THE TOKEN FROM THE STORAGE
  localStorage.removeItem(`FBIdToken`);
  //THIS REMOVED THE AUTH HEADER WHICH HAS BEEN SET
  delete axios.defaults.headers.common["Authorization"];
  //THIS CHANGES AUTHENTICATED TO FALSE AND DISPATCHES IT
  dispatch({ type: SET_UNAUTHENTICATED });
  history.push("/login");
};

//we login and when we get the data back we want to fetch the user it doesn't take an argument becuause we get the token back. This sends a get request to /user to get user data and if we get a result we need to dispatch an action which is the SET_USER and this action gives a payload which is data we send to the reducer and the reducer does something with it.

//HELPER - GET USER DATA
export const getUserData = () => (dispatch) => {
  let uid;
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      uid = res.data.credentials.userId;
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      axios
        .get(`/getprofile/${uid}`)
        .then((res) => {
          // console.log(res.data);
          dispatch({
            type: SET_PROFILE,
            payload: res.data.profile,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: SET_ERRORS_PROFILE,
            payload: err.response.data,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//HELPER - GET PROFILE
// export const getUserProfile = () => (dispatch) =>{

// }

//SIGNUP USER
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      //TODO: change to my profile?
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      //if there are errors we need to dispatch to the global state to show errors this is similar to what we had in the components but this will set it to the global state
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//CREATE A PROFILE
export const createProfile = (profileDetails, history) => (dispatch) => {
  // console.log(profileDetails);
  // console.log(history);
  dispatch({ type: LOADING_UI });
  axios
    .post("/createprofile", profileDetails)
    .then((res) => {
      // console.log(res.data);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      //redirect to user page
      history.push(`/myprofile`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//CREATE A JOB
export const createJob = (newJob, history) => (dispatch) => {
  console.log(newJob);
  console.log(history);
  dispatch({ type: LOADING_UI });
  axios
    .post("/createjob", newJob)
    .then((res) => {
      // console.log(res.data);
      // dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS });
      //redirect to user page
      history.push(`/jobsearch`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//SEARCH JOBS
export const searchJobs = (searchReq, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  dispatch({ type: CLEAR_JOBS });
  axios
    .post("/searchjobs", searchReq)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SEARCH_JOBS,
        payload: res.data,
      });
      history.push(`/jobsearch`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      history.push(`/jobsearch`);
    });
};

//SEARCH PEOPLE
export const searchEmployee = (searchReq, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  dispatch({ type: CLEAR_EMPLOYEES });
  axios
    .post("/searchemployee", searchReq)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SEARCH_EMPLOYEE,
        payload: res.data,
      });
      history.push(`/peoplesearch`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      history.push(`/peoplesearch`);
    });
};
//UPLOAD IMAGE
export const uploadImage = (formData) => (dispatch) => {
  // dispatch({ type: LOADING_USER });
  return axios
    .post("/user/image", formData)
    .then((res) => {
      console.log("here")
      return res.data.imageUrls
      })
    .catch((err) => console.log(err));
};

//HELPER - SET AUTHORIZATION HEADER
const setAuthorizationHeader = (token) => {
  //the promise returned will through an error if not successful and if we are will be redirected to the home page using history.push loading is changed back becuase we have the result
  //this is for when you get the token you store it in local storage in the browser to be accessed
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  //when we set and store the token we also need to add auth headers through axios to each request to a protected route. Axios default headers allows us to each time we send a request to add the header even to unprotected routes so you are are sotring it in the header
  axios.defaults.headers.common["Authorization"] = FBIdToken;
  //We can dispatch the getUser action which allows us to run it after we are loggedin and authorized
};

//GET PROFILE
// export const getProfile = (uid) => () => {
//   console.log(uid);
//   console.log("here");
//   // dispatch({ type: LOADING_DATA });
//   // dispatch({ type: CLEAR_PROFILE });
//   // axios
//   //  .get(`/getprofile/${uid}`)
//   //   .then((res) => {
//   //     console.log(res.data);
//   //     dispatch({ type: CLEAR_ERRORS });
//   //     dispatch({
//   //       type: GET_PROFILE,
//   //       payload: res.data.profileData,
//   //     });

//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //     dispatch({
//   //       type: SET_ERRORS,
//   //       payload: err.response.data,
//   //     });

//   //   });
// };
