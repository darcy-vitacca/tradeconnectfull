import React from "react";

function Contact() {
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
          <option>ACT</option>
          <option>New South Wales</option>
          <option>Northern Territory</option>
          <option>Queensland</option>
          <option>Tasmania</option>
          <option>Victoria</option>
          <option>Western Australia</option>
        </select>

        <h3>Current Employer</h3>
        <input type="text" className="" placeholder="Current Employer"></input>
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

export default Contact;
