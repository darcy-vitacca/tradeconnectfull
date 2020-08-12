import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import PeopleSearchCard from "../components/peoplesearch/people-searchcard-closed-card";
import PeopleSearchCard1 from "../components/peoplesearch/people-searchcard-closed-card1";
import { searchEmployee } from "../redux/actions/userActions";
import "../components/peoplesearch/people-search.css";

// import './profilecard/profile.css';
class JobSearch extends Component {
  state = {
    errors: [],
    peopleSearchInput: [
      {
        name: "",
        trade: "",
        location: "",
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
    let peopleSearchInputState = [...this.state.peopleSearchInput];

    peopleSearchInputState[e.target.dataset.id][e.target.name] = e.target.value;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let fullNameArr;
    //full search
    if (this.state.peopleSearchInput[0].name != "") {
      fullNameArr = this.state.peopleSearchInput[0].name
        .split(" ")
        .reduce((acc, cv) => {
          return acc + " " + cv[0].toUpperCase() + cv.slice(1);
        }, "")
        .trim();
      fullNameArr = fullNameArr.split(" ");
      const searchReq = {
        fullName: fullNameArr,
        trade: this.state.peopleSearchInput[0].trade,
        state: this.state.peopleSearchInput[0].state,
      };
      console.log(searchReq);
      this.props.searchEmployee(searchReq, this.props.history);
      //no name search
    } else {
      const searchReq = {
        trade: this.state.peopleSearchInput[0].trade,
        state: this.state.peopleSearchInput[0].state,
      };
      console.log(searchReq);
      this.props.searchEmployee(searchReq, this.props.history);
    }
  };

  render() {
    let recentProfileMarkup = this.props.data.employees ? (
      this.props.data.employees.map((profile) => (
        <PeopleSearchCard key={profile.userId} profile={profile} />
      ))
    ) : (
      <p>Loading...</p>
    );
    const {
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <div className="peopleSearchBody">
        <div className="search">
          <div className="peopleSearchBarSection">
            <h1 className="peopleSearchHeader">People Search</h1>
            <div className="peopleSearchBar">
              {<p>{errors.error}</p>}
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
                      data-id="0"
                      name="name"
                      placeholder="Name"
                      className="searchTradeJobs"
                    ></input>
                  </div>

                  <div className="peopleSearchTrade">
                    <label>Trade</label>
                    <input
                      type="search"
                      name="trade"
                      data-id="0"
                      placeholder="Trade"
                      className="searchTradeJobs"
                    ></input>
                  </div>
                  <div className="peopleSearchTrade">
                    <label>Location</label>
                    <select
                      name="state"
                      data-id="0"
                      className="searchTradeJobs"
                      required
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

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

const mapActionsToProps = {
  searchEmployee,
};

export default connect(mapStateToProps, mapActionsToProps)(JobSearch);
