import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";
import { ScaleLoader } from "react-spinners";
import Autocomplete from "react-google-autocomplete";
import {
  createProfile,
  logoutUser,
  uploadImage,
} from "../../redux/actions/userActions";

//PAGE COMPONENTS
import ExpCard from "./create-profile/expadd-profile-card";
import BestWorkCard from "./create-profile/bestworkadd-profile-card";
import ProfileArray from "./create-profile/array-licences-profile-card";
import EduArray from "./create-profile/array-edu-profile-card";
import RefArray from "./create-profile/array-ref-profile-card";
import { isCompositeComponent } from "react-dom/test-utils";
import education from "./create-profile/array-edu-profile-card";

// TODO: go through every section rename everything so it's clear
// TODO: allow only a certain ammount of each thing to be dynamically added?
//TODO:recentEmployment
//TODO: handle errors if an image can't be uploaded handle in user actions loading to false

class CreateProfile extends Component {
  //FORM STRUCUTRE
  constructor() {
    super();
    this.state = {
      errors: {},
      fullName: "",
      profileImageUrl: "",
      employeeSummary: "",
      recentEmp: "",
      workStatus: "",
      website: "",
      trade: "",
      location: "",
      locationCheck: false,
      about: "",
      tradeClassification: "",
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
      workstatus: [
        "Looking for Full Time Work",
        "Looking for Part Time Work",
        "Looking for Casual Work",
        "Looking for Subcontractor Work",
        "Looking for Weekend Work",
        "Not Looking for Work Currently But In the Future",
        "Currently Employed",
      ],
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  dateSplit = (date) => {
    date = date.replace("-", "");
    date = date.split(" ");
    return [date[0], date[1], date[3], date[4]];
  };

  componentDidMount() {
    if (this.props.user.editing === true) {
      const { profile } = this.props.user;
      console.log(profile);

      this.setState(
        (prevState) => ({
          ...prevState,
          userId: profile.userId,
          about: profile.about,
          education: [
            ...profile.education.map((val) => ({
              index: uuid(),
              education: val,
            })),
          ],
          references: [
            ...profile.references.map((val) => ({
              index: uuid(),
              references: val,
            })),
          ],
          licences: [
            ...profile.licences.map((val) => ({
              index: uuid(),
              licences: val,
            })),
          ],
          exp: [
            ...profile.exp.map((exp) => ({
              company: exp.company,
              date: this.dateSplit(exp.date),
              imageUrl: exp.imageUrl !== "undefined" ? exp.imageUrl : "",
              index: exp.index,
              text: exp.text,
            })),
          ],
          bestWork: [
            ...profile.bestWork.map((bWork) => ({
              desc: bWork.desc,
              header: bWork.header,
              imageUrl: bWork.imageUrl !== "undefined" ? bWork.imageUrl : "",
              index: bWork.index,
            })),
          ],
          employeeSummary: profile.employeeSummary,
          fullName: profile.fullName.join(" "),
          profileImageUrl: profile.profileImageUrl,
          recentEmp: profile.recentEmp,
          trade: profile.trade,
          workStatus: profile.workStatus,
          website: profile.website,
          tradeClassification: profile.tradeClassification,
        }),
        () => {
          console.log(this.state);
        }
      );
      console.log(this.state);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let licencesArr = [];
    let educationArr = [];
    let keywordsArr = [];
    let referencesArr = [];
    let fullNameArr = [];
    let locationArr = [];
    let stateLocation;

    //converts and object to not be a pointer and actually a clone
    let expArr = JSON.parse(JSON.stringify(this.state.exp));
    let bestWorkArr = JSON.parse(JSON.stringify(this.state.bestWork));

    //indexes in exp and merge date range
    expArr.forEach((doc) => {
      doc.date = `${doc.date[0]} ${doc.date[1]} - ${doc.date[2]} ${doc.date[3]}`;
    });

    //indexes in licences/education/refrences removal as well as array arrange
    let indexItems = [
      this.state.licences,
      this.state.education,
      this.state.references,
    ];

    //fullName split
    fullNameArr = this.state.fullName
      .split(" ")
      .reduce((acc, cv) => {
        return acc + " " + cv[0].toUpperCase() + cv.slice(1);
      }, "")
      .trim();
    fullNameArr = fullNameArr.split(" ");

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

    //keywords split
    keywordsArr = this.state.trade.split(" ");

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
    //TODO: had issues with the uppercase of the a section
    const profileDetails = {
      userId: this.props.user.credentials.userId,
      about: this.state.about,
      education: educationArr,
      exp: expArr,
      employeeSummary: this.state.employeeSummary,
      fullName: fullNameArr,
      licences: licencesArr,
      location: locationArr,
      state: stateLocation,
      profileImageUrl: this.state.profileImageUrl,
      recentEmp: this.state.recentEmp,
      trade: this.state.trade,
      references: referencesArr,
      bestWork: bestWorkArr,
      workStatus: this.state.workStatus,
      website: this.state.website,
      keywords: keywordsArr,
      tradeClassification: this.state.tradeClassification,
    };
    console.log(profileDetails);
    this.props.createProfile(profileDetails, this.props.history, this.props.user.editing);
  };

  //FORM CHANGE HANDLER
  handleChange = (e) => {
    // console.log(e.target);
    if (e.target.name === "licences") {
      let license = [...this.state.licences];
      license[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({license}, console.log(this.state))
    
    } else if (e.target.name === "education") {
      let education = [...this.state.education];
      education[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({education}, console.log(this.state))

    } else if (e.target.name === "references") {
      let reference = [...this.state.references];
      reference[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({reference}, console.log(this.state))
    

      //exp handler
    } else if (
      e.target.className.includes("periodWorkedYear") ||
      e.target.className.includes("periodWorkedMon") ||
      e.target.id.includes("companyId") ||
      e.target.id.includes("experienceText")
    ) {
      if (["date1", "date2", "date3", "date4"].includes(e.target.name)) {
        let exp = [...this.state.exp];
        if (e.target.name === "date1" || "date2" || "date3" || "date4") {
          if (e.target.name === "date1") {
            exp[e.target.dataset.id].date[0] = e.target.value;
            this.setState({exp}, console.log(this.state))
          } else if (e.target.name === "date2") {
            exp[e.target.dataset.id].date[1] = e.target.value;
            this.setState({exp}, console.log(this.state))
          } else if (e.target.name === "date3") {
            exp[e.target.dataset.id].date[2] = e.target.value;
            this.setState({exp}, console.log(this.state))
          } else if (e.target.name === "date4") {
            exp[e.target.dataset.id].date[3] = e.target.value;
            this.setState({exp}, console.log(this.state))
          } else {
            console.log("error");
          }
        }
      } else {
        let exp = [...this.state.exp];
        exp[e.target.dataset.id][e.target.name] = e.target.value;
        this.setState({exp}, console.log(this.state))
      }
      //bestWorkHandler
    } else if (e.target.className.includes("bestWorkSec")) {
      if (e.target.type !== "file") {
        let bWork = [...this.state.bestWork];
        bWork[e.target.dataset.id][e.target.name] = e.target.value;
        this.setState({bWork}, console.log(this.state))
      } else {
        console.log("image");
      }
    } else {
      let dropdowns = ["workStatus", "tradeClassification"];
      if (e.target.type !== "file") {
        if (
          e.target.name !== "autoLocation" &&
          !dropdowns.includes(e.target.name)
        ) {
          this.setState({ [e.target.name]: e.target.value });
        } else if (dropdowns.includes(e.target.name)) {
          this.setState({[e.target.name] : e.target.value})
        }
      }
    }
  };

  //ADD NEW CARD ROW BEST WORK/EXP
  addNewRow = (e) => {
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

  //ADD NEW ARRAY LICENCES EDUCATION REFERENCES
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

  //DELETE ARRAY SECTION LICENCES/EDUCATION/REFRENCES
  clickOnDeleteArray = (index) => {
    // console.log("Delete array");
    // console.log(index);

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
  handleImageChange = (e) => {
    let target = e.target;
    const image = e.target.files[0];
    if (image) {
      //send to server
      const formData = new FormData();
      formData.append("image", image, image.name);
      this.props
        .uploadImage(formData)
        .then((res) => {
          let uploadedImage = res[0];
          // console.log(res[0]);
          // console.log(target)
          if (target.name === "profileImageUrl") {
            this.setState({ [target.name]: uploadedImage });
            console.log(this.state);
          } else if (target.id === "bestWorkImageUrl") {
            let bWork = [...this.state.bestWork];
            bWork[target.dataset.id][target.name] = uploadedImage;
            this.setState({bWork}, console.log(this.state))
          } else if (target.id === "expImageUrl") {
            let expObj = [...this.state.exp];
            expObj[target.dataset.id][target.name] = uploadedImage;
            console.log(expObj)
            this.setState({expObj})
          }
        })
        .catch((err) => console.log(err));
    }
    console.log("here");
  };

  //HANDLES AUTO-FILL CHROME BUG
  onFocus = (event) => {
    if (event.target.autocomplete) {
      event.target.autocomplete = "";
    }
  };
  lengthHandler = (event) => {
    let dynamicContent = ["experienceText", "references", "bestWorkCardDesc"];

    //checks for dynamic sections
    if (dynamicContent.includes(event.target.id) && event.target.id !== "") {
      document.getElementById(
        `${event.target.id}${event.target.dataset.id}Label`
      ).innerHTML = `${event.target.value.length}/${event.target.maxLength}`;
      if (event.target.value.length >= event.target.maxLength) {
        console.log("too long");
      }
    } else {
      document.getElementById(
        `${event.target.name}Label`
      ).innerHTML = `${event.target.value.length}/${event.target.maxLength}`;

      if (event.target.value.length >= event.target.maxLength) {
        console.log("too long");
      }
    }
  };
  onBlur = (event) => {
    if (this.state.locationCheck === false) {
      event.target.value = "";
    }
  };

  render() {
  
    let {
      exp,
      licences,
      education,
      references,
      bestWork,
      profileImageUrl,
      fullName,
      trade,
      website,
      recentEmp,
      workStatus,
      tradeClassification,
      employeeSummary,
      about,
    } = this.state;
    let {
      UI: { loading },
    } = this.props;
    let { classifcations, workstatus } = this.state;
    console.log(this.props)
    return (
      <div>
        <h1 className="createProfileHeader">Create Your Profile</h1>

        <div className="createProfileCont">
          <form
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            autoComplete="off"
          >
            <input
              className="hiddenInput"
              autoComplete="false"
              name="hidden"
              type="text"
            ></input>
            <div className="createProfileUpper">
              <div>
                <h3>Name *</h3>
                <input
                  value={fullName}
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
                  value={trade}
                  name="trade"
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
                      ...prevState,
                      location: place.formatted_address,
                      locationCheck: true,
                    }));
                  }}
                  types={["(regions)"]}
                  componentRestrictions={{ country: "au" }}
                  onFocus={this.onFocus}
                />
              </div>

              <div>
                <h3>Website</h3>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={website}
                  placeholder="Website if applicable"
                  name="website"
                ></input>
              </div>

              <div>
                <h3>Current/ Recent Employer</h3>
                <input
                  type="text"
                  value={recentEmp}
                  placeholder="Current/ most recent employer"
                  name="recentEmp"
                ></input>
              </div>

              <div>
                <h3>Work Status *</h3>
                <select
                  name="workStatus"
                  value={workStatus}
                  className="postJobClassification"
                  data-id="0"
                  required
                >
                  <option value="" disabled selected hidden>
                    Work Status
                  </option>
                  {workstatus.map((classifcation) => {
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
                <h3>Trade Classification</h3>
                <select
                  name="tradeClassification"
                  value={tradeClassification}
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
                <h3>Profile Photo</h3>

                <input
                  type="file"
                  placeholder="Profile Photo"
                  name="profileImageUrl"
                  id="profileImageUrl"
                  onChange={this.handleImageChange}
                ></input>
              </div>
            </div>

            <div className="createProfileLower">
              <h3>Profile Summary *</h3>

              <textarea
                name="employeeSummary"
                value={employeeSummary}
                className="createProfileTextAreas"
                id="employeeSummary"
                placeholder="Summarize who you are, your experience and why employers should pick you. This is what will be shown in search results first so sell yourself."
                required
                onInput={this.lengthHandler}
                maxLength="1000"
              ></textarea>
              <p id="employeeSummaryLabel" className="inputLengthLabels">
                0/1000
              </p>
              <h3>About Me *</h3>

              <textarea
                name="about"
                value={about}
                className="createProfileTextAreas"
                placeholder="Enter a bit about yourself to let people know who you are to entice future employment..."
                onInput={this.lengthHandler}
                maxLength="600"
                required
              ></textarea>
              <p id="aboutLabel" className="inputLengthLabels">
                0/600
              </p>

              <h3>Experience *</h3>

              <ExpCard
                add={this.addNewRow}
                delete={this.clickOnDelete.bind(this)}
                inputHandler={this.lengthHandler}
                exp={exp}
                imageUploadFunc={this.handleImageChange.bind(this)}
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
                    inputHandler={this.lengthHandler}
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
                  inputHandler={this.lengthHandler}
                  imageUploadFunc={this.handleImageChange.bind(this)}
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

CreateProfile.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

const mapActionsToProps = {
  createProfile,
  logoutUser,
  uploadImage,
};

export default connect(mapStateToProps, mapActionsToProps)(CreateProfile);
