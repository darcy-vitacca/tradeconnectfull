import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchEmployee, sears } from "../redux/actions/userActions";
import { ScaleLoader } from "react-spinners";
import PropTypes from "prop-types";
import { employeeSearch } from "../components/peoplesearch/employeeSearchFunc";
import { jobSearch } from "../components/jobsearch/jobSearchFunc";
import { searchJobs } from "../redux/actions/userActions";
import { uuid } from "uuidv4";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchState: true,
      jobSearchInput: [
        {
          keywords: "",
          tradeClassification: "",
          state: "",
        },
      ],
      peopleSearchInput: [
        {
          name: "",
          tradeClassification: "",
          state: "",
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

  //Alternating Search Btn Func
  ToggleButton() {
    this.myFormRef.reset();
    if (this.state.searchState === false) {
      this.setState((prevState) => ({
        searchState: !prevState.searchState,
        jobSearchInput: [
          {
            keywords: "",
            tradeClassification: "",
            state: "",
          },
        ],
        peopleSearchInput: [
          {
            name: "",
            tradeClassification: "",
            state: "",
          },
        ],
      }));
    } else if (this.state.searchState === true) {
      this.setState((prevState) => ({
        searchState: !prevState.searchState,
        jobSearchInput: [
          {
            keywords: "",
            tradeClassification: "",
            state: "",
          },
        ],
        peopleSearchInput: [
          {
            name: "",
            tradeClassification: "",
            state: "",
          },
        ],
      }));
    }
  }

  // TODO: //maybe make a click required only for the location to filter out bad data.

  handleChange = (e) => {
    if (this.state.searchState === false) {
      let peopleSearchInputState = [...this.state.peopleSearchInput];
      peopleSearchInputState[e.target.dataset.id][e.target.name] =
        e.target.value;
      console.log(peopleSearchInputState[0]);
    } else if (this.state.searchState === true) {
      let jobSearchInputState = [...this.state.jobSearchInput];
      jobSearchInputState[e.target.dataset.id][e.target.name] = e.target.value;
      console.log(jobSearchInputState[0]);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    //handle employee search
    if (this.state.searchState === false) {
      employeeSearch(this.state, this.props);
      // console.log(this.state.jobSearchInput)

      //handle job search
    } else if (this.state.searchState === true) {
      // console.log(this.state.peopleSearchInput)
      jobSearch(this.state, this.props);
    }
  };

  // TODO: when logged in handle clicking on loggin links or don't show them on the home page
  //TODO: add no autocmplete
  //Alternating Search Btn Render
  searchStateInput() {
    let { classifcations } = this.state;
    if (this.state.searchState === true) {
      //JOBSEARCH
      return (
        <div className="searchInput" key={uuid()}>
          <h4 className="searchTypeHome">Job Search</h4>

          <div className="searchHomeLabels">
            <label>Keywords </label>
            <input
              type="search"
              data-id="0"
              placeholder="Enter Job Keywords"
              className="searchPeopleName"
              name="keywords"
            ></input>
          </div>
          <div className="searchHomeLabels">
            <label>Trade Classification</label>

            <select
              name="tradeClassification"
              className="searchPeopleName"
              data-id="0"
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

          <div className="searchHomeLabels">
            <label>Location </label>
            <select name="state" className="searchPeopleName" data-id="0">
              <option value="" disabled selected hidden>
                State
              </option>
              <option>ACT</option>
              <option>NSW</option>
              <option>NT</option>
              <option>QLD</option>
              <option>TAS</option>
              <option>SA</option>
              <option>VIC</option>
              <option>WA</option>
            </select>
          </div>
        </div>
      );
    } else {
      //EMPLOYEE SEARCH
      return (
        <div className="searchInput" key={uuid()}>
          <h4 className="searchTypeHome">Employee Search</h4>

          <div className="searchHomeLabels">
            <label>Name</label>
            <input
              type="search"
              name="name"
              data-id="0"
              placeholder="Name"
              className="searchPeopleName"
            ></input>
          </div>

          <div className="searchHomeLabels">
            <label>Trade Classification</label>

            <select
              name="tradeClassification"
              className="searchPeopleName"
              data-id="0"
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

          <div className="searchHomeLabels">
            <label>Location</label>
            <select name="state" className="searchPeopleName" data-id="0">
              <option value="" disabled selected hidden>
                State
              </option>
              <option>ACT</option>
              <option>NSW</option>
              <option>NT</option>
              <option>QLD</option>
              <option>TAS</option>
              <option>SA</option>
              <option>VIC</option>
              <option>WA</option>
            </select>
          </div>
        </div>
      );
    }
  }

  render() {
    let { searchState } = this.state;
    return (
      <div>
        <section className="homePageSec">
          <h1>TradeConnect</h1>
          <p className="homeSubhead">
            Connecting all aspects of trade from employee to employer to client.
            Allowing all parties to communicate easier.
          </p>
          <img
            src={require("../images/team.png")}
            className="homePageIcon"
            alt="Home"
          ></img>
          <div>
            <div className="homePageContainer">
              <div className="homePageImage"></div>
              <div className="homeCenter">
                <div className="homeSearchButtons">
                  <button
                    onClick={() => this.ToggleButton()}
                    disabled={searchState}
                    className="homeToggleButton"
                  >
                    Job Search
                  </button>
                  <button
                    onClick={() => this.ToggleButton()}
                    disabled={searchState !== true}
                    className="homeToggleButton"
                  >
                    Employee Search
                  </button>
                </div>
                <form
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  ref={(el) => (this.myFormRef = el)}
                >
                  {this.searchStateInput()}
                  <button type="submit" className="homeToggleButton">
                    Search
                  </button>
                </form>
              </div>
            </div>
            <div className="loginSignupHome">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Home.propTypes = {
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
  searchEmployee,
  searchJobs,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
