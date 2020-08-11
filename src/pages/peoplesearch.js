import React, { Component } from "react";
import axios from "axios";
import PeopleSearchCard from "../components/peoplesearch/people-searchcard-closed-card";
import PeopleSearchCard1 from "../components/peoplesearch/people-searchcard-closed-card1";
import "../components/peoplesearch/people-search.css";

// import './profilecard/profile.css';
class JobSearch extends Component {
  state = {
    profiles: null,
  };
  componentDidMount() {
    axios
      .get("/getprofiles")
      .then((res) => {
        console.log(res.data);
        this.setState({
          profiles: res.data,
        });
        console.log(this.state.profiles);
      })
      .catch((err) => console.log(err));
  }
  render() {
    let recentProfileMarkup = this.state.profiles ? (
      this.state.profiles.map((profile) => (
        <PeopleSearchCard key={profile.userId} profile={profile} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <div className="peopleSearchBody">
        <div className="search">
          <div className="peopleSearchBarSection">
            <h1 className="peopleSearchHeader">People Search</h1>
            <div className="peopleSearchBar">
              <form className="peopleSearchBarForm">
                <div className="peopleSearchTop">
                  <div className="peopleSearchTrade">
                    <label>Name</label>
                    <input
                      type="search"
                      placeholder="Name"
                      className="searchTradeJobs"
                    ></input>
                  </div>

                  <div className="peopleSearchTrade">
                    <label>Trade</label>
                    <input
                      type="search"
                      placeholder="Trade"
                      className="searchTradeJobs"
                    ></input>
                  </div>
                  <div className="peopleSearchTrade">
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

                <div className="peopleSearchBottom"></div>
                <div className="applyNowBtn">
                  <button className="peopleToggleButton">Search</button>
                </div>
              </form>
            </div>
          </div>
          {recentProfileMarkup}
          <PeopleSearchCard1 />
        </div>
      </div>
    );
  }
}

export default JobSearch;
