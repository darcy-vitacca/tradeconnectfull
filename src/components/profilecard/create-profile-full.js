import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";
import { ScaleLoader } from "react-spinners";
import Autocomplete from "react-google-autocomplete";
import { createProfile } from "../../redux/actions/userActions";

//PAGE COMPONENTS
import ExpCard from "./create-profile/expadd-profile-card";
import BestWorkCard from "./create-profile/bestworkadd-profile-card";
import ProfileArray from "./create-profile/array-licences-profile-card";
import EduArray from "./create-profile/array-edu-profile-card";
import RefArray from "./create-profile/array-ref-profile-card";

// TODO: go through every section rename everything so it's clear
// TODO: allow only a certain ammount of each thing to be dynamically added?
// TODO: IMAGE UPLOAD

class CreateProfile extends Component {
  //FORM STRUCUTRE
  constructor() {
    super();
    this.state = {
      errors: {},
      fullName: "",
      profileImageUrl: "",
      recentEmp: "",
      workStatus: "",
      website: "",
      trade: "",
      location: "",
      about: "",
      exp: [
        {
          index: uuid(),
          company: "",
          date: ["Jan", "", "Jan", ""],
          imageUrl: "",
          text: "",
        },
      ],
      licences: [
        {
          index: uuid(),
          licences: "",
        },
      ],
      education: [
        {
          index: uuid(),
          education: "",
        },
      ],
      references: [
        {
          index: uuid(),
          references: "",
        },
      ],
      bestWork: [
        {
          index: uuid(),
          header: "",
          imageUrl: "",
          desc: "",
        },
      ],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let licencesArr = [];
    let educationArr = [];
    let referencesArr = [];
    let fullNameArr = [];
    //converts and object to not be a pointer and actually a clone
    let expArr = JSON.parse(JSON.stringify(this.state.exp));
    let bestWorkArr = JSON.parse(JSON.stringify(this.state.bestWork));

    //indexes in exp and merge date range
    expArr.forEach((doc) => {
      // if (doc.index) {
      //   delete doc.index;
      // }
      doc.date = `${doc.date[0]} ${doc.date[1]} - ${doc.date[2]} ${doc.date[3]}`;
    });

    //indexes in licences/education/refrences removal as well as array arrange
    let indexItems = [
      this.state.licences,
      this.state.education,
      this.state.references,
    ];

    fullNameArr = this.state.fullName
      .split(" ")
      .reduce((acc, cv) => {
        return acc + " " + cv[0].toUpperCase() + cv.slice(1);
      }, "")
      .trim();

    fullNameArr = fullNameArr.split(" ");

    indexItems.forEach((entry) => {
      entry.forEach((doc) => {
        if (doc.licences) {
          // console.log(doc.licences);
          licencesArr.push(doc.licences);
          // console.log(licencesArr);
        } else if (doc.education) {
          // console.log(doc.education);
          educationArr.push(doc.education);
          // console.log(educationArr);
        } else if (doc.references) {
          // console.log(doc.references);
          referencesArr.push(doc.references);
          // console.log(referencesArr);
        } else {
          console.log("error");
        }
        // console.log(doc);
      });
    });

    const profileDetails = {
      userId: this.props.user.credentials.userId,
      about: this.state.about,
      education: educationArr,
      exp: expArr,
      fullName: fullNameArr,
      licences: licencesArr,
      location: this.state.location,
      profileImageUrl: this.state.profileImageUrl,
      recentEmp: this.state.recentEmp,
      trade: this.state.trade,
      references: referencesArr,
      bestWork: bestWorkArr,
      workStatus: this.state.workStatus,
      website: this.state.website,
    };
    console.log(profileDetails);
    this.props.createProfile(profileDetails, this.props.history);
  };

  //FORM CHANGE HANDLER
  handleChange = (e) => {
    if (e.target.name === "licences") {
      let license = [...this.state.licences];
      license[e.target.dataset.id][e.target.name] = e.target.value;
      // console.log(license);
    } else if (e.target.name === "education") {
      let education = [...this.state.education];
      education[e.target.dataset.id][e.target.name] = e.target.value;
      // console.log(education);
    } else if (e.target.name === "references") {
      let reference = [...this.state.references];
      reference[e.target.dataset.id][e.target.name] = e.target.value;
      // console.log(reference);

      //exp handler
    } else if (e.target.className.includes("expCardSec")) {
      if (["date1", "date2", "date3", "date4"].includes(e.target.name)) {
        let exp = [...this.state.exp];
        if (e.target.name === "date1" || "date2" || "date3" || "date4") {
          if (e.target.name === "date1") {
            // console.log(exp[e.target.dataset.id]);
            exp[e.target.dataset.id].date[0] = e.target.value;
          } else if (e.target.name === "date2") {
            // console.log(exp[e.target.dataset.id]);
            exp[e.target.dataset.id].date[1] = e.target.value;
          } else if (e.target.name === "date3") {
            // console.log(exp[e.target.dataset.id]);
            exp[e.target.dataset.id].date[2] = e.target.value;
          } else if (e.target.name === "date4") {
            // console.log(exp[e.target.dataset.id]);
            exp[e.target.dataset.id].date[3] = e.target.value;
          } else {
            console.log("error");
          }
        }
      } else {
        let exp = [...this.state.exp];
        exp[e.target.dataset.id][e.target.name] = e.target.value;
      }
      //bestWorkHandler
    } else if (e.target.className.includes("bestWorkSec")) {
      if (e.target.name !== "file") {
        let bWork = [...this.state.bestWork];
        bWork[e.target.dataset.id][e.target.name] = e.target.value;
        // console.log(bWork);
      } else {
        console.log("image");
      }
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  //ADD NEW CARD ROW BEST WORK/EXP
  addNewRow = (e) => {
    // console.log("here");
    // console.log(e);
    if (e.exp) {
      this.setState((prevState) => ({
        exp: [
          ...prevState.exp,
          {
            index: uuid(),
            company: "",
            date: ["Jan", "", "Jan", ""],
            imageUrl: "",
            text: "",
          },
        ],
      }));
    } else if (e.bestWork) {
      this.setState((prevState) => ({
        bestWork: [
          ...prevState.bestWork,
          {
            index: uuid(),
            header: "",
            imageUrl: "",
            desc: "",
          },
        ],
      }));
    } else {
      console.log("error");
    }
  };

  //ADD NEW ARRAY licences EDUCATION REFERENCES
  addNewArray = (e) => {
    // console.log("here");
    if (e.licences) {
      // console.log(e.licences);
      this.setState((prevState) => ({
        licences: [
          ...prevState.licences,
          {
            index: uuid(),
            licences: "",
          },
        ],
      }));
    } else if (e.education) {
      // console.log(e.education);
      this.setState((prevState) => ({
        education: [
          ...prevState.education,
          {
            index: uuid(),
            education: "",
          },
        ],
      }));
    } else if (e.references) {
      // console.log(e.references);
      this.setState((prevState) => ({
        references: [
          ...prevState.references,
          {
            index: uuid(),
            references: "",
          },
        ],
      }));
    } else {
      console.log("error");
    }
  };

  //DELETE CARD SECTION EXPERIENCE/ BEST WORK
  clickOnDelete(index) {
    if (index.company !== undefined) {
      let expDelete = this.state.exp.filter((r) => r !== index);
      this.setState({
        exp: expDelete,
      });
    } else if (index.header !== undefined) {
      let bestWorkDelete = this.state.bestWork.filter((r) => r !== index);
      this.setState({
        bestWork: bestWorkDelete,
      });
    } else {
      console.log("error");
    }
  }

  //DELETE ARRAY SECTION licences/EDUCATION/REFRENCES
  clickOnDeleteArray = (index) => {
    console.log("Delete array");
    console.log(index);

    if (index.licences !== undefined) {
      let licencesUpd = this.state.licences.filter((r) => r !== index);
      this.setState({
        licences: licencesUpd,
      });
    } else if (index.education !== undefined) {
      let educationUpd = this.state.education.filter((r) => r !== index);
      this.setState({
        education: educationUpd,
      });
    } else if (index.references !== undefined) {
      let refrenceUpd = this.state.references.filter((r) => r !== index);
      this.setState({
        references: refrenceUpd,
      });
    } else {
      console.log("error");
    }
  };

  render() {
    let { exp, licences, education, references, bestWork } = this.state;
    let {
      UI: { loading },
    } = this.props;
    return (
      <div>
        <h1 className="createProfileHeader">Create Your Profile</h1>

        <div className="createProfileCont">
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div className="createProfileUpper">
              <div>
                <h3>Name *</h3>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="fullName"
                  required
                ></input>
              </div>

              <div>
                <h3>Trade Qualification *</h3>
                <input
                  type="text"
                  placeholder="Trade Qualificaiton"
                  name="trade"
                  required
                ></input>
              </div>
              <div>
                <h3>Location *</h3>
                <Autocomplete
                  name="location"
                  onPlaceSelected={(place) => {
                    this.setState({ location: place.formatted_address });
                    console.log(this.state);
                  }}
                  types={["(regions)"]}
                  componentRestrictions={{ country: "au" }}
                />
              </div>

              <div>
                <h3>Website</h3>
                <input
                  type="url"
                  id="url"
                  name="url"
                  placeholder="Website if applicable"
                  name="website"
                ></input>
              </div>

              <div>
                <h3>Current/ Recent Employer</h3>
                <input
                  type="text"
                  placeholder="Current/ most recent employer"
                  name="recentEmp"
                ></input>
              </div>

              <div>
                <h3>Work Status *</h3>
                <input
                  type="text"
                  placeholder="Work Status"
                  name="workStatus"
                ></input>
              </div>
              <div>
                <h3>Profile Photo</h3>

                <input
                  type="file"
                  placeholder="Profile Photo"
                  id="profileImageUrl"
                ></input>
              </div>
            </div>

            <div className="createProfileLower">
              <h3>About Me *</h3>

              <textarea
                className="createProfileTextAreas"
                placeholder="Enter a bit about yourself to let people know who you are to entice future employment..."
                required
              ></textarea>

              <h3>Experience *</h3>

              <ExpCard
                add={this.addNewRow}
                delete={this.clickOnDelete.bind(this)}
                exp={exp}
              />
              <div>
                <h3>Skills</h3>

                <h3>Licenses/ Tickets</h3>
                <div className="licCard">
                  <ProfileArray
                    add={this.addNewArray}
                    delete={this.clickOnDeleteArray.bind(this)}
                    licences={licences}
                  />
                </div>

                <h3>Education</h3>
                <div className="licCard">
                  <EduArray
                    add={this.addNewArray}
                    delete={this.clickOnDeleteArray.bind(this)}
                    education={education}
                  />
                </div>

                <h3>References</h3>
                <div className="licCard">
                  <RefArray
                    add={this.addNewArray}
                    delete={this.clickOnDeleteArray.bind(this)}
                    references={references}
                  />
                </div>
              </div>
              <div>
                <h3>Best Work</h3>
                <BestWorkCard
                  add={this.addNewRow}
                  delete={this.clickOnDelete.bind(this)}
                  bestWork={bestWork}
                />
              </div>
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

              <button
                type="submit"
                className="createProfileSubmit"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

//TODO: PROPTYPES FOR THE PAGE TO BRING IN FROM THE GLOBAL STATE
CreateProfile.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  createProfile,
};

export default connect(mapStateToProps, mapActionsToProps)(CreateProfile);
