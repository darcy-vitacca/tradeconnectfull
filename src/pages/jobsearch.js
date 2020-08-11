import React, { Component } from "react";
import "../components/jobsearch/jobsearch.css";
import axios from "axios";
import JobCard from "../components/jobsearch/searchcard-expanded-card";

// to call the api constantly we list it in our package.json at the end ounder proxy
class JobSearch extends Component {
  state = {
    jobs: null,
  };
  componentDidMount() {
    axios
      .get("/getjobs")
      .then((res) => {
        // console.log(res.data)
        this.setState({
          jobs: res.data,
        });
        console.log(this.state.jobs);
      })
      .catch((err) => console.log(err));
  }
  render() {
    let recentJobsMarkup = this.state.jobs ? (
      this.state.jobs.map((job) => <JobCard key={job.jobId} job={job} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      // search bar
      <div className="jobSearchBody">
        <div className="search">
          <div className="jobSearchBarSection">
            <h1 className="jobSearchHeader">Job Search</h1>
            <div className="jobSearchBar">
              <form className="searchBarForm">
                <div className="jobSearchInputs">
                  <div className="jobSearchTrade">
                    <label>Trade</label>
                    <input
                      type="search"
                      placeholder="Trade"
                      className="searchTradeJobs"
                    ></input>
                  </div>

                  <div className="jobSearchLocation">
                    <label>Location</label>
                    <select name="state" className="searchTradeJobs" required>
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
            </div>
          </div>
          {/* body */}
          <div className="jobSearchCard">
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
          </div>
          {recentJobsMarkup}
        </div>
      </div>
    );
  }
}

export default JobSearch;
