import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
//rredux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

class Login extends Component {
  //controlled component uses the state to handle forms it's good to use this because we can use the react dev tools. We set the state using the constructor below and loading is used to show a spinne. In cloud functiosn the first excecution is acutally slow so a spinner is good for responsiveness. we use onChange to set the value of it's input to the target value on it's state. If it's the email input .name will be email or if it's a password it will be password and the value will be the value of what is being typed in through the value attribute.

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
    //what we want to do here is send a request to the server then show any errors and redirect to the home page or myabe a profile page. We also don't want to show information about the user in the request in the url and we don't want to reload the page. Event prevent defaults help that.If we are successful we want to  submti the form and pass the user through to the hoem page with new links //Once the form is submitted loading becomes true which will make the spinner active
    event.preventDefault();
    //this is the object we want to get because the values have been bound to the state using the handleChange which is set everytime they type a key and then on submit it's stored in their state
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    //the postman request that you have made retruns errors specific to the issue so we want to recieve those and display them if they are incorrect  or success if correct you get a token and an okay response which will redirect us to our home page. After routing to the login route with the user data it returns a promise which give a promise with a result
    //We use this to pass the userData and then history to redirect on success
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    //the loading needs to be got from the props now because it's stored in the UI state
    const {
      classes,
      UI: { loading }
    } = this.props;
    //we get the errors and loading from the state
    const { errors } = this.state;
    return (
      <div className="loginCont">
        <div className="row1"></div>
        <div className="row2">
          <img
            src={require("../images/login.png")}
            className="loginIcon"
            alt="Login Icon"
          ></img>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {/* login */}
            <div className="loginSection">
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
        <div className="row2"></div>
      </div>
    );
  }
}

//
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

//It's a function that takes our global state and we take what we need from the reducers in this state we only need user and ui. This allows user and UI to get mapped from a global props and brought to be mapped into our component props. That why we can use this.props.loginUser above

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
//This is where we say what actions we are going to use eg loginUser. All these need to be added to our proptypes because we are using them
const mapActionsToProps = {
  loginUser
};

//connect is a higher order component which takes 3 args mapStateToProps and mapActionToProps.
export default connect(mapStateToProps, mapActionsToProps)(Login);
