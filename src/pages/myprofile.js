import CreateProfile from "../components/profilecard/create-profile-full";
import "../components/profilecard/profile.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ViewProfile from "../components/profilecard/view-profile-card";

class MyProfile extends Component {
  //TODO: may need to get rid of this
  constructor() {
    super();
    this.state = {
      errors: {},
      fullName: "",
      profileImageUrl: "",
      recentEmp: "",
      workStatus: "",
      website: "",
      trade: "",
      location: "",
      about: "",
      exp: [
        {
          company: "",
          date: ["", "", "", ""],
          imageUrl: "",
          text: "",
        },
      ],
      licenses: [
        {
          licenses: "",
        },
      ],
      education: [
        {
          education: "",
        },
      ],
      references: [
        {
          references: "",
        },
      ],
      bestWork: [
        {
          header: "",
          imageUrl: "",
          desc: "",
        },
      ],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  render() {
    let { profileCreated } = this.props.user.credentials;
    return(
    <div className="profileBody">
      <div className="profileCard">
        {profileCreated === true ? (
          <ViewProfile />
        ) : (
          <CreateProfile history={this.props.history} />
        )}
      </div>
    </div>
    );
  }
}
MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});


export default connect(mapStateToProps)(MyProfile);
