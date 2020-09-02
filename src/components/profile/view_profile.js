//Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Redux
import { deleteUser, editUser } from "../../redux/actions/userActions";
//Functions
//Packages
import ReactTooltip from "react-tooltip";
//Components
import AboutProfile from "./view_profile/about_profile_section";
import ExperienceProfile from "./view_profile/experience_profile_section";
import SkillsProfile from "./view_profile/skills_profile_section";
import ImageCarousel from "./image_carousel/image_carousel";

class ViewProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  renderMarkup() {
    let { profile } = this.props.user;
    let {
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
      location,
    } = this.props.user.profile;
    fullName = fullName.join(" ");
    location = location.join(" ");
    let workStatusDot =
      this.props.user.profile.workStatus ===
      "Not Looking for Work Currently But In the Future"
        ? "dotOrange"
        : this.props.user.profile.workStatus === "Currently Employed"
        ? "dotRed"
        : "dot";

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
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to edit your profile?")
                )
                  this.props.editUser(this.props.history, true);
              }}
            ></img>
            <ReactTooltip />

            <img
              className="editDeleteIcon"
              src={require("../../images/delete.png")}
              alt="profile"
              data-tip="Delete Profile"
              data-place="bottom"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you wish to delete your profile?"
                  )
                )
                  this.props.deleteUser(
                    this.props.user.credentials,
                    this.props.history
                  );
              }}
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
              <span className={workStatusDot}></span>
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
            <ImageCarousel bestWork={bestWork} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    let profileMarkup = this.props.user.profile ? (
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
