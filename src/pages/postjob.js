import React from "react";

function PostJob() {
  return (
    <div>
      <div className="postJobFormCont">
        <div className="column1"></div>
        <div className="column2">
          <form className="postJobForm">
            <h1>Create a Job Ad</h1>

            <div className="row1">
              <h2>Job Title</h2>
              <input
                placeholder="Job Title"
                className="titleJobAd"
                required
              ></input>
              <h2>Company</h2>
              <input placeholder="Company" className="companyJobAd" required></input>
            </div>
            <div className="row2">
            <h2>Location</h2>
              <input
                placeholder="Location"
                className="locationJobAd"
                required
              ></input>
               <h2>Salary/ Salary Frequency</h2>
              <input placeholder="Salary" className="salaryJobAd" required></input>
              <input
                placeholder="Salary Frequency"
                className="salaryFreqJobAd"
                required
              ></input>
            </div>

            <div className="row3">
            <h2>About the Business</h2>
              <textarea
                className=""
                placeholder="About the business"
                className="aboutBusiness"
                required
              ></textarea>
            </div>

            <div className="row4">
            <h2>The role </h2>
              <textarea
                className=""
                placeholder="What is the role?"
                className="role"
                required
              ></textarea>
            </div>

            <div className="row5">
            <h2>Skills and Experience Required</h2>
              <textarea
                className=""
                placeholder="Skills and Experience Required"
                className="skillsExp"
                required
              ></textarea>
            </div>

            <div className="row6">
            <h2>Apply Now Information</h2>
              <textarea
                className=""
                placeholder="Apply Now"
                className="applyNow"
                required
              ></textarea>
            </div>

            <div className="row7">
            <h2>Contact Details</h2>
              <textarea
                className=""
                placeholder="Contact Details"
                className="contactDetails"
                required
              ></textarea>
            </div>
            <button type="submit" class="submitPostJobForm">Submit</button>
            <button type="button" class="previewPostJobForm">Preview</button>
            <button type="button"class="saveDraftPostJobForm">Save Draft</button>
          </form>
        </div>
        <div className="column3"></div>
      </div>
    </div>
  );
}

export default PostJob;
