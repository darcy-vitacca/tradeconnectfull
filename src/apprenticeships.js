import React from "react";
import ApprenticeshipsSearchBar from "./apprentice_search/searchbar-search-card";
import ApprenticeCardMin from "./apprentice_search/searchcard-closed-card";
import ApprenticeCardExp from "./apprentice_search/searchcard-expanded-card";
import "./apprentice_search/apprenticeshipssearch.css";

// import './profilecard/profile.css';

function ApprenticeJobSearch() {
  return (
    <div className="jobSearchBody">
      <div className="search">
        <ApprenticeshipsSearchBar />
        <ApprenticeCardExp />
        <ApprenticeCardMin />
        <ApprenticeCardExp />
        <ApprenticeCardMin />
        <ApprenticeCardMin />
        <ApprenticeCardMin />
        <ApprenticeCardMin />
      </div>
    </div>
  );
}

export default ApprenticeJobSearch;
