//Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Redux
import {Contact} from "../../redux/actions/userActions"
//Components
import AboutProfile from "../profile/view_profile/about_profile_section";
import ExperienceProfile from "../profile/view_profile/experience_profile_section";
import SkillsProfile from "../profile/view_profile/skills_profile_section";
import ImageCarousel from "../profile/image_carousel/image_carousel";
//Packages
import { uuid } from "uuidv4";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");

class PeopleSearchCard extends Component {
  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      expanded: false,
    };
  }
  handleCardExpand = (e) => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  };
  sendMessage = (userId, handle) => {
    console.log(userId);
    console.log(handle);
    console.log(this.props)
    this.props.Contact(userId, handle, this.props.history)
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
        website,
        workStatus,
        employeeSummary,
        profileImageUrl,
        location,
        userId,
        handle,
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
            <div key={uuid()}>
              <AboutProfile
                profile={this.props.profile}
                expanded={this.state}
              />
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
                  <ImageCarousel
                    bestWork={bestWork}
                    sendMessage={this.sendMessage}
                    userId={userId}
                    handle={handle}
                    key={uuid()}
                    history={this.props.history}
                  />
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


PeopleSearchCard.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

const mapActionsToProps = {
  Contact,
};

export default connect(mapStateToProps, mapActionsToProps)(PeopleSearchCard);