import {
  SET_USER,
  SET_ERRORS,
  SET_ERRORS_PROFILE,
  CLEAR_ERRORS,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SEARCH_EMPLOYEE,
  SEARCH_JOBS,
  LOADING_DATA,
  CLEAR_EMPLOYEES,
  CLEAR_JOBS,
  CLEAR_LOADING,
  SET_PROFILE,
  DELETE_PROFILE_CREATED,
  LOADING_USER,
  EDIT_PROFILE,
  EDIT_JOB,
  JOB_DASHBOARD,
  DELETE_JOB,
  ERROR_CLEAR_LOADING,
  RESET_DATA,
  RESET_UI,
  RESET_USER,
  GET_INBOX,
  DELETE_ITEM_INBOX,
  CONTACT,
  CLEAR_CONTACT,
} from "../reducers/types";
import axios from "axios";
import emailjs from "emailjs-com";

export const pageChangeErrorClear = (state) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: CLEAR_MESSAGE });
};

export const resetUI = () => (dispatch) => {
  dispatch({ type: RESET_UI });
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/myprofile");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//LOGOUT USER
export const logoutUser = (history) => (dispatch) => {
  console.log(history);
  localStorage.removeItem(`FBIdToken`);
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  if (history) {
    history.push("/login");
  }
};

//FORGOT PASSWORD
export const forgotPassword = (userData, history) => (dispatch) => {
  console.log(userData);
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: CLEAR_MESSAGE });
  axios
    .post("/forgotpassword", userData)
    .then((res) => {
      dispatch({ type: SET_MESSAGE, payload: res.data.message });
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//CHANGE PASSWORD
export const changePassword = (userData, history) => (dispatch) => {
  console.log(userData);
  dispatch({ type: LOADING_UI });
  axios
    .post("/updatepassword", userData)
    .then((res) => {
      console.log(res);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_MESSAGE, payload: res.data.message });
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//CHANGE EMAIL
export const changeEmail = (userData, history) => (dispatch) => {
  console.log(userData);
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: CLEAR_MESSAGE });
  axios
    .post("/updateemail", userData)
    .then((res) => {
      dispatch({ type: SET_MESSAGE, payload: res.data.message });
      dispatch(getUserData());
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

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

//SIGNUP USER
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/myprofile");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//CREATE A PROFILE
export const createProfile = (profileDetails, history, editProfile) => (
  dispatch
) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/createprofile", profileDetails)
    .then((res) => {
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      if (editProfile === true) {
        dispatch(editUser(history, editProfile));
      } else {
        history.push("/myprofile");
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//EDIT PROFILE
export const editUser = (history, editPage) => (dispatch) => {
  if (editPage === true) {
    dispatch({ type: EDIT_PROFILE });
    history.push("/myprofile");
  } else {
    dispatch({ type: EDIT_PROFILE });
  }
};

//DELETE PROFILE
export const deleteUser = (userCredentials, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/deleteprofile/${userCredentials.userId}`, userCredentials)
    .then((res) => {
      console.log(res);
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
      dispatch({ type: DELETE_PROFILE_CREATED });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//DELETE ACCOUNT
export const deleteAccount = (handle, userId, history) => (dispatch) => {
  const userCredentials = {
    handle: handle,
    userId: userId,
  };
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/delete/${userId}/${handle}`, userCredentials)
    .then((res) => {
      dispatch(logoutUser(history));
      dispatch({ type: RESET_DATA });
      dispatch({ type: RESET_UI });
      dispatch({ type: RESET_USER });
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
export const createJob = (newJob, history, editing) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/createjob", newJob)
    .then((res) => {
      if (editing === true) {
        dispatch({ type: EDIT_JOB, payload: "" });
      }
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/jobdashboard`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//JOB SEARCH DASHBOARD GET JOBS
export const jobDashboard = (userId) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .get(`/jobdashboard/${userId}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: JOB_DASHBOARD, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//EDIT JOB
export const editJob = (jobId, editPage, history) => (dispatch) => {
  if (editPage === true) {
    dispatch({ type: EDIT_JOB, payload: jobId });
    history.push("/postjob");
  } else {
    dispatch({ type: EDIT_JOB, payload: "" });
  }
};

//DELETE JOB
export const deleteJob = (jobId, userId, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/deletejob/${jobId}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: DELETE_JOB, payload: jobId });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
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
      dispatch({ type: ERROR_CLEAR_LOADING });
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
      dispatch({ type: ERROR_CLEAR_LOADING });
      history.push(`/peoplesearch`);
    });
};
//UPLOAD IMAGE
export const uploadImage = (formData) => (dispatch) => {
  console.log(formData);
  return axios
    .post("/user/image", formData)
    .then((res) => {
      console.log("here");
      return res.data.imageUrls;
    })
    .catch((err) => console.log(err));
};

//UPLOAD FILE
export const uploadFile = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  console.log(formData);
  return axios
    .post("/user/file", formData)
    .then((res) => {
      dispatch({ type: CLEAR_LOADING });
      return res.data;
    })
    .catch((err) => console.log(err));
};

//GET INBOX
export const getInbox = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/getinbox")
    .then((res) => {
      dispatch({ type: GET_INBOX, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//DELETE MESSAGE
export const deleteMessage = (messageId, inboxMethod) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  dispatch({
    type: DELETE_ITEM_INBOX,
    payload: messageId,
    inboxMethod: inboxMethod,
  });
  axios
    .delete(`/deletemessage/${messageId}/${inboxMethod}`)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//SEND MESSAGE
export const sendMessage = (message) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  dispatch({ type: CLEAR_CONTACT });
  axios
    .post(`/sendmessage`, message)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const Contact = (userId, handle, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  dispatch({ type: CLEAR_CONTACT });
  dispatch({ type: CONTACT, userId: userId, handle: handle });
  history.push("/inbox");
};

export const clearContact = () => (dispatch) => {
  dispatch({ type: CLEAR_CONTACT });
};

export const contactForm = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_MESSAGE });
  dispatch({ type: CLEAR_ERRORS });
  console.log(formData);
  const templateParams = {
    from_name: `${formData.firstName} ${formData.lastName}`,

    reply_to: formData.email,
    state: formData.state,
    currentEmployer: formData.currentEmployer ? formData.currentEmployer : "",
    message: formData.enquiry,
  };
  console.log(templateParams);

  emailjs
    .send(
      "service_gj94f58",
      "template_jlpaeya",
      templateParams,
      "user_ab3pyJc4cyGkWpr0MFdkO"
    )
    .then(
      (res) => {
        dispatch({ type: SET_MESSAGE, payload: `Message Successful` });
      },
      (err) => {
        dispatch({ type: SET_ERRORS, payload: `Message Failed` });
      }
    );
};
//CLEAR JOBS
export const clearJobs = () => (dispatch)=>{
  dispatch({ type: CLEAR_JOBS });
}
//CLEAR EMPLOYEES
export const clearEmployees = () => (dispatch)=>{
  dispatch({ type: CLEAR_EMPLOYEES });
}

//HELPER - SET AUTHORIZATION HEADER
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
