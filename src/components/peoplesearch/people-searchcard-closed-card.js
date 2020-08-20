import React, { Component } from "react";
import AboutProfile from "../profilecard/view-profile/about-profile-card";
import ExperienceProfile from "../profilecard/view-profile/experience-profile-card";
import SkillsProfile from "../profilecard/view-profile/skills-profile-card";
import BestWorkProfile from "../profilecard/view-profile/bestwork-profile-card";

import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");

class PeopleSearchCard extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }
  handleCardExpand = (e) => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  };

  render() {
    dayjs.extend(relativeTime);
    let {
      profile: {
        about,
        bestWork,
        createdAt,
        education,
        exp,
        fullName,
        licences,
        recentEmp,
        references,
        trade,
        userId,
        website,
        workStatus,
        employeeSummary,
        profileImageUrl,
        location
      },
    } = this.props;
    fullName = fullName.join(" ");
    location = location.join(" ");
    
    
    let { expanded } = this.state;

    return (
     
      <div>


        <div className="peopleSearchCard">
          <div className="peopleSearchExpandBar">
            {expanded ? (
              <p onClick={this.handleCardExpand}>&minus;</p>
            ) : (
              <p onClick={this.handleCardExpand}>&#43;</p>
            )}
          </div>
          <div className="peopleSearchHead">
        <div className="peopleSearchHeadLeft">
          <img
            className="peopleSearchIcon"
            src={profileImageUrl}
            alt="profile"
          ></img>
        </div>

        <div className="peopleSearchHeadRight">
          <h2>{fullName}</h2>
          <h2>{trade}</h2>
          <h4 className="peopleSearchHeadRightLocation">{location}</h4>
          <h4 className="peopleSearchHeadRightWebiste">{website}</h4>
          <h4 className="peopleSearchHeadRightJob">{recentEmp}</h4>

          <h4 className="peopleSearchHeadRightLocation">{workStatus}</h4>
          <span className="dot"></span>
        </div>
      </div>
        
          {expanded ? (
            <div>

          <AboutProfile profile={this.props.profile} expanded={this.state}/>
            <div className="peopleSearchExpandedBody">
              <h4>Experience</h4>
              <ExperienceProfile exp={exp} />

              <div className="skillsCard">
                <h4>Licences/Certifications/Tickets</h4>
                <ul className="skillsCardList">
                  <SkillsProfile licenses={licences} />
                </ul>
              </div>

              <div className="skillsCard">
                <h4>Education</h4>
                <ul className="skillsCardList">
                  <SkillsProfile education={education} />
                </ul>
              </div>

              <div className="skillsCard">
                <h4>References</h4>
                <ul className="skillsCardList">
                  <SkillsProfile references={references} />
                </ul>
              </div>

              <div>
                <h4>Best Work</h4>
                <BestWorkProfile bestWork={bestWork} />
              </div>
              <div className="contactPersonBtn">
                <button id="contactPersonButton">Contact</button>
              </div>
            </div>
       
        </div>
        ) : (
          <div className="jobSearchExpandedBody">
            <h4>Profile Summary</h4>
            <p>{employeeSummary}</p>
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default PeopleSearchCard;
