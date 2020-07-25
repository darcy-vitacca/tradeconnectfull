import React from 'react';

function ApprenticeshipsSearchBar() {
  return (
    <div >
        <h1 className="apprenticeSearchHeader">Apprenticeships Search</h1>
        <div className="apprenticeSearchBar">
        <form className="searchBarForm">
         
                <input type="search" placeholder="Keywords" className ="searchKeywordApprentice"></input>
                <input type="search" placeholder="Location" className="searchLocationApprentice"></input>
                <button className="searchButtonApprenticeships">Search</button>
            
        </form>   
        </div>
        
    </div>
  );
}

export default ApprenticeshipsSearchBar;

