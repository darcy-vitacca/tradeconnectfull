import React from "react";
import "./App.css";
import Nav from "./components/nav/nav";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

import Jobsearch from "./pages/jobsearch";
import Peoplesearch from "./pages/peoplesearch";
import MyProfile from "./pages/myprofile";
import Contact from "./pages/contact";
import PostJob from "./pages/postjob";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Apprenticeships from "./pages/apprenticeships";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="AppBody">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/jobsearch" component={Jobsearch} />
            <Route path="/peoplesearch" component={Peoplesearch} />
            <Route path="/apprenticeships" component={Apprenticeships} />
            <Route path="/myprofile" component={MyProfile} />
            <Route path="/contact" component={Contact} />
            <Route path="/postjob" component={PostJob} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
