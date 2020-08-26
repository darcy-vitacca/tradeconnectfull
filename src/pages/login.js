//Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
//Packages
import { ScaleLoader } from "react-spinners";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(this.props);
    console.log(this.props.history);
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      UI: { loading },
    } = this.props;

    const { errors } = this.state;
    return (
      <div class="loginCont">
        <img
          className="logoLoginSignup"
          src={require("../images/tradeconnect.png")}
          alt="logo"
        ></img>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          {/* login */}
          <div className="loginSection">
            <p className="loginSignupLabel">Email</p>
            <input
              placeholder="Email"
              className="emailLogin"
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            ></input>
            <span className="helper-text">{errors.email}</span>
          </div>

          {/* password */}
          <div className="passwordSection">
            <p className="loginSignupLabel">Email</p>
            <input
              placeholder="Password"
              className="passwordLogin"
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            ></input>
            <span className="helper-text">{errors.password}</span>
          </div>

          <div className="submitSpinner">
            <button type="submit" className="submitLogin" disabled={loading}>
              Login
            </button>
            <div className="spinner">
              {loading === true ? (
                <div>
                  {" "}
                  <ScaleLoader className="spinner" size={240} loading />{" "}
                </div>
              ) : null}{" "}
            </div>
          </div>

          <div className="loginErrorsGeneral">
            <span className="helper-text">{errors.general}</span>
          </div>
        </form>

        <span>
          Don't have an account? Sign up <Link to="/signup">here</Link>
        </span>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});
const mapActionsToProps = {
  loginUser,
};
export default connect(mapStateToProps, mapActionsToProps)(Login);
