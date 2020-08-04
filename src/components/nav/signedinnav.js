import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

function NavSignedIn() {
  return (
    <nav>
      <div className="navRight"> 
      <Link to="/" exact>
        <img
          className="logoNav"
          src={require("../../images/logo.svg")}
          alt="logo"
        ></img>
          </Link>
          </div>

          <div className="navRight"> 
        <a href="#" className="hide-mobile">
          <span className="menu" id="menu">
            &#9776;
          </span>
        </a>
    

      <ul className="show-desktop hide-mobile">
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
        <Link to="/postjob">
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
      <div></div></div>
    </nav>
  );
}

export default NavSignedIn;
