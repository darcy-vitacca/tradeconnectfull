//Core
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./App.css";
//Redux
import { Provider } from "react-redux";
import store from "./redux/reducers/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./redux/reducers/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
//Pages
import Nav from "./components/nav/nav";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import JobSearch from "./pages/jobsearch";
import EmployeeSearch from "./pages/employeesearch";
import MyProfile from "./pages/myprofile";
import Contact from "./pages/contact";
import PostJob from "./pages/postjob";
import JobDashboard from "./pages/jobdashboard";
import Inbox from "./pages/inbox"
import Settings from "./pages/settings"
import Help from "./pages/help"
//Auth
import AuthRoute from "./util/auth_route";
import axios from "axios";


const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  //TODO: maybe delete? safe?
  if (decodedToken * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
//TODO: licences change to tag things in profile 
//TODO: refactor code that is duplicates into helper functions
//TODO: for with formik youtube tutotial docs are bad
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
              <Route path="/jobdashboard" component={JobDashboard} />
              <Route path="/peoplesearch" component={EmployeeSearch} />
              <Route path="/myprofile" component={MyProfile} />
              <Route path="/contact" component={Contact} />
              <Route path="/inbox" component={Inbox} />
              <Route path="/settings" component={Settings} />
              <Route path="/help" component={Help} />
              <Route path="/postjob" component={PostJob} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
