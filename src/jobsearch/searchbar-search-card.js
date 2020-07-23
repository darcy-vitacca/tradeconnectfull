import React from 'react';

function SearchBar() {
  return (
    <div >
        <h1 className="jobSearchHeader">Job Search</h1>
        <div className="jobSearchBar">
        <form className="searchBarForm">
         
                <input type="search" placeholder="Keywords" className ="searchKeywordJobs"></input>
                <input type="search" placeholder="Location" className="searchLocationJobs"></input>
                <button className="searchButtonJobs">Search</button>
            
        </form>   
        </div>
        
    </div>
  );
}

export default SearchBar;

