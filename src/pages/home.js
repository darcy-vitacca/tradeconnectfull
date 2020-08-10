import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchState: true,
    };
  }

  ToggleButton() {
    this.setState((prevState) => ({
      searchState: !prevState.searchState,
    }));
  }
  // TODO: when logged in handle clicking on loggin links or don't show them on the home page
  searchStateInput() {
    if (this.state.searchState === false) {
      return (
        <div className="searchInput">
          <h4 className="searchTypeHome">Employee Search</h4>

          <div className="searchHomeLabels">
            <label>Name</label>
            <input
              type="search"
              placeholder="Name"
              className="searchPeopleName"
            ></input>
          </div>
          <div className="searchHomeLabels">
            <label>Trade</label>
            <input
              type="search"
              placeholder="Trade"
              className="searchPeopleName"
              required
            ></input>
          </div>
          <div className="searchHomeLabels">
            <label>Location</label>
            <select name="state"   className="searchPeopleName" required>
              <option value="" disabled selected hidden>
                State
              </option>
              <option>ACT</option>
              <option>New South Wales</option>
              <option>Northern Territory</option>
              <option>Queensland</option>
              <option>Tasmania</option>
              <option>Victoria</option>
              <option>Western Australia</option>
            </select>

          </div>
        </div>
      );
    } else {
      return (
        <div className="searchInput">
          <h4 className="searchTypeHome">Job Search</h4>

          <div className="searchHomeLabels">
            <label>Trade</label>
            <input
              type="search"
              placeholder="Trade"
              className="searchPeopleName"
              required
            ></input>
          </div>
          <div className="searchHomeLabels">
            <label>Location</label>
            <select name="state"   className="searchPeopleName" required>
              <option value="" disabled selected hidden>
                State
              </option>
              <option>ACT</option>
              <option>New South Wales</option>
              <option>Northern Territory</option>
              <option>Queensland</option>
              <option>Tasmania</option>
              <option>Victoria</option>
              <option>Western Australia</option>
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
                <div>{this.searchStateInput()}</div>
                <button type="submit" className="homeToggleButton">
                  Submit
                </button>
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

export default Home;
