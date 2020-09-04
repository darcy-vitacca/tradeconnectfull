//Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Redux
import {
  contactForm,
  pageChangeErrorClear,
} from "../redux/actions/userActions";
//Packages
import { uuid } from "uuidv4";
//Dropdowns
const { StatesList } = require("../util/dropdowns");

class Contact extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      state: "",
      currentEmployer: "",
      enquiry: "",
      errors: null,
      message: null,
    };
  }
  componentWillUnmount() {
    if (this.props.UI.errors !== null) {
      this.props.pageChangeErrorClear();
    }
    if (this.props.UI.message !== null) {
      this.props.pageChangeErrorClear();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors !== null) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (nextProps.UI.message !== null) {
      this.setState({ message: nextProps.UI.message });
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, console.log(this.state));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      state: this.state.state,
      currentEmployer: this.state.currentEmployer,
      enquiry: this.state.enquiry,
    };
    this.props.contactForm(this.state);
  };

  render() {
    let {
      firstName,
      lastName,
      email,
      state,
      currentEmployer,
      enquiry,
      errors,
      message,
    } = this.state;

    return (
      <div className="contactFormCont">
        <form
          className="contactForm"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h1>Contact Us</h1>
          <h3>First Name</h3>
          <input
            type="text"
            value={firstName}
            name="firstName"
            className=""
            placeholder="First Name"
            required
          ></input>
          <h3>Last Name</h3>
          <input
            type="text"
            value={lastName}
            name="lastName"
            className=""
            placeholder="Last Name"
            required
          ></input>
          <h3>Email</h3>
          <input
            type="email"
            className=""
            name="email"
            required
            placeholder="Email"
            value={email}
          ></input>
          <h3>State</h3>
          <select name="state" value={state} required>
            <option value="" disabled selected hidden>
              State
            </option>
            {StatesList.map((state) => {
              return (
                <option key={uuid()} value={state}>
                  {" "}
                  {state}
                </option>
              );
            })}
          </select>
          <h3>Current Employer</h3>
          <input
            type="text"
            name="currentEmployer"
            value={currentEmployer}
            className=""
            placeholder="Current Employer"
            required
          ></input>
          <p>* if applicable</p>
          <h3>Enquiry</h3>
          <textarea
            className="enquiry"
            name="enquiry"
            value={enquiry}
            placeholder="Enquiry:"
          ></textarea>

          <button type="submit" className="homeToggleButton">
            Submit Enquiry
          </button>
          <div className="errorCont">
            {errors !== null ? (
              <div className="errorsMessage">{errors}</div>
            ) : null}
            {message !== null ? (
              <div className="errorsMessage">{message}</div>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
}

Contact.propTypes = {
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
  contactForm,
  pageChangeErrorClear,
};

export default connect(mapStateToProps, mapActionsToProps)(Contact);
