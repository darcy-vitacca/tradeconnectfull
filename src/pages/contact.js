//Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Packages
import { uuid } from "uuidv4";
//Dropdowns
const { StatesList } = require("../util/dropdowns");

class Contact extends Component {
  render() {
    return (
      <div className="contactFormCont">
        <form className="contactForm">
          <h1>Contact Us</h1>
          <h3>First Name</h3>
          <input
            type="text"
            className=""
            placeholder="First Name"
            required
          ></input>
          <h3>Last Name</h3>
          <input
            type="text"
            className=""
            placeholder="Last Name"
            required
          ></input>
          <h3>Email</h3>
          <input type="text" className="" required placeholder="Email"></input>
          <h3>State</h3>
          <select name="state" required>
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
            className=""
            placeholder="Current Employer"
          ></input>
          <p>* if applicable</p>
          <h3>Enquiry</h3>
          <textarea
            className="enquiry"
            placeholder="Enquiry:"
            required
          ></textarea>

          <button type="submit" className="homeToggleButton">
            Submit Enquiry
          </button>
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

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Contact);
