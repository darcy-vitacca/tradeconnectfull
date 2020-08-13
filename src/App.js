import React from "react";
import "./App.css";
import Nav from "./components/nav/nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
//Redux
import { Provider } from "react-redux";
import store from "./redux/reducers/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./redux/reducers/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import JobSearch from "./pages/jobsearch";
import EmployeeSearch from "./pages/peoplesearch";
import MyProfile from "./pages/myprofile";
import Contact from "./pages/contact";
import PostJob from "./pages/postjob";
import Apprenticeships from "./pages/apprenticeships";
//Auth
import AuthRoute from "./components/util/auth_route";
import axios from "axios";

//this checks for authentication and using authroute re-routes to the home page if you are already logged in this only starts on startup and redux is needed to run it. It's bad practice to have global variables like this so we need to call action from our userActions and set ourselves to be authenticated and edit accordingly. We Check if the token is expired and authenticate from here

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken * 1000 < Date.now()) {
    //if it's expired it will delete and logout the user
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    // this sets authenticated to true and when we call get user data we get the data after we set the headers
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
//TODO: the way to make money could be search functionallity for the ideal candidate and give % matches
//TODO: change all the paths names and file to appropriate things.
//The provider gives us access to anything in the store to use in the state so everything needs to be within it to have access to the store
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          {/* <Nav /> */}
          <Route  component={Nav} />
          <div className="AppBody">
            <Switch>
              <Route path="/" exact component={Home} />
              <AuthRoute path="/login" component={Login} />
              <AuthRoute path="/signup" component={Signup} />
              <Route path="/jobsearch" component={JobSearch} />
              <Route path="/peoplesearch" component={EmployeeSearch} />
              <Route path="/apprenticeships" component={Apprenticeships} />
              <Route path="/myprofile" component={MyProfile} />
              <Route path="/contact" component={Contact} />
              <Route path="/postjob" component={PostJob} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
