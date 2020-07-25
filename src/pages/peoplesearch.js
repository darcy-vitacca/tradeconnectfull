import React from "react";
import SearchBarPeople from "../components/peoplesearch/people-searchbar-search-card";
import JobSearchCardExp from "../components/peoplesearch/people-searchcard-closed-card";
import JobSearchCardMin from "../components/peoplesearch/people-searchcard-expanded-card";
import "../components/peoplesearch/people-search.css";

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
