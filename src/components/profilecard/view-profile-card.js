import React, { Component } from "react";
import AboutProfile from "./view-profile/about-profile-card";
import ExperienceProfile from "./view-profile/experience-profile-card";
import SkillsProfile from "./view-profile/skills-profile-card";
import BestWorkProfile from "./view-profile/bestwork-profile-card";
import PropTypes from 'prop-types'

import axios from "axios";
import { connect } from "react-redux";

class ViewProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  componentDidMount() {
    axios
      .get(`/getprofile/${this.props.user.credentials.userId}`)
      .then((res) => {
        this.setState({
          profile: res.data.profileData,
        });
      })
      .catch((err) => console.log(err));
  }

  renderMarkup() {
    let { profile } = this.state;
    return (
      <div>
        <h1 className="myProfileHeader">Your Profile</h1>
        <div className="myProfileCont">
          <AboutProfile profile={profile} />
          <div className="expProfileBody">
            <h4>Experience</h4>
            <ExperienceProfile exp={profile.exp} />
            <h4>Licences/Certifications</h4>
            <div>
              <div className="expCard">
                <ul>
                  <SkillsProfile licenses={profile.licences} />
                </ul>
              </div>
            </div>
            <h4>Education</h4>
            <div>
              <div className="expCard">
                <ul>
                  <SkillsProfile education={profile.education} />
                </ul>
              </div>
            </div>
            <h4>References</h4>
            <div>
              <div className="expCard">
                <ul>
                  <SkillsProfile references={profile.references} />
                </ul>
              </div>
            </div>
          </div>
          <div className="bestWorkCont">
            <h4>Best Work</h4>
            <BestWorkProfile bestWork={profile.bestWork} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    let profileMarkup = this.state.profile ? (
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
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

export default connect(mapStateToProps)(ViewProfile);

//TODO:
//NEED TO CHANGE A THE DB TO HAVE CREATED A PROFILE AFTER CREATED ONE
//THEN CHECK IF THEY ARE AUTHENTICATED WHEN PRESSING MY PROFILE AND READ THERE ID AND GO TO IT IF SO AND IF NOT GO TO THE CREATE A PROFILE
