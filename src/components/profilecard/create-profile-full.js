import React, { Component } from "react";
import ExpCard from "./expadd-profile-card";
import ProfileArray from "./array-profile-card";
import exp from "./expadd-profile-card";
import licenses from "./array-profile-card";
import { uuid } from "uuidv4";

//workStatus TODO: X
//website url TODO: X
//location X TODO: ADD AUSTRALIAN SUBURBS? CHECK
//exp company / image url / date / text  X 4
//licenses
//education
//refrences
//best work   / header / desc/ imageUrl / date

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      profileImageUrl: "",
      recentEmp: "",
      workStatus: "",
      websiteUrl: "",
      trade: "",
      location: "",
      about: "",
      exp: [
        {
          index: uuid(),
          company: "",
          date: ["", "", "", ""],
          imageUrl: "",
          text: "",
        },
      ],
      licenses: [{index : uuid() , }],
      education: [],
      refrences: [],
      bestwork: [{ header: "", date: "", imageUrl: "", desc: "" }],
    };
  }

  handleChange = (e) => {
    if (e.target.name === "licenses") {
      let lic = [...this.state.licenses];
      console.log("here");
      console.log(lic);
      console.log(this.state.licenses);
      console.log(e.target.value);
      console.log([e.target.dataset.id]);
      this.state.licenses[e.target.dataset.id] = e.target.value;
      console.log(lic);
    } else {
      if (
        ["index", "company", "date", "imageUrl", "text"].includes(e.target.name)
      ) {
        let exp = [...this.state.exp];
        exp[e.target.dataset.id][e.target.name] = e.target.value;
      } else if (["date1", "date2", "date3", "date4"].includes(e.target.name)) {
        let exp = [...this.state.exp];
        if (e.target.name === "date1" || "date2" || "date3" || "date4") {
          if (e.target.name === "date1") {
            exp[e.target.dataset.id].date[0] = e.target.value;
          } else if (e.target.name === "date2") {
            exp[e.target.dataset.id].date[1] = e.target.value;
          } else if (e.target.name === "date3") {
            exp[e.target.dataset.id].date[2] = e.target.value;
          } else if (e.target.name === "date4") {
            exp[e.target.dataset.id].date[3] = e.target.value;
          } else {
            console.log("error");
          }
        }
      } else {
        console.log("Here");
        this.setState({ [e.target.name]: e.target.value });
      }
    }
  };

  //add new row
  addNewRow = (e) => {
    this.setState((prevState) => ({
      exp: [
        ...prevState.exp,
        {
          index: uuid(),
          company: "",
          date: ["", "", "", ""],
          imageUrl: "",
          text: "",
        },
      ],
    }));
  };
  //add new array
  addNewArray = (e) => {
    let licensesArr = this.state.licenses;
    licensesArr.push(uuid());
    this.setState({
      licenses: licensesArr,
    });
  };

  //delete experience section
  clickOnDelete(index) {
    console.log(index);
    console.log(this.state.licenses);
    let expDelete = this.state.exp.filter((r) => r !== index);
    this.setState(
      {
        exp: expDelete,
      },
      () => console.log(this.state.exp)
    );
  }

  //delete array
  clickOnDeleteArray = (index) => {
    console.log("here");
    console.log(index);
    console.log(this.state.licenses);
    this.state.licenses.splice(index, 1);
    let deleteArr = this.state.licenses;
    console.log(deleteArr)
    this.setState({
      licenses: deleteArr,
    });
  };

  render() {
    let { exp } = this.state;
    let { licenses } = this.state;
    return (
      <div className="pageBody">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <h1>Personal Details</h1>
          <div>
            <input type="text" placeholder="Full Name" name="fullName"></input>
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
            <input type="text" placeholder="Trade Qualificaiton"></input>
          </div>
          <div>
            <input type="text" placeholder="Location"></input>
          </div>
          <div>
            <input type="url" id="url" name="url" placeholder="Website"></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Current/ most recent employer"
            ></input>
          </div>

          <div>
            <input type="text" placeholder="Work Status"></input>
          </div>

          <div>
            <input type="text" placeholder="About me"></input>
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
            <ProfileArray
              add={this.addNewArray}
              delete={this.clickOnDeleteArray.bind(this)}
              licenses={licenses}
            />

            <h2>Education</h2>

            <h2>Refrences</h2>
          </div>
          <div>
            <h1>Showcase Work</h1>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateProfile;
