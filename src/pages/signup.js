import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

class Signup extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword :"",
      handle:"",
      loading: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    console.log(event);
  
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword : this.state.confirmPassword,
      handle : this.state.handle
    };
    axios
      .post("/signup", newUserData)
      .then((res) => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        console.log(res.data);
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
        
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
      <div className="signupCont">
        <div className="row1"></div>
        <div className="row2">
          
          <img
            src={require("../images/login.png")}
            className="loginIcon"
            alt="Signup Icon"
          ></img>
          <h1>Signup</h1>
          <form onSubmit={this.handleSubmit}>
    
            <div className="signupSection">
              <input
                placeholder="Email"
                className="emailSignup"
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
                className="passwordSignup"
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              ></input>
              <span className="helper-text">{errors.password}</span>
            </div>
            {/* confrim password */}
            <div className="passwordSection">
              <input
                placeholder="Confirm Password"
                className="passwordSignup"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              ></input>
              <span className="helper-text">{errors.confirmPassword}</span>
            </div>
           {/* Handle */}
            <div className="passwordSection">
              <input
                placeholder="Username"
                className="handle"
                id="handle"
                name="handle"
                type="text"
                value={this.state.handle}
                onChange={this.handleChange}
              ></input>
              <span className="helper-text">{errors.handle}</span>
            </div>

            <div className="submitSpinner">
              <button type="submit" class="submitSignup" disabled={loading}>
                Signup
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

              <div className="signupErrorsGeneral">
                <span className="helper-text">{errors.general}</span>
              </div>
           
          </form>
          <span>
            Already have an account? Login <Link to="/login">here</Link>
          </span>

         
        </div>
        <div className="row2"></div>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Signup;
