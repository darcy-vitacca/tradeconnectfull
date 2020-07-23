import React from "react";

function Contact() {
  return (
    <div className="contactFormCont">
      <form className="contactForm">
        <h1>Contact Us</h1>


        <div className="contactRow">
            <div className="firstName">
            <input type="text" className="" placeholder="First Name" required></input>
            </div>
            <div className="lastName">
            <input type="text" className="" placeholder="Last Name"required></input>
            </div>
        </div>
        
        <div className="contactRow1">
            <div className="email">
            <input type="text" className=""required placeholder="Email"></input>
            </div>
            <div className="state">
            <select name="state"required>
                <option value="" disabled selected hidden>State</option>
                <option>Victoria</option>
                <option>New South Wales</option>
                <option>Queensland</option>
                <option>Northern Territory</option>
                <option>Tasmania</option>
                <option>Western Australia</option>
                <option>ACT</option>
            </select>
            </div>
        </div>
        <div className="contactRow2">
        <div className="employerCur">
          <input type="text" className="" placeholder="Current Employer"></input>
          <label>* if applicable</label>
        </div>
        </div>
 
        <div className="contactRow3">  
        <div className="enquiry">
    
          <textarea className="" placeholder="Enquiry:" required></textarea>

        </div>
        </div>
        <button type="submit">Submit Enquiry</button>
      </form>
    </div>
  );
}

export default Contact;
