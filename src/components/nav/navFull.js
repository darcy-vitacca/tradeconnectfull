import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
import PropTypes from "prop-types";
import "../../App.css";


//TODO: CHANGE FROM HASH ON LINK
// TODO: check if signed into display which links
class NavFull extends Component {
  constructor() {
    super();
    this.state = {
      menu: "show-desktop hide-mobile nav-links",
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleClick = (e) => {
    if (e.target.id === "menu") {
      this.setState({
        menu: "show-desktop nav-links",
      });
    } else if (e.target.id === "exit_menu" || e.target.className === "nav-links") {
      this.setState({
        menu: "show-desktop hide-mobile nav-links",
      });
    }
  };

  logoutUserBtn = (e) => {
    e.preventDefault();
    if (e.target.id === "logout") {
      this.props.logoutUser(this.props.history);
    }
  };

  searchStateInput() {
   
    let { authenticated } = this.props.user;
    if (authenticated === false) {
      return (
        <div className="signedIn_OutLinks">
          <Link to="/login">
            <li className="nav-links" onClick={this.handleClick}>Login</li>
          </Link>
          <Link to="/signup">
            <li className="nav-links" onClick={this.handleClick}>Sign up</li>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="signedIn_OutLinks">
          <Link to="/myprofile">
            <li className="nav-links" onClick={this.handleClick}>My Profile</li>
          </Link>
          <Link to="/postjob">
            <li className="nav-links" onClick={this.handleClick}>Post Job</li>
          </Link>
          <Link to="/login">
            <li className="nav-links" id="logout" onClick={this.logoutUserBtn}>
              Logout
            </li>
          </Link>
          {/* <Link>
          <div className=" Avatar">
            <li className="nav-links">DV</li>
          </div>
        </Link> */}
        </div>
      );
    }
  }

  render() {
    let { menu } = this.state;
    return (
      <nav>
        <div className="navLeft">
          {/* TODO:  DELETED EXACT DO I STILL NEED IT?*/}
          <Link to="/">
            <img
              className="logoNav"
              src={require("../../images/logo.svg")}
              alt="logo"
            ></img>
          </Link>
        </div>

        <div className="navRight ">
          <p className="hide-desktop" onClick={this.handleClick}>
            <span className="menu" id="menu">
              &#9776;
            </span>
          </p>

          <ul className={menu} id="nav">
            <li
              className="exit-btn hide-desktop"
              alt="exit menu"
              id="exit_menu"
              onClick={this.handleClick}
            >
              &#10005;
            </li>
            <Link to="/jobsearch">
              <li className="nav-links" onClick={this.handleClick}>Jobs</li>
            </Link>
            <Link to="/peoplesearch">
              <li className="nav-links" onClick={this.handleClick}>People</li>
            </Link>
            {/* <Link to="/apprenticeships">
              <li className="nav-links">Apprenticeships</li>
            </Link> */}
            {this.searchStateInput()}

            <Link to="/contact">
              <li className="nav-links" onClick={this.handleClick}>Contact</li>
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
}
NavFull.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});
const mapActionsToProps = {
  logoutUser,
};
export default connect(mapStateToProps, mapActionsToProps)(NavFull);
