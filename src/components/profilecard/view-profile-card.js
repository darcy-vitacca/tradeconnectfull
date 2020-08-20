import React, { Component } from "react";
import AboutProfile from "./view-profile/about-profile-card";
import ExperienceProfile from "./view-profile/experience-profile-card";
import SkillsProfile from "./view-profile/skills-profile-card";
import BestWorkProfile from "./view-profile/bestwork-profile-card";
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip';
import {deleteUser, editUser} from "../../redux/actions/userActions"

import axios from "axios";
import { connect } from "react-redux";

class ViewProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: null,
    };
  }
//  TODO: CREATE PROFILE BUG
//TODO: edit profile 
//TODO: delete profile
  componentWillReceiveProps(nextProps) {
   
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
 

  renderMarkup() {
    let { profile } = this.props.user;
    let {  about,
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
      location } = this.props.user.profile;
      fullName = fullName.join(" ");
      location = location.join(" ");
    return (
      <div>
        <div className="profileIcons">
        <h1 className="myProfileHeader">Your Profile</h1>
        <div>
      
            <img
            className="editDeleteIcon"
            src={require("../../images/edit.png")}
            alt="profile"
            data-tip="Edit Profile"
            data-place="bottom"
            onClick={() => { if (window.confirm('Are you sure you want to edit your profile?')) this.props.editUser(this.props.history, true) } }
          ></img>
          <ReactTooltip />
     
            <img
            className="editDeleteIcon"
            src={require("../../images/delete.png")}
            alt="profile"
            data-tip="Delete Profile"
            data-place="bottom"
            onClick={() => { if (window.confirm('Are you sure you wish to delete your profile?')) this.props.deleteUser(this.props.user.credentials , this.props.history )} }
          ></img>
          <ReactTooltip />
        

        </div>
      </div>
       
        <div className="myProfileCont">
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
          <AboutProfile profile={profile} />
          <div className="expProfileBody">
            <h4>Experience</h4>
            <ExperienceProfile exp={exp} />
            <h4>Licences/Certifications</h4>
            <div>
              <div className="expCard">
                <ul>
                  <SkillsProfile licenses={licences} />
                </ul>
              </div>
            </div>
            <h4>Education</h4>
            <div>
              <div className="expCard">
                <ul>
                  <SkillsProfile education={education} />
                </ul>
              </div>
            </div>
            <h4>References</h4>
            <div>
              <div className="expCard">
                <ul>
                  <SkillsProfile references={references} />
                </ul>
              </div>
            </div>
          </div>
          <div className="bestWorkCont">
            <h4>Best Work</h4>
            <BestWorkProfile bestWork={bestWork} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    let profileMarkup = this.props.user.profile  ? (
      this.renderMarkup()
    ) : (
      <p>Loading...</p>
    );
    return <div className="pageBody">{profileMarkup}</div>;
  }
}

ViewProfile.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});


const mapActionsToProps = {
  deleteUser,
  editUser,
};



export default connect(mapStateToProps, mapActionsToProps)(ViewProfile);

//TODO:
//NEED TO CHANGE A THE DB TO HAVE CREATED A PROFILE AFTER CREATED ONE
//THEN CHECK IF THEY ARE AUTHENTICATED WHEN PRESSING MY PROFILE AND READ THERE ID AND GO TO IT IF SO AND IF NOT GO TO THE CREATE A PROFILE
