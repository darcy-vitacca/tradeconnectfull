import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchEmployee, sears } from "../redux/actions/userActions";
import { ScaleLoader } from "react-spinners";
import PropTypes from 'prop-types'
import { employeeSearch } from '../components/peoplesearch/employeeSearchFunc'
import { jobSearch } from '../components/jobsearch/jobSearchFunc'
import { searchJobs } from "../redux/actions/userActions";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchState: true,
      jobSearchInput: [
        {
          trade: "",
          state: "",
        },
      ],
      peopleSearchInput: [
        {
          name: "",
          trade: "",
          state: "",
        },
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
            trade: "",
            state: "",
          },
        ],
        peopleSearchInput: [
          {
            name: "",
            trade: "",
            state: "",
          },
        ],
      }));
    } else if (this.state.searchState === true) {
      this.setState((prevState) => ({
        searchState: !prevState.searchState,
        jobSearchInput: [
          {
            trade: "",
            state: "",
          },
        ],
        peopleSearchInput: [
          {
            name: "",
            trade: "",
            state: "",
          },
        ],
      }));
    }
  }
  //TODO:
  //Create a function that handles the search then redirects to the appropriate page
  // Set state to which input it is then make an axios request and a redirect to the search containing only those

  //Send request to Job Search
  //Send request to People search

  //In the backend search location for VIC etc. then return all the matches back including ones that are just suburbs
  //maybe make a click required only for the location to filter out bad data.

  handleChange = (e) => {

    if (this.state.searchState === false) {
      let peopleSearchInputState = [...this.state.peopleSearchInput];
      peopleSearchInputState[e.target.dataset.id][e.target.name] =
        e.target.value;
      // console.log(peopleSearchInputState[0]);
    } else if (this.state.searchState === true) {
      let jobSearchInputState = [...this.state.jobSearchInput];
      jobSearchInputState[e.target.dataset.id][e.target.name] = e.target.value;
      // console.log(jobSearchInputState[0]);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    //handle employee search
    if (this.state.searchState === false) {
      employeeSearch(this.state, this.props)
      // if (this.state.peopleSearchInput[0].name !== "") {
      //   fullNameArr = this.state.peopleSearchInput[0].name
      //     .split(" ")
      //     .reduce((acc, cv) => {
      //       return acc + " " + cv[0].toUpperCase() + cv.slice(1);
      //     }, "")
      //     .trim();
      //   fullNameArr = fullNameArr.split(" ");
      //   console.log("here");
      //   const searchReq = {
      //     fullName: fullNameArr,
      //     trade: this.state.peopleSearchInput[0].trade,
      //     state: this.state.peopleSearchInput[0].state,
      //   };
      //   console.log(searchReq);
      //   this.props.searchEmployee(searchReq, this.props.history);
      // } else {
      //   const searchReq = {
      //     trade: this.state.peopleSearchInput[0].trade,
      //     state: this.state.peopleSearchInput[0].state,
      //   };
      //   console.log(searchReq);
      //   this.props.searchEmployee(searchReq, this.props.history);
      // }

      //handle job searchTODO:
    } else if (this.state.searchState === true) {
      jobSearch(this.state, this.props)

    }
     
  };

  // TODO: when logged in handle clicking on loggin links or don't show them on the home page
  //Alternating Search Btn Render
  searchStateInput() {
    if (this.state.searchState === false) {
      //EMPLOYEE SEARCH
      return (
        <div className="searchInput">
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
            <label>Trade *</label>
            <input
              type="search"
              data-id="0"
              placeholder="Trade"
              name="trade"
              className="searchPeopleName"
      
            ></input>
          </div>
          <div className="searchHomeLabels">
            <label>Location *</label>
            <select
              name="state"
              className="searchPeopleName"
              data-id="0"
             
            >
              <option value=""disabled selected hidden>
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
      //JOBSEARCH
      return (
        <div className="searchInput">
          <h4 className="searchTypeHome">Job Search</h4>

          <div className="searchHomeLabels">
            <label>Trade *</label>
            <input
              type="search"
              data-id="0"
              placeholder="Trade"
              className="searchPeopleName"
              name="trade"
              
            ></input>
          </div>
          <div className="searchHomeLabels">
            <label>Location *</label>
            <select
              name="state"
              className="searchPeopleName"
              data-id="0"
             
            >
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
          {/* TODO: maybe add back in? */}
          {/* <img
            src={require("../images/a.jpeg")}
            className="homePagePhoto"
            alt="Home"
          ></img> */}

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
                    Submit
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
  searchJobs
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
