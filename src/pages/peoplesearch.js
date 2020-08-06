import React from "react";
import SearchBarPeople from "../components/peoplesearch/people-searchbar-search-card";
import JobSearchCardExp from "../components/peoplesearch/people-searchcard-closed-card";
import "../components/peoplesearch/people-search.css";

// import './profilecard/profile.css';

function JobSearch() {
  return (
    <div className="peopleSearchBody">
      <div className="search">
        <SearchBarPeople />
        <JobSearchCardExp />
  
      </div>
    </div>
  );
}

export default JobSearch;
