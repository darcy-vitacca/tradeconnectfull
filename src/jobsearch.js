import React from "react";
import SearchBar from "./jobsearch/searchbar-search-card";
import SearchCardMin from "./jobsearch/searchcard-closed-card";
import SearchCardExp from "./jobsearch/searchcard-expanded-card";
import "./jobsearch/jobsearch.css";

// import './profilecard/profile.css';

function JobSearch() {
  return (
    <div className="jobSearchBody">
      <div className="search">
        <SearchBar />
        <SearchCardExp />
        <SearchCardMin />
        <SearchCardMin />
        <SearchCardExp />
        <SearchCardMin />
      </div>
    </div>
  );
}

export default JobSearch;
