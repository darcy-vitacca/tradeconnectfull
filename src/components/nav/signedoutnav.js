import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

function NavSignedOut() {
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
        <a href="#"  className="menu">
          <span className="menu" id="menu">
            &#9776;
          </span>
        </a>
    



      <ul className="show-desktop hide-mobile nav-links" id="nav">
        <li className="exit-btn hide-mobile nav-links" alt="exit menu">
          &#10005;
        </li>
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
      </div>
    </nav>
  );
}

export default NavSignedOut;
