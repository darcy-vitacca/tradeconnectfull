import React from 'react';

function SearchBarPeople() {
  return (
    <div >
        <h1 className="peopleSearchHeader">People Search</h1>
        <div className="peopleSearchBar">
        <form className="peopleSearchBarForm">
        <div className="jobSearchTrade">
                  <label>Name</label>
                  <input
                    type="search"
                    placeholder="Name"
                    className="searchTradeJobs"
                  ></input>
                </div>

                <div className="jobSearchTrade">
                  <label>Trade</label>
                  <input
                    type="search"
                    placeholder="Trade"
                    className="searchTradeJobs"
                  ></input>
                </div>

                 <div className="jobSearchTrade">
                  <label>Location</label>
                  <input
                    type="search"
                    placeholder="Location"
                    className="searchTradeJobs"
                  ></input>
                </div>
                <div className="applyNowBtn">
            <button className="peopleToggleButton">Search</button>
          </div>
        </form>   
        </div>
        
    </div>
  );
}

export default SearchBarPeople;

