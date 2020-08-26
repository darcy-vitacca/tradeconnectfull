//Core
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Redux
import { searchJobs } from "../redux/actions/userActions";
import { searchEmployee } from "../redux/actions/userActions";
//Functions
import { jobSearch } from "../components/jobsearch/jobSearchFunc";
import { employeeSearch } from "../components/people_search/employee_search_func";
//Packages
import { ScaleLoader } from "react-spinners";
import { uuid } from "uuidv4";
//Dropdowns
const { ClassificationList , StatesList} = require("../util/dropdowns");

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
      classifcations: ClassificationList,
      stateList : StatesList
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
    let { classifcations ,stateList} = this.state;
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
              {stateList.map((state) => {
                        return (
                          <option key={uuid()} value={state}>
                            {" "}
                            {state}
                          </option>
                        );
                      })}
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
              {stateList.map((state) => {
                        return (
                          <option key={uuid()} value={state}>
                            {" "}
                            {state}
                          </option>
                        );
                      })}
            </select>
          </div>
        </div>
      );
    }
  }

  render() {
    let { searchState } = this.state;
    let { authenticated } = this.props.user;
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
              {authenticated ?  null: (
                <Fragment>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </Fragment>
              ) }
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
