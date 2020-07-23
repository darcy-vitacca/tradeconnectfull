import React from 'react';

function SearchBarPeople() {
  return (
    <div >
        <h1 className="peopleSearchHeader">People Search</h1>
        <div className="peopleSearchBar">
        <form className="peopleSearchBarForm">
         
                <input type="search" placeholder="Enter a Name" className ="searchPeopleName"></input>
                <input type="search" placeholder="Trade" className ="searchPeopleTrade"></input>
                <input type="search" placeholder="Location" className="searchLocationPeople"></input>
                <button className="searchButtonPeople">Search</button>
            
        </form>   
        </div>
        
    </div>
  );
}

export default SearchBarPeople;

