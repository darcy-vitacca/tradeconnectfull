import React, { Component } from "react";
import { connect } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import { createJob } from "../redux/actions/userActions";
import PropTypes from "prop-types";

class PostJob extends Component {
  constructor() {
    super();
    this.state = {
      job: "",
      company: "",
      location: "",
      salary: "",
      salaryFreq: "",
      aboutBusiness: "",
      role: "",
      skillsExp: "",
      applyNow: "",
      contactDetails: "",
      imageUrl: "",
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this);
    console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();

  
    let locationArr =[];
    let stateLocation = []

    

    //address split
    locationArr = this.state.location.split(",");

    locationArr = locationArr[0]
      .trim()
      .split(" ")
      .reduce((acc, cv) => {
        return acc + " " + cv[0].toUpperCase() + cv.slice(1);
      }, "")
      .trim();
    locationArr = locationArr.split(" ");

    //Get state function
    locationArr.forEach((entry) => {
      console.log(entry);
      if (
        ["ACT", "NSW", "NT", "QLD", "TAS", "SA", "VIC", "WA"].includes(entry)
      ) {
        stateLocation = entry;
        console.log(stateLocation);
      }
    });

    const newJob = {
      job: this.state.job,
      company: this.state.company,
      location: locationArr,
      state: stateLocation,
      salary: this.state.salary,
      salaryFreq: this.state.salaryFreq,
      aboutBusiness: this.state.aboutBusiness,
      role: this.state.role,
      skillsExp: this.state.skillsExp,
      applyNow: this.state.applyNow,
      contactDetails: this.state.contactDetails,
      imageUrl: this.state.imageUrl,
    };
    console.log(newJob);
    this.props.createJob(newJob, this.props.history);
  };

    //HANDLES AUTO-FILL CHROME BUG
    onFocus = (event) => {
      if (event.target.autocomplete) {
        event.target.autocomplete = "";
      }
    };
  

  render() {
    return (
      <div className="postJobBody">
        <div className="postJobCard">
          <h1 className="postJobHeader">Post a Job Ad</h1>
          <div className="postJobFormCont">
            <form
              className="postJobForm"
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
              autocomplete="off"
            >
               <input
              className="hiddenInput"
              autocomplete="false"
              name="hidden"
              type="text"
            ></input>
              <div className="upperPostJobForm">
                <div>
                  <h3>Job Title *</h3>
                  <input
                    name="job"
                    placeholder="Job Title"
                    className="titleJobAd"
                    required
                  ></input>
                </div>
                <div>
                  <h3>Company *</h3>
                  <input
                    name="company"
                    placeholder="Company"
                    className="companyJobAd"
                    required
                  ></input>
                </div>
                <div>
                  <h3>Location *</h3>
                  <Autocomplete
                  name="location"
                  onPlaceSelected={(place) => {
                    console.log(place);
                    this.setState({ location: place.formatted_address });
                    console.log(this.state);
                  }}
                  types={["(regions)"]}
                  componentRestrictions={{ country: "au" }}
                  onFocus={this.onFocus}
                />
                </div>
                <div>
                  <h3>Salary *</h3>
                  <input
                    name="salary"
                    placeholder="Salary"
                    className="salaryJobAd"
                    required
                  ></input>
                  <h3>Salary Frequency *</h3>
                  <input
                    name="salaryFreq"
                    placeholder="Salary Frequency"
                    className="salaryFreqJobAd"
                    required
                  ></input>
                </div>
              </div>

              <h3>About the Business *</h3>
              <textarea
                name="aboutBusiness"
                placeholder="About the business"
                className="aboutBusiness"
                required
              ></textarea>

              <h3>The Role *</h3>
              <textarea
                name="role"
                placeholder="What is the role?"
                className="role"
                required
              ></textarea>

              <h3>Skills and Experience Required *</h3>
              <textarea
                name="skillsExp"
                placeholder="Skills and Experience Required"
                className="skillsExp"
                required
              ></textarea>

              <h3>Apply Now Information *</h3>
              <textarea
                name="applyNow"
                placeholder="Apply Now"
                className="applyNow"
                required
              ></textarea>

              <h3>Contact Details *</h3>
              <textarea
                name="contactDetails"
                placeholder="Contact Details"
                className="contactDetails"
                required
              ></textarea>
              <div className="jobSubmitButtonDiv">
                <button type="submit" class="jobSubmitButton">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
PostJob.propTypes = {
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
  createJob,
};

export default connect(mapStateToProps, mapActionsToProps)(PostJob);
