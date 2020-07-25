import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";


function NavSignedOut() {
  return (
    <nav>
      <Link to="/" exact>
        <h3>Tradeconnect</h3>
      </Link>
      <ul>
        <Link to="/jobsearch">
          <li className="nav-links">Jobs</li>
        </Link>
        <Link to="/peoplesearch">
          <li className="nav-links">People</li>
        </Link>
        <Link to="/apprenticeships">
          <li className="nav-links">Apprenticeships</li>
        </Link>
        <Link to="/contact">
        <li className="nav-links">Contact</li>
        </Link>
        <Link to="/postjob">
        <li className="nav-links">Post a Job ad/Tender</li>
      </Link>
        <Link to="/login">
          <li className="nav-links">Login</li>
        </Link>
        <Link to="/signup">
          <li className="nav-links">Sign up</li>
        </Link>
        
      </ul>
    </nav>
  );
}

export default NavSignedOut;
