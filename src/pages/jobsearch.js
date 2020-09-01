//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/jobsearch.css";
//Redux
import { searchJobs, pageChangeErrorClear } from "../redux/actions/userActions";
//Functions
import { jobSearch } from "../components/jobsearch/jobSearchFunc";
//Packages
import { uuid } from "uuidv4";
//Components
import JobCard from "../components/jobsearch/job_search";
//Dropdowns
const { ClassificationList, StatesList } = require("../util/dropdowns");

// TODO: if on this page you need to not redirect through user actions can't research need to clear state on redirect
class JobSearch extends Component {
  state = {
    errors: [],
    jobSearchInput: [
      {
        keywords: "",
        tradeClassification: "",
        state: "",
      },
    ],
    classifcations: ClassificationList,
    stateList: StatesList,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  componentWillUnmount() {
    if (this.props.UI.errors !== null) {
      this.props.pageChangeErrorClear();
    }
  }

  handleChange = (e) => {
    let jobSearchInputState = [...this.state.jobSearchInput];
    jobSearchInputState[e.target.dataset.id][e.target.name] = e.target.value;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    jobSearch(this.state, this.props);
  };
  render() {
    let recentJobsMarkup = this.props.data.jobs ? (
      this.props.data.jobs.map((job) => <JobCard key={job.jobId} job={job} />)
    ) : (
      <p>Loading...</p>
    );
    const {
      UI: { loading, errors },
    } = this.props;
    let { classifcations, stateList } = this.state;
    return (
      // search bar
      <div className="jobSearchBody" key={uuid}>
        <div className="search">
          <div className="jobSearchBarSection">
            <h1 className="jobSearchHeader">Job Search</h1>
            <div className="jobSearchBar">
              <form
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                className="searchBarForm"
              >
                <div className="jobSearchInputs">
                  <div className="jobSearchTrade">
                    <label>Trade</label>
                    <input
                      type="search"
                      name="keywords"
                      data-id="0"
                      placeholder="Enter Job Keywords"
                      className="searchTradeJobs"
                    ></input>
                  </div>

                  <div className="jobSearchClassification">
                    <label>Trade Classification</label>
                    <select
                      name="tradeClassification"
                      className="searchTradeJobs"
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

                  <div className="jobSearchLocation">
                    <label>Location</label>
                    <select
                      name="state"
                      className="searchTradeJobs"
                      data-id="0"
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
                <div className="jobSearchBarBottom">
                  <button className="jobToggleButton">Search</button>
                </div>
              </form>
            </div>
          </div>

          {
            //Display searches or search suggestions
            recentJobsMarkup.length > 0 ? (
              recentJobsMarkup
            ) : this.props.data.loading ? (
              <div></div>
            ) : (
              <div className="SearchSuggestions">
                <div className="suggestionItems">
                  <h4>Looking for job search advice?</h4>
                  <img
                    src={require("../images/jobad.jpg")}
                    alt="How to write a job ad"
                  ></img>
                </div>
                <div className="suggestionItems">
                  <h4>Have an interview coming up?</h4>
                  <img
                    src={require("../images/interview.jpg")}
                    alt="How to write a job ad"
                  ></img>
                </div>

                <div className="suggestionItems">
                  <h4>How to imporve your resume/ profile?</h4>
                  <img
                    src={require("../images/resume.jpg")}
                    alt="How to write a job ad"
                  ></img>
                </div>
                <div className="suggestionItems">
                  <h4>Skills/licenses/certifications can you should add?</h4>
                  <img
                    src={require("../images/skills.jpg")}
                    alt="Skills you can add"
                  ></img>
                </div>
              </div>
            )
          }
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
  searchJobs,
  pageChangeErrorClear,
};

export default connect(mapStateToProps, mapActionsToProps)(JobSearch);
