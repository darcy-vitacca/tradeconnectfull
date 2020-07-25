import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";


function NavSignedIn() {
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
      <Link to="/myprofile">
        <li className="nav-links">My Profile</li>
      </Link>
      <Link to='/postjob'>
        <li className="nav-links">Post a Job ad/Tender</li>
      </Link>
      <Link>
      {/* TODO: ADD LOGOUT FUNC.*/}
        <li className="nav-links">Logout</li>
      </Link>
      <Link>
      <div className=" Avatar">
          <li className="nav-links">DV</li>
      </div>
      </Link>
      
    </ul>
  </nav>
  );
}

export default NavSignedIn;
