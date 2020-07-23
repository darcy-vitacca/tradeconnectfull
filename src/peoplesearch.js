import React from "react";
import SearchBarPeople from "./peoplesearch/people-searchbar-search-card";
import JobSearchCardExp from "./peoplesearch/people-searchcard-closed-card";
import JobSearchCardMin from "./peoplesearch/people-searchcard-expanded-card";
import "./peoplesearch/people-search.css";

// import './profilecard/profile.css';

function JobSearch() {
  return (
    <div className="peopleSearchBody">
      <div className="search">
        <SearchBarPeople />
        <JobSearchCardMin />
        <JobSearchCardExp />
        <JobSearchCardExp />
        <JobSearchCardExp />
        <JobSearchCardMin />
        <JobSearchCardExp />
        <JobSearchCardExp />
      </div>
    </div>
  );
}

export default JobSearch;
