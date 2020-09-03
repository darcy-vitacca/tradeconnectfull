//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../css/inbox_settings_help.css";
//Redux
import {
  deleteAccount,
  changePassword,
  changeEmail,
  resetUI,
} from "../redux/actions/userActions";
//Packages
import ReactTooltip from "react-tooltip";
import { ScaleLoader } from "react-spinners";
import { uuid } from "uuidv4";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      password: "",
      newEmail: "",
      changingEmail: false,
      changingPassword: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors !== null) {
      this.setState(
        {
          errors: nextProps.UI.errors,
          message: null,
          changingEmail: false,
          changingPassword: false,
        },
        () => {
          console.log(this.state);
        }
      );
    } else if (nextProps.UI.message !== null) {
      this.setState(
        {
          message: nextProps.UI.message,
          errors: null,
          changingEmail: false,
          changingPassword: false,
        },
        () => {
          console.log(this.state);
        }
      );
    }
  }

  componentDidMount() {}

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log(event.target.id);
    if (event.target.id === "updatePassword") {
      const newUserData = {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
        confirmPassword: this.state.confirmPassword,
        email: this.props.user.credentials.email,
      };
      console.log(newUserData);
      this.props.changePassword(newUserData, this.props.history);
    } else if (event.target.id === "updateEmail") {
      const newUserData = {
        newEmail: this.state.newEmail,
        password: this.state.password,
        oldEmail: this.props.user.credentials.email,
        handle: this.props.user.credentials.handle
      };
      console.log(newUserData);
      this.props.changeEmail(newUserData, this.props.history);
    }
  };

  render() {
    const {
      UI: { loading, errors, message },
      user: {
        authenticated,
        credentials: { userId, handle },
      },
    } = this.props;
    const { changingEmail, changingPassword } = this.state;
    return (
      <div>
        {!loading ? (
          !authenticated ? (
            this.props.history.push("/login")
          ) : (
            <div className="profileBody">
              <div className="accountContainer">
                <h1 className="accountHeader">Settings</h1>
                <div className="accountCont">
                  <div className="accountCard">
                    <h4>Edit Account Details</h4>
                    <img
                      className="editDeleteIcon"
                      src={require("../images/editdash.png")}
                      alt="Change Account Details"
                      data-tip="Change Account Details"
                      data-place="bottom"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want edit your email?`
                          )
                        )
                          this.setState({
                            changingEmail: !this.state.changingEmail,
                            changingPassword: false,
                          });
                      }}
                    ></img>
                    <ReactTooltip />
                  </div>

                  <p>
                    Edit your account details that you use to login with and
                    recieve correspondance to
                  </p>

                  <div className="accountCard">
                    <h4>Change Password</h4>
                    <img
                      className="editDeleteIcon"
                      src={require("../images/editdash.png")}
                      alt="Change Password"
                      data-tip="Change Password"
                      data-place="bottom"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want change your password?`
                          )
                        )
                          this.setState({
                            changingPassword: !this.state.changingPassword,
                            changingEmail: false,
                          });
                      }}
                    ></img>
                    <ReactTooltip />
                  </div>

                  <p>Change your password that you login with</p>

                  <div className="accountCard">
                    <h4>Delete Account</h4>
                    <img
                      className="editDeleteIcon"
                      src={require("../images/deletedash.png")}
                      alt="Delete Account"
                      data-tip="Delete Account"
                      data-place="bottom"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete your account?`
                          )
                        )
                          this.props.deleteAccount(
                            handle,
                            userId,
                            this.props.history
                          );
                      }}
                    ></img>
                    <ReactTooltip />
                  </div>

                  <p>Delete your account of tradeconnect</p>

                  <span className="helper-text">
                    {errors !== null ? errors.error : message}
                  </span>
                  {/* Email */}

                  <div className="settingsUpdate">
                    {changingEmail ? (
                      <form
                        id="updateEmail"
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                      >
                        <div className="updateEmails">
                          <h4>New Email</h4>
                          <input
                            type="email"
                            placeholder="New email"
                            name="newEmail"
                            value={this.state.newEmail}
                          ></input>
                          
                           <h4>Enter password</h4>
                           <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Enter password to confirm email update"
                          ></input>
                        </div>
                        <button type="submit" className="settingsBtn">Submit</button>
                      </form>
                    ) : null}

                    {/* Password */}
                    {changingPassword ? (
                      <form
                        id="updatePassword"
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                      >
                        <div className="updatePassword">
                          <h4>Old Password</h4>
                          <input
                            type="password"
                            name="oldPassword"
                            value={this.state.oldPassword}
                            placeholder="Old password"
                          ></input>
                          <h4>New Password</h4>
                          <input
                            type="password"
                            name="newPassword"
                            value={this.state.newPassword}
                            placeholder="New password"
                          ></input>
                          <h4>Confirm Password</h4>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            placeholder="Confirm new password"
                          ></input>
                        </div>
                        <button type="submit" className="settingsBtn">Submit</button>
                      </form>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="spinner">
            {loading === true ? (
              <div>
                {" "}
                <ScaleLoader className="spinner" size={240} loading />{" "}
              </div>
            ) : null}{" "}
          </div>
        )}
      </div>
    );
  }
}
Settings.propTypes = {
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
  deleteAccount,
  changePassword,
  changeEmail,
  resetUI,
};

export default connect(mapStateToProps, mapActionsToProps)(Settings);
