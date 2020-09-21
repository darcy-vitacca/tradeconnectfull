//Core
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../App.css";
//Redux
import { logoutUser } from "../../redux/actions/userActions";

//TODO: CHANGE FROM HASH ON LINK
//TODO: HANDLE CLICK ON MENU MKAE IT DISAPPEAR AND NOT SHOW ON SIGN IN
class NavFull extends Component {
  constructor() {
    super();
    this.state = {
      menu: "show-desktop hide-mobile nav-links",
      avatar: "show-menu",
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleClick = (e) => {
    if (e.target.id === "menu" || e.target.className === "show-menu") {
      if (e.target.id === "avatarItems") {
        this.setState({
          menu: "show-desktop hide-mobile nav-links",
        });
      } else {
        this.setState({
          menu: "show-desktop nav-links",
        });
      }
    } else if (
      e.target.id === "exit_menu" ||
      (e.target.className === "nav-links" && e.target.id !== "avatar")
    ) {
      if (e.target.id === "logout") {
        this.logoutUserBtn(e);
      }
      this.setState({
        menu: "show-desktop hide-mobile nav-links",
        avatar: "show-menu",
      });
    } else if (e.target.id === "avatar" || e.target.id === "avatarItems") {
      if (this.state.avatar === "show-menu" && e.target.id === "avatarItems") {
        this.setState({
          avatar: "hide-menu",
        });
      } else if (this.state.avatar === "show-menu") {
        this.setState({
          avatar: "hide-menu",
        });
      } else if (this.state.avatar === "hide-menu") {
        this.setState({
          avatar: "show-menu",
        });
      }
    } else if (e.target.id === "home"){
      this.setState({
        menu: "show-desktop hide-mobile nav-links",
        avatar: "show-menu",
      }, console.log(this.state));

    }
  };

  logoutUserBtn = (e) => {
    e.preventDefault();
    if (e.target.id === "logout") {
      this.props.logoutUser(this.props.history);
    }
  };

  searchStateInput() {
    let { menu } = this.state;
    let { authenticated } = this.props.user;
    if (authenticated === false) {
      return (
        <div className={menu}>
          <Link to="/login">
            <li className="nav-links" onClick={this.handleClick}>
              Login
            </li>
          </Link>
          <Link to="/signup">
            <li className="nav-links" onClick={this.handleClick}>
              Sign up
            </li>
          </Link>
        </div>
      );
    } else {
      return (
        <div className={menu}>
          <Link className="nav-links" to="/myprofile">
            <li className="nav-links" onClick={this.handleClick}>
              My Profile
            </li>
          </Link>
          <Link className="nav-links" to="/postjob">
            <li className="nav-links" onClick={this.handleClick}>
              Post Job
            </li>
          </Link>
          <Link className="nav-links" to="/jobdashboard">
            <li className="nav-links" onClick={this.handleClick}>
              Job Dashboard
            </li>
          </Link>
          <Link className="nav-links" to="/login">
            <li className="nav-links" id="logout" onClick={this.handleClick}>
              Logout
            </li>
          </Link>
          <div>
            <div className="Avatar" id="avatar">
             
              <img
              id="avatar"
              className="Avatar"
                src={require("../../images/no-img.png")}
                alt="profile"
                onClick={this.handleClick}
              ></img>
            </div>
            <div className={`arrow-up ${this.state.avatar}`}></div>
            <div className={`${this.state.avatar} menu`}>
              <Link className="nav-links" to="/inbox">
                <li
                  className={`${this.state.avatar}`}
                  onClick={this.handleClick}
                  id="avatarItems"
                >
                  Inbox
                </li>
              </Link>
              <Link className="nav-links" to="/settings">
                <li
                  className={this.state.avatar}
                  onClick={this.handleClick}
                  id="avatarItems"
                >
                  Settings
                </li>
              </Link>
              <Link className="nav-links" to="/help">
                <li
                  className={this.state.avatar}
                  onClick={this.handleClick}
                  id="avatarItems"
                >
                  Help
                </li>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    let { menu } = this.state;
    return (
      <nav>
        <div className="navLeft">
          <Link to="/">
            <img
              className="logoNav"
              id="home"
              src={require("../../images/logo.svg")}
              alt="logo"
              onClick={this.handleClick}
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
              <li className="nav-links" onClick={this.handleClick}>
                Jobs
              </li>
            </Link>
            <Link to="/peoplesearch">
              <li className="nav-links" onClick={this.handleClick}>
                People
              </li>
            </Link>

            <Link to="/contact">
              <li className="nav-links" onClick={this.handleClick}>
                Contact
              </li>
            </Link>
            {this.searchStateInput()}
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
