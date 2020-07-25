import React from "react";

function Home() {
  return (
    <div>
      <h1>TradeConnect</h1>
      <h3>
        Connecting all aspects of trade from employee/ employer/ client (put
        this in a circle like recycling symbol)
      </h3>
      <div>
        <div className="homePageContainer">
          <div className="homePageImage">
            <img
              src={require("../images/a.jpeg")}
              className="homePagePhoto" alt="Home"
            ></img>
          </div>
          <div className="homeCenter">
            <div className="homeSearchText">
              <ul>
                <li>Jobs</li>
                <li>People</li>
                <li>Apprenticeships</li>
              </ul>
            </div>

            <div className="searchInput">
              <input
                type="search"
                placeholder="Enter a Name"
                className="searchPeopleName"
              ></input>
              <input
                type="search"
                placeholder="Trade"
                className="searchPeopleTrade"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
