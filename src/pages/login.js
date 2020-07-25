import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

class Login extends Component {
  //controlled component uses the state to handle forms it's good to use this because we can use the react dev tools. We set the state using the constructor below and loading is used to show a spinne. In cloud functiosn the first excecution is acutally slow so a spinner is good for responsiveness. we use onChange to set the value of it's input to the target value on it's state. If it's the email input .name will be email or if it's a password it will be password and the value will be the value of what is being typed in through the value attribute.

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    console.log(event);
    //what we want to do here is send a request to the server then show any errors and redirect to the home page or myabe a profile page. We also don't want to show information about the user in the request in the url and we don't want to reload the page. Event prevent defaults help that.If we are successful we want to  submti the form and pass the user through to the hoem page with new links

    //Once the form is submitted loading becomes true which will make the spinner active
    event.preventDefault();
    this.setState({
      loading: true,
    });

    //this is the object we want to get because the values have been bound to the state using the handleChange which is set everytime they type a key and then on submit it's stored in their state
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    //the postman request that you have made retruns errors specific to the issue so we want to recieve those and display them if they are incorrect  or success if correct you get a token and an okay response which will redirect us to our home page. After routing to the login route with the user data it returns a promise which give a promise with a result
    axios
      .post("/login", userData)
      .then((res) => {
        //the promise returned will through an error if not successful and if we are will be redirected to the home page using history.push loading is changed back becuase we have the result
        console.log(res.data);
        //this is for when you get the token you store it in local storage in the browser to be accessed
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false,
        });
        //this is a method we use to push a path to go to it.TODO: this should go to create a profile or profile if they have a profile
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
        // console.log(this.state)
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    //we get the errors and loading from the state
    const { errors, loading } = this.state;
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
              <button type="submit" class="submitLogin" disabled={loading}>
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Login;
