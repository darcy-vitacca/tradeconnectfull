//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/people_search.css";
//Functions
import { employeeSearch } from "../components/employee_search/employee_search_func";
//Redux
import {
  searchEmployee,
  pageChangeErrorClear,
  clearEmployees
} from "../redux/actions/userActions";
//Components
import PeopleSearchCard from "../components/employee_search/employee_search";
//Packages
import { uuid } from "uuidv4";
import { ScaleLoader } from "react-spinners";
//Drop downs
const { ClassificationList, StatesList } = require("../util/dropdowns");

class EmployeeSearch extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      peopleSearchInput: [
        {
          name: "",
          tradeClassification: "",
          state: "",
        },
      ],
      classifcations: ClassificationList,
      stateList: StatesList,
    };
  }
  //
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors !== null) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  componentWillUnmount() {
    if (this.props.UI.errors !== null) {
      this.props.pageChangeErrorClear();
    }
  }

  handleChange = (e) => {
    let peopleSearchInputState = [...this.state.peopleSearchInput];
    peopleSearchInputState[e.target.dataset.id][e.target.name] = e.target.value;
    this.setState({ peopleSearchInput: peopleSearchInputState });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    employeeSearch(this.state, this.props);
  };
  clearSearch = () => {
  
    this.setState({
      errors: [],
      peopleSearchInput: [
        {
          name: "",
          tradeClassification: "",
          state: "",
        },
      ],
    });
    this.props.clearEmployees();
    this.props.pageChangeErrorClear();
  };

  render() {
    let recentProfileMarkup = this.props.data.employees ? (
      this.props.data.employees.map((profile) => (
        <PeopleSearchCard
          key={profile.userId}
          profile={profile}
          history={this.props.history}
        />
      ))
    ) : (
      <p>...loading</p>
    );
    const {
      data: { employees },
      UI: { loading, errors },
    } = this.props;
    let { classifcations, stateList } = this.state;
    let { name, tradeClassification, state } = this.state.peopleSearchInput[0];
    return (
      <div className="peopleSearchBody">
        <div className="search">
          <div className="peopleSearchBarSection">
            <h1 className="peopleSearchHeader">Employee Search</h1>
            <div className="peopleSearchBar ">
              <form
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                className="peopleSearchBarForm"
              >
                <div className="peopleSearchTop">
                  <div className="peopleSearchTrade">
                    <label>Name</label>
                    <input
                      type="search"
                      name="name"
                      value={name}
                      data-id="0"
                      placeholder="Name"
                      className="searchTradeJobs"
                    ></input>
                  </div>

                  <div className="peopleSearchTrade">
                    <label>Trade Classification</label>
                    <select
                      name="tradeClassification"
                      className="searchPeopleBar"
                      data-id="0"
                      value={tradeClassification}
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
                  <div className="peopleSearchTrade">
                    <label>Location</label>
                    <select
                      name="state"
                      data-id="0"
                      className="searchTradeJobs"
                      value={state}
                    >
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
                <div className="errorCont">
                  {errors !== null ? (
                    <div className="errorsMessage">{errors.error}</div>
                  ) : null}
                </div>
               
                <div className="applyNowBtn">
               
              
                  <button className="peopleToggleButton">Search</button>
                  <img
                      className="clearSearchIcon"
                      src={require("../images/deletedash.png")}
                      alt="profile"
                      onClick={this.clearSearch}
                    ></img>{" "}
                
                </div>
              </form>
            </div>
          </div>

          {
            //Display searches or search suggestions
            recentProfileMarkup.length > 0 ? (
              recentProfileMarkup
            ) : this.props.data.loading ? (
              <div></div>
            ) : (
              <div className="SearchSuggestions">
                <div className="suggestionItems">
                  <img
                    src={require("../images/checklist.jpg")}
                    alt="Find the best candidate"
                  ></img>
                  <h4>How to find the best candidate</h4>
                </div>
                <div className="suggestionItems">
                  <img
                    src={require("../images/jobad.jpg")}
                    alt="How to write a job ad"
                  ></img>
                  <h4>How to write a job ad</h4>
                </div>

                <div className="suggestionItems">
                  <img
                    src={require("../images/employeewant.jpg")}
                    alt="Find the best candidate"
                  ></img>
                  <h4>What to look for in an new employee</h4>
                </div>
                <div className="suggestionItems">
                  <img
                    src={require("../images/bestcandidate.jpg")}
                    alt="Find the best candidate"
                  ></img>
                  <h4>How to interview candidates</h4>
                </div>
              </div>
            )
          }
          <div className="spinner">
            {loading === true ? (
              <div>
                {" "}
                <ScaleLoader className="spinner" size={240} loading />{" "}
              </div>
            ) : null}{" "}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

const mapActionsToProps = {
  searchEmployee,
  pageChangeErrorClear,
  clearEmployees
};

export default connect(mapStateToProps, mapActionsToProps)(EmployeeSearch);
