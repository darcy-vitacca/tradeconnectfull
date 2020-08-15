import React, { Component } from "react";
import { connect } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import { createJob } from "../redux/actions/userActions";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";

// TODO: make slect only for the location dropdown don't accept typing come ip with an error message
//TODO: Token expiring need to make the token better
 // TODO: //maybe make a click required only for the location to filter out bad data.
class PostJob extends Component {
  constructor() {
    super();
    this.state = {
      fullJob: [
        {
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
          tradeClassification: "",
          keywords: "",
          imageUrl: "",
        },
      ],
      classifcations: [
        "Air Conditioning & Refrigeration",
        "Arborist",
        "Automotive Trades",
        "Bakers & Pastry Chefs",
        "Boat Builder and Repairer",
        "Bricklayer",
        "Building Trades",
        "Butchers",
        "Cook",
        "Carpentry",
        "Cabinet Making",
        "Cleaning Services",
        "Electricians",
        "Fitters, Turners & Machinists",
        "Floristry",
        "Gardening & Landscaping",
        "Glazier",
        "Hair & Beauty Services",
        "Joiner",
        "Labourers",
        "Lift Mechanic",
        "Locksmiths",
        "Maintenance /Handyperson Services",
        "Metal Fabricator",
        "Nannies & Babysitters",
        "Painters & Sign Writers",
        "Plaster",
        "Plumbers",
        "Printing & Publishing Services",
        "Roof Tiler",
        "Roof Plumber",
        "Screen Printer",
        "Shearer",
        "Security Services",
        "Stonemason",
        "Tailors & Dressmakers",
        "Telecommuncations",
        "Technicians",
        "Wall and Floor Tiler",
        "Welders & Boilermakers",
        "Other",
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleChange = (e) => {
    let fullJob = [...this.state.fullJob];
    fullJob[e.target.dataset.id][e.target.name] = e.target.value;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let fullJobState = this.state.fullJob[0]
    let locationArr = [];
    let keywordsArr = [];
    let stateLocation = [];

    //address split
    locationArr = fullJobState.location.split(",");
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

    //keywords split
    keywordsArr = fullJobState.job.split(" ");

    const newJob = {
      job: fullJobState.job,
      company: fullJobState.company,
      location: locationArr,
      state: stateLocation,
      salary: fullJobState.salary,
      salaryFreq: fullJobState.salaryFreq,
      aboutBusiness: fullJobState.aboutBusiness,
      role: fullJobState.role,
      skillsExp: fullJobState.skillsExp,
      applyNow: fullJobState.applyNow,
      contactDetails: fullJobState.contactDetails,
      imageUrl: fullJobState.imageUrl,
      tradeClassification: fullJobState.tradeClassification,
      keywords: keywordsArr,
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
    let { classifcations } = this.state;
    return (
      <div className="postJobBody">
        <div className="postJobCard">
          <h1 className="postJobHeader">Post a Job Ad</h1>
          <div className="postJobFormCont">
            <form
              className="postJobForm"
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
              autoComplete="off"
            >
              <input
                className="hiddenInput"
                autoComplete="false"
                name="hidden"
                data-id="0"
                type="text"
              ></input>
              <div className="upperPostJobForm">
                <div>
                  <h3>Job Title *</h3>
                  <input
                    name="job"
                    placeholder="Job Title"
                    className="titleJobAd"
                    data-id="0"
                    required
                  ></input>
                </div>
                <div>
                  <h3>Company *</h3>
                  <input
                    name="company"
                    data-id="0"
                    placeholder="Company"
                    className="companyJobAd"
                    required
                  ></input>
                </div>
                <div>
                  <h3>Location *</h3>
                  <Autocomplete
                    name="location"
                    data-id="0"
                    onPlaceSelected={(place) => {
                      console.log(place);
                          this.setState(prevState => ({
                        fullJob: [{               
                            ...prevState.fullJob[0],    
                            location: place.formatted_address    
                        }]
                    }))
                    }}
                    types={["(regions)"]}
                    componentRestrictions={{ country: "au" }}
                    onFocus={this.onFocus}
                  />

                  <h3>Trade Classification</h3>
                  <select
                    name="tradeClassification"
                    className="postJobClassification"
                    data-id="0"
                    required
                  >
                    <option value="" disabled selected hidden>
                      Trade Classification
                    </option>
                    {classifcations.map((classifcation) => {
                      return (
                        <option key={uuid()} value={classifcation}>
                          {" "}
                          {classifcation}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <h3>Salary *</h3>
                  <input
                    data-id="0"
                    name="salary"
                    placeholder="Salary"
                    className="salaryJobAd"
                    required
                  ></input>
                  <h3>Salary Frequency *</h3>
                  <input
                    data-id="0"
                    name="salaryFreq"
                    placeholder="Salary Frequency"
                    className="salaryFreqJobAd"
                    required
                  ></input>
                </div>
              </div>

              <h3>About the Business *</h3>
              <textarea
                data-id="0"
                name="aboutBusiness"
                placeholder="About the business"
                className="aboutBusiness"
                required
              ></textarea>

              <h3>The Role *</h3>
              <textarea
                data-id="0"
                name="role"
                placeholder="What is the role?"
                className="role"
                required
              ></textarea>

              <h3>Skills and Experience Required *</h3>
              <textarea
                data-id="0"
                name="skillsExp"
                placeholder="Skills and Experience Required"
                className="skillsExp"
                required
              ></textarea>

              <h3>Apply Now Information *</h3>
              <textarea
                data-id="0"
                name="applyNow"
                placeholder="Apply Now"
                className="applyNow"
                required
              ></textarea>

              <h3>Contact Details *</h3>
              <textarea
                data-id="0"
                name="contactDetails"
                placeholder="Contact Details"
                className="contactDetails"
                required
              ></textarea>
              <div className="jobSubmitButtonDiv">
                <button type="submit" className="jobSubmitButton">
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
