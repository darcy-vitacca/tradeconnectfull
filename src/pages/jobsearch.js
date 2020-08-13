import React, { Component } from "react";
import { connect } from "react-redux";
import "../components/jobsearch/jobsearch.css";
import JobCard from "../components/jobsearch/searchcard-expanded-card";
import { searchJobs } from "../redux/actions/userActions";
import { jobSearch } from '../components/jobsearch/jobSearchFunc'
// to call the api constantly we list it in our package.json at the end ounder proxy
class JobSearch extends Component {
  state = {
    errors: [],
    jobSearchInput: [
      {
        trade: "",
        state: "",
      },
    ],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  componentDidMount() {}
  handleChange = (e) => {
    let jobSearchInputState = [...this.state.jobSearchInput];
    jobSearchInputState[e.target.dataset.id][e.target.name] = e.target.value;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    jobSearch(this.state, this.props)
    // let searchInput = this.state.jobSearchInput[0];
    // //trade, state search
    // if ((searchInput.trade && searchInput.state) !== "") {
    //   console.log("here1");
    //   const searchReq = {
    //     trade: searchInput.trade,
    //     state: searchInput.state,
    //   };
    //   console.log(searchReq);
    //   this.props.searchJobs(searchReq, this.props.history);
    // }
    // //trade only search
    // else if (searchInput.trade !== "") {
    //   console.log("here2");
    //   console.log(searchInput.trade);
    //   const searchReq = {
    //     trade: searchInput.trade,
    //     state: "",
    //   };
    //   console.log(searchReq);
    //   this.props.searchJobs(searchReq, this.props.history);
    // }

    // // state only search
    // else if (searchInput.state !== "") {
    //   console.log("here3");
    //   console.log(searchInput.state);
    //   const searchReq = {
    //     trade: "",
    //     state: searchInput.state,
    //   };
    //   console.log(searchReq);
    //   this.props.searchJobs(searchReq, this.props.history);
    // //full search
    // } else {
    //   console.log("here4");
    //   const searchReq = {
    //     trade: "",
    //     state: "",
    //   };
    //   console.log(searchReq);
    //   this.props.searchJobs(searchReq, this.props.history);
    // }
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

    return (
      // search bar
      <div className="jobSearchBody">
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
                      name="trade"
                      data-id="0"
                      placeholder="Trade"
                      className="searchTradeJobs"
                    ></input>
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

                <button className="jobToggleButton">Search</button>
              </form>
              {errors !== null ? (
                <div className="errorsMessage">{errors.error}</div>
              ) : null}
            </div>
          </div>
          {recentJobsMarkup}
          {/* body */}
          {/* <div className="jobSearchCard">
            <div className="jobSearchExpandBar">
              <p>&#43;</p>
            </div>

            <div className="jobSearchHead">
              <div className="jobSearchHeadLeft">
                <img
                  src={require("../images/download.jpg")}
                  className="jobIcon"
                  alt="job icon"
                ></img>
                <div className="jobSearchHeadLeftMiddle"></div>
              </div>

              <div className="jobSearchHeadRight">
                <h2>A Grade Electrician</h2>
                <h4 class="jobSearchHeadLeftJob">Prodata Electrical</h4>
                <h4 class="jobSearchHeadLeftLocation">Melbourne,Victoria</h4>
                <h4>$79,000</h4>
                <h4 className="jobSearchWage">Per year</h4>
                <h4 className="jobSearchListed">3d ago</h4>
              </div>
            </div>

            <div className="jobSearchExpandedBody">
              <ul className="jobSearchExpandedKeyPoints">
                <li>Close Team</li>
                <li>Room to grow</li>
                <li>Leaders in the industry</li>
                <li>Flexible working hours</li>
              </ul>
              <p>
                Learnt from blah blah over the time I did these jobs worked with
                this person and was a high achiever in tafe. The major jobs we
                did were and it was mainly filled between with x and y. Learnt
                from blah blah over the time. Learnt from blah blah over the
                time.
              </p>
              <div className="applyNowBtn">
                <button id="applyJobButton">Apply</button>
              </div>
            </div>
          </div> */}
       
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
};

export default connect(mapStateToProps, mapActionsToProps)(JobSearch);
