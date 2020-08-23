import React, { Component } from "react";
import { connect } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import { createJob, uploadImage, editJob } from "../redux/actions/userActions";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";
import { ScaleLoader } from "react-spinners";

//TODO: Token expiring need to make the token better
class PostJob extends Component {
  constructor() {
    super();
    this.state = {
      fullJob: [
        {
          job: "",
          jobId: "",
          jobSummary: "",
          company: "",
          location: "",
          salary: "",
          salaryFreq: "",
          aboutBusiness: "",
          role: "",
          skillsExp: "",
          additionalInfo: "",
          contactDetails: "",
          tradeClassification: "",
          keywords: "",
          imageUrl: "",
          workType: "",
          locationCheck: false,
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
      worktype: ["Full Time", "Part Time", "Casual", "Contract"],
      salaryfreq: ["Per Year", "Per Hour"],
    };
  }
  componentWillUnmount() {
    if (this.props.user.editing === true) {
      this.props.editJob(this.props.history, false);
    }
  }
  componentDidMount() {
    if (this.props.user.editing === true) {
      const editingJob = this.props.user.jobs.filter(
        (job) => job.jobId === this.props.user.editJobId
      );
      console.log(editingJob);
      this.setState(
        (prevState) => ({
          ...prevState,

          fullJob: [
            {
              job: editingJob[0].job,
              jobSummary: editingJob[0].jobSummary,
              company: editingJob[0].company,
              salary: editingJob[0].salary,
              salaryFreq: editingJob[0].salaryFreq,
              aboutBusiness: editingJob[0].aboutBusiness,
              role: editingJob[0].role,
              skillsExp: editingJob[0].skillsExp,
              additionalInfo: editingJob[0].additionalInfo,
              contactDetails: editingJob[0].contactDetails,
              tradeClassification: editingJob[0].tradeClassification,
              keywords: editingJob[0].keywords,
              workType: editingJob[0].workType,
              editing: this.props.user.editing,
              imageUrl: "",
              keywords: "",
              location: "",
              jobId: this.props.user.editJobId,
              locationCheck: false,
            },
          ],
        }),
        () => {
          console.log(this.state);
        }
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleChange = (e) => {
    if (e.target.name !== "autoLocation") {
      if (e.target.type !== "file") {
        let fullJob = [...this.state.fullJob];
        fullJob[e.target.dataset.id][e.target.name] = e.target.value;
        this.setState({ fullJob }, console.log(this.state));
        console.log(fullJob);
        console.log(this.state.fullJob[0]);
      }
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let fullJobState = this.state.fullJob[0];
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
      jobId: fullJobState.jobId,
      editing: fullJobState.editing,
      job: fullJobState.job,
      jobSummary: fullJobState.jobSummary,
      company: fullJobState.company,
      location: locationArr,
      state: stateLocation,
      salary: fullJobState.salary,
      salaryFreq: fullJobState.salaryFreq,
      aboutBusiness: fullJobState.aboutBusiness,
      role: fullJobState.role,
      skillsExp: fullJobState.skillsExp,
      additionalInfo: fullJobState.additionalInfo,
      contactDetails: fullJobState.contactDetails,
      tradeClassification: fullJobState.tradeClassification,
      imageUrl: fullJobState.imageUrl,
      keywords: keywordsArr,
      workType: fullJobState.workType,
    };
    console.log(newJob);
    this.props.createJob(newJob, this.props.history, this.props.user.editing);
  };

  //HANDLES AUTO-FILL CHROME BUG
  onFocus = (event) => {
    console.log(this.state);
    if (event.target.autocomplete) {
      event.target.autocomplete = "";
    }
  };
  //TODO: need to handle state changing when location set
  onBlur = (event) => {
    if (this.state.fullJob[0].locationCheck === false) {
      event.target.value = "";
    }
  };

  handleImageChange = (e) => {
    let target = e.target;
    console.log(e.target);
    let fullJob = [...this.state.fullJob];
    console.log(fullJob);
    const image = e.target.files[0];
    if (image) {
      //send to server
      const formData = new FormData();
      formData.append("image", image, image.name);
      this.props
        .uploadImage(formData)
        .then((res) => {
          let uploadedImage = res[0];
          if (target.id === "imageUrl") {
            let fullJob = [...this.state.fullJob];
            fullJob[0][target.name] = uploadedImage;
          }
        })
        .catch((err) => console.log(err));
    }
    console.log("here");
  };

  render() {
    let { classifcations, worktype, salaryfreq } = this.state;
    let {
      fullJob: [
        {
          job,
          jobSummary,
          company,
          salary,
          salaryFreq,
          aboutBusiness,
          role,
          skillsExp,
          additionalInfo,
          contactDetails,
          tradeClassification,
          workType,
        },
      ],
    } = this.state;
    let {
      UI: { loading },
    } = this.props;
    console.log(this.state);
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
                autoComplete="off"
              ></input>
              <div className="upperPostJobForm">
                <div>
                  <h3>Job Title *</h3>
                  <input
                    name="job"
                    value={job}
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
                    value={company}
                    data-id="0"
                    placeholder="Company"
                    className="companyJobAd"
                    required
                  ></input>
                </div>
                <div>
                  <h3>Location *</h3>
                  <Autocomplete
                    data-id="0"
                    name="autoLocation"
                    required
                    onBlur={this.onBlur}
                    placeholder="Select a Location from the dropdown"
                    onPlaceSelected={(place) => {
                      console.log(place);
                      this.setState((prevState) => ({
                        fullJob: [
                          {
                            ...prevState.fullJob[0],
                            location: place.formatted_address,
                            locationCheck: true,
                          },
                        ],
                      }));
                    }}
                    types={["(regions)"]}
                    componentRestrictions={{ country: "au" }}
                    onFocus={this.onFocus}
                  />

                  <h3>Trade Classification</h3>
                  <select
                    name="tradeClassification"
                    value={tradeClassification}
                    className="postJobClassification"
                    data-id="0"
                    required
                  >
                    <option disabled selected hidden>
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
                  <h3>Work Type *</h3>
                  <select
                    name="workType"
                    value={workType}
                    className="postJobClassification"
                    data-id="0"
                    required
                  >
                    <option value="" disabled selected hidden>
                      Work Type
                    </option>
                    {worktype.map((worktype) => {
                      return (
                        <option key={uuid()} value={worktype}>
                          {" "}
                          {worktype}
                        </option>
                      );
                    })}
                  </select>

                  <h3>Salary *</h3>
                  <input
                    data-id="0"
                    value={salary}
                    name="salary"
                    placeholder="Salary"
                    className="salaryJobAd"
                    required
                  ></input>

                  <h3>Salary Frequency *</h3>
                  <select
                    name="salaryFreq"
                    value={salaryFreq}
                    className="postJobClassification"
                    data-id="0"
                    required
                  >
                    <option value="" disabled selected hidden>
                      Salary Frequency
                    </option>
                    {salaryfreq.map((salaryfreq) => {
                      return (
                        <option key={uuid()} value={salaryfreq}>
                          {" "}
                          {salaryfreq}
                        </option>
                      );
                    })}
                  </select>
                  <h3>Company Logo Image</h3>
                  <input
                    type="file"
                    className="expCardSec"
                    name="imageUrl"
                    onChange={this.handleImageChange}
                    data-id="0"
                    placeholder="Company logo image"
                    id="imageUrl"
                  ></input>
                </div>
              </div>

              <h3>Summarize Your Job Ad *</h3>
              <textarea
                data-id="0"
                value={jobSummary}
                name="jobSummary"
                placeholder="Summarize your job ad, this is what applicants will see first in the search results and you want to attract the best applicants."
                className="jobSummary"
                required
              ></textarea>

              <h3>About the Business *</h3>
              <textarea
                data-id="0"
                name="aboutBusiness"
                value={aboutBusiness}
                placeholder="About the business, why would an applicant want to work here?"
                className="aboutBusiness"
                required
              ></textarea>

              <h3>The Role *</h3>
              <textarea
                data-id="0"
                name="role"
                value={role}
                placeholder="What is the role? What does the day in day out on the job look like?"
                className="role"
                required
              ></textarea>

              <h3>Skills and Experience Required *</h3>
              <textarea
                data-id="0"
                name="skillsExp"
                value={skillsExp}
                placeholder="What are the skills and experience required for an applicant to be successful? What is not a requirement but would be advantageous?"
                className="skillsExp"
                required
              ></textarea>

              <h3>Additional Information *</h3>
              <textarea
                data-id="0"
                name="additionalInfo"
                value={additionalInfo}
                placeholder="Is there any additional information that applicants would need to know about before applying?"
                className="additionalInfo"
                required
              ></textarea>

              <h3>Contact Details *</h3>
              <textarea
                data-id="0"
                name="contactDetails"
                value={contactDetails}
                placeholder="Contact details to apply for the job?"
                className="contactDetails"
                required
              ></textarea>
              <div className="submitSpinner">
                <div className="spinner">
                  {loading === true ? (
                    <div>
                      {" "}
                      <ScaleLoader
                        className="spinner"
                        size={240}
                        loading
                      />{" "}
                    </div>
                  ) : null}{" "}
                </div>
              </div>
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
  uploadImage,
  editJob,
};

export default connect(mapStateToProps, mapActionsToProps)(PostJob);
