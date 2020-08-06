import React from "react";

function PostJob() {
  return (
    <div>
      <div className="postJobFormCont">
        <h1>Create a Job Ad</h1>
        <form className="postJobForm">


          <div className="upperPostJobForm">
          <div>
            <h3>Job Title</h3>
            <input
              placeholder="Job Title"
              className="titleJobAd"
              required
            ></input>
          </div>
          <div>
            <h3>Company</h3>
            <input
              placeholder="Company"
              className="companyJobAd"
              required
            ></input>
          </div>
          <div>
            <h3>Location</h3>
            <input
              placeholder="Location"
              className="locationJobAd"
              required
            ></input>
          </div>
          <div>
            <h3>Salary</h3>
            <input
              placeholder="Salary"
              className="salaryJobAd"
              required
            ></input>
            <h3>Salary Frequency</h3>
            <input
              placeholder="Salary Frequency"
              className="salaryFreqJobAd"
              required
            ></input>
          </div>

          </div>
          

          <h3>About the Business</h3>
          <textarea
            className=""
            placeholder="About the business"
            className="aboutBusiness"
            required
          ></textarea>

          <h3>The Role </h3>
          <textarea
            className=""
            placeholder="What is the role?"
            className="role"
            required
          ></textarea>

          <h3>Skills and Experience Required</h3>
          <textarea
            className=""
            placeholder="Skills and Experience Required"
            className="skillsExp"
            required
          ></textarea>

          <h3>Apply Now Information</h3>
          <textarea
            className=""
            placeholder="Apply Now"
            className="applyNow"
            required
          ></textarea>

          <h3>Contact Details</h3>
          <textarea
            className=""
            placeholder="Contact Details"
            className="contactDetails"
            required
          ></textarea>
         < div className="jobSubmitButtonDiv">
         <button type="submit" class="jobSubmitButton">
            Submit
          </button>
         </div>
         
          {/* <button type="button" class="jobSubmitButton">
            Preview
          </button>
          <button type="button" class="jobSubmitButton">
            Save Draft
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default PostJob;
