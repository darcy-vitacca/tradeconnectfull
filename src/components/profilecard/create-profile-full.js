import React, { Component } from "react";
import ExpCard from "./expadd-profile-card";
import BestWorkCard from "./bestworkadd-profile-card";
import ProfileArray from "./array-licenses-profile-card";
import EduArray from "./array-edu-profile-card";
import RefArray from "./array-ref-profile-card";
import axios from 'axios'

//DELETE IF DOING NOTHING TODO:
import exp from "./expadd-profile-card";
import licenses from "./array-licenses-profile-card";
import education from "./array-edu-profile-card";
import references from "./array-ref-profile-card";
import { uuid } from "uuidv4";
import Axios from "axios";

//rename everything so it's clear TODO:// got through every section
// allow only a certain ammount of each thing to be dynamically added? TODO:
//Do I  need to prop types?
//workStatus TODO: X
//website url TODO: X
//location X TODO: ADD AUSTRALIAN SUBURBS? CHECK
//CONCAT DATES TODO:
//TOD0: JAN SELECTED ISSUE? IMAGE UPLOAD

class CreateProfile extends Component {
  //FORM STRUCUTRE
  constructor() {
    super();
    this.state = {
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
      licenses: [
        {
          index: uuid(),
          licenses: "",
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
    console.log(this.state.exp.forEach);
    this.state.exp.forEach((doc) => {
      console.log(doc);
      doc.date= `${doc.date[0]} ${doc.date[1]} - ${doc.date[2]} ${doc.date[3]}`
      console.log(doc);
    });
    console.log(this.state.exp);

    // const profileDetails = {
    //   fullName: this.state.fullName,
    //   profileImageUrl: this.state.profileImageUrl,
    //   recentEmp: this.state.recentEmp,
    //   workStatus: this.state.workStatus,
    //   website: this.state.website,
    //   trade: this.state.trade,
    //   location: this.state.location,
    //   about: this.state.about,
    //   exp: this.state.exp,
    //   licenses: this.state.licenses,
    //   education: this.state.education,
    //   references: this.state.references,
    //   bestWork: this.state.bestWork,
    // };
    const profileDetails = {
      fullName: this.state.fullName,
      profileImageUrl: this.state.profileImageUrl,
      recentEmp: this.state.recentEmp,
      trade: this.state.trade,
      location: this.state.location,
      about: this.state.about,
      exp: this.state.exp,
      licenses: this.state.licenses,
      education: this.state.education,
      references: this.state.references,
      bestWork: this.state.bestWork,
    };

    axios.post('/createprofile', profileDetails)
    .then( res => {
      console.log(res.data);
      this.props.history.push('/')
    })
    .catch(err =>{
      console.error(err)
    })
   
  };

  //FORM CHANGE HANDLER
  handleChange = (e) => {
    if (e.target.name === "licenses") {
      let license = [...this.state.licenses];
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
            console.log(exp[e.target.dataset.id]);
            exp[e.target.dataset.id].date[0] = e.target.value;
          } else if (e.target.name === "date2") {
            console.log(exp[e.target.dataset.id]);
            exp[e.target.dataset.id].date[1] = e.target.value;
          } else if (e.target.name === "date3") {
            console.log(exp[e.target.dataset.id]);
            exp[e.target.dataset.id].date[2] = e.target.value;
          } else if (e.target.name === "date4") {
            console.log(exp[e.target.dataset.id]);
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
        console.log(bWork);
      } else {
        console.log("image");
      }
    } else {
      this.setState({ [e.target.name]: e.target.value }, () =>
        console.log(this.state)
      );
    }
  };

  //ADD NEW CARD ROW BEST WORK/EXP
  addNewRow = (e) => {
    console.log("here");
    console.log(e);
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

  //ADD NEW ARRAY LICENSES EDUCATION REFERENCES
  addNewArray = (e) => {
    // console.log("here");

    if (e.licenses) {
      // console.log(e.licenses);
      this.setState((prevState) => ({
        licenses: [
          ...prevState.licenses,
          {
            index: uuid(),
            licenses: "",
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
  // TODO: DELETE BEST WORK
  clickOnDelete(index) {
    console.log("Delete card");
    console.log(index.bestWork);
    let expDelete = this.state.exp.filter((r) => r !== index);
    this.setState(
      {
        exp: expDelete,
      },
      () => console.log(this.state.exp)
    );
  }

  //DELETE ARRAY SECTION LICENSES/EDUCATION/REFRENCES
  clickOnDeleteArray = (index) => {
    console.log("Delete array");
    console.log(index);

    if (index.licenses !== undefined) {
      let licensesUpd = this.state.licenses.filter((r) => r !== index);
      this.setState({
        licenses: licensesUpd,
      });
      // console.log("this.state.licenses");
      // console.log(this.state.licenses);
    } else if (index.education !== undefined) {
      let educationUpd = this.state.education.filter((r) => r !== index);
      this.setState({
        education: educationUpd,
      });
      // console.log("this.state.education");
      // console.log(this.state.education);
    } else if (index.references !== undefined) {
      let refrenceUpd = this.state.references.filter((r) => r !== index);
      this.setState({
        references: refrenceUpd,
      });
      // console.log("this.state.refrences");
      // console.log(this.state.references);
    } else {
      console.log("error");
    }
  };

  render() {
    let { exp, licenses, education, references, bestWork } = this.state;
    return (
      <div className="pageBody">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <h1>Personal Details</h1>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              required
            ></input>
          </div>
          <div>
            <label>Profile Photo</label>
            <div>
              <input
                type="file"
                placeholder="Profile Photo"
                id="profileImageUrl"
              ></input>
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Trade Qualificaiton"
              name="trade"
              required
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Location"
              name="location"
              required
            ></input>
          </div>
          {/* TODO: add to backend */}
          <div>
            <input
              type="url"
              id="url"
              name="url"
              placeholder="Website"
              name="website"
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Current/ most recent employer"
              name="recentEmp"
            ></input>
          </div>

          <div>
            <input
              type="text"
              placeholder="Work Status"
              name="workStatus"
            ></input>
          </div>
          {/* TODO: text area */}
          <div>
            <input
              type="text"
              placeholder="About me"
              name="about"
              required
            ></input>
          </div>

          <h1>Experience</h1>

          <ExpCard
            add={this.addNewRow}
            delete={this.clickOnDelete.bind(this)}
            exp={exp}
          />
          <div>
            <h1>Skills</h1>

            <h2>Licenses</h2>
            <div className="licCard">
              <ProfileArray
                add={this.addNewArray}
                delete={this.clickOnDeleteArray.bind(this)}
                licenses={licenses}
              />
            </div>

            <h2>Education</h2>
            <div className="licCard">
              <EduArray
                add={this.addNewArray}
                delete={this.clickOnDeleteArray.bind(this)}
                education={education}
              />
            </div>

            <h2>References</h2>
            <div className="licCard">
              <RefArray
                add={this.addNewArray}
                delete={this.clickOnDeleteArray.bind(this)}
                references={references}
              />
            </div>
          </div>
          <div>
            <h1>Showcase Work</h1>
            <BestWorkCard
              add={this.addNewRow}
              delete={this.clickOnDelete.bind(this)}
              bestWork={bestWork}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateProfile;
