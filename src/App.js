import React from "react";
import "./App.css";
import Nav from "./layout/nav";
import Home from "./home";
import Jobsearch from "./jobsearch";
import Peoplesearch from "./peoplesearch";
import MyProfile from "./myprofile";
import Contact from "./contact";
import PostJob from "./postjob"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Apprenticeships from "./apprenticeships";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="AppBody">
          <Route path="/" exact component={Home} />
          <Route path="/jobsearch" component={Jobsearch} />
          <Route path="/peoplesearch" component={Peoplesearch} />
          <Route path="/apprenticeships" component={Apprenticeships} />
          <Route path="/myprofile" component={MyProfile} />
          <Route path="/contact" component={Contact}/>
          <Route path="/postjob" component={PostJob}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
