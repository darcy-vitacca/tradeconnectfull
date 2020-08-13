import React, { Component } from "react";
import { connect } from "react-redux";
import PeopleSearchCard from "../components/peoplesearch/people-searchcard-closed-card";
import PeopleSearchCard1 from "../components/peoplesearch/people-searchcard-closed-card1";
import { searchEmployee } from "../redux/actions/userActions";
import "../components/peoplesearch/people-search.css";
import { employeeSearch } from '../components/peoplesearch/employeeSearchFunc'

// import './profilecard/profile.css';
class EmployeeSearch extends Component {
  state = {
    errors: [],
    peopleSearchInput: [
      {
        name: "",
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
    let peopleSearchInputState = [...this.state.peopleSearchInput];
    peopleSearchInputState[e.target.dataset.id][e.target.name] = e.target.value;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //TODO:SAVE THIS OLD SEARCH SOMEWHERE
    employeeSearch(this.state, this.props)
    // let fullNameArr;
    // let searchInput = this.state.peopleSearchInput[0]
    // //name validator
    // let nameCaps = () => {
    //   fullNameArr = searchInput.name
    //     .split(" ")
    //     .reduce((acc, cv) => {
    //       return acc + " " + cv[0].toUpperCase() + cv.slice(1);
    //     }, "")
    //     .trim();
    //   fullNameArr = fullNameArr.split(" ");
    //   return fullNameArr;
    // };

    // //name, state, people search
    // if (
    //   (searchInput.name &&
    //     searchInput.trade &&
    //     searchInput.state) !== ""
    // ) {
    //   console.log("here1");

    //   const searchReq = {
    //     fullName: nameCaps(),
    //     trade: searchInput.trade,
    //     state: searchInput.state,
    //   };
    //   console.log(searchReq);
    //   this.props.searchEmployee(searchReq, this.props.history);
    //   //trade, state, no name search
    // } else if (
    //   (searchInput.trade &&
    //     searchInput.state) !== ""
    // ) {
    //   console.log("here2");
    //   const searchReq = {
    //     fullName: "",
    //     trade: searchInput.trade,
    //     state: searchInput.state,
    //   };
    //   console.log(searchReq);
    //   this.props.searchEmployee(searchReq, this.props.history);
    // }
    // //name, state, no trade search
    // else if (
    //   (searchInput.name &&
    //     searchInput.state) !== ""
    // ) {
    //   console.log("here3");
    //   const searchReq = {
    //     fullName: nameCaps(),
    //     trade: "",
    //     state: searchInput.state,
    //   };
    //   console.log(searchReq);
    //   this.props.searchEmployee(searchReq, this.props.history);
    // }
    // //trade, name , no start search
    // else if (
    //   (searchInput.trade &&
    //     searchInput.name) !== ""
    // ) {
    //   console.log("here4");
    //   const searchReq = {
    //     fullName: nameCaps(),
    //     trade: searchInput.trade,
    //     state: "",
    //   };
    //   console.log(searchReq);
    //   this.props.searchEmployee(searchReq, this.props.history);
    // }

    // //name onle search
    // else if (searchInput.name !== "") {
    //   console.log("here6");
    //   console.log(searchInput.state);
    //   const searchReq = {
    //     fullName: nameCaps(),
    //     trade: "",
    //     state: "",
    //   };
    //   console.log(searchReq);
    //   this.props.searchEmployee(searchReq, this.props.history);
    // }
    // //trade only search
    // else if (searchInput.trade !== "") {
    //   console.log("here5");
    //   console.log(searchInput.trade);
    //   const searchReq = {
    //     fullName: "",
    //     trade: searchInput.trade,
    //     state: "",
    //   };
    //   console.log(searchReq);
    //   this.props.searchEmployee(searchReq, this.props.history);
    // }

    // // state only search
    // else if (searchInput.state !== "") {
    //   console.log("here7");
    //   console.log(searchInput.state);
    //   const searchReq = {
    //     fullName: "",
    //     trade: "",
    //     state: searchInput.state,
    //   };
    //   console.log(searchReq);
    //   this.props.searchEmployee(searchReq, this.props.history);
    // //empty search
    // } else {
    //   console.log("here8");
    //   const searchReq = {
    //     fullName: "",
    //     trade: "",
    //     state: "",
    //   };
    //   console.log(searchReq);
    //   this.props.searchEmployee(searchReq, this.props.history);
    // }
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
      UI: { loading ,errors},
    } = this.props;

    return (
      <div className="peopleSearchBody">
        <div className="search">
          <div className="peopleSearchBarSection">
            <h1 className="peopleSearchHeader">People Search</h1>
            <div className="peopleSearchBar">
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
                {errors !== null ? <div className="errorsMessage">{errors.error}</div> : null}
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

export default connect(mapStateToProps, mapActionsToProps)(EmployeeSearch);
