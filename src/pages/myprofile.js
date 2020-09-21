//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../css/profile.css";
//Redux
import { editUser } from "../redux/actions/userActions";
//Components
import CreateProfile from "../components/profile/create_profile";
import ViewProfile from "../components/profile/view_profile";

class MyProfile extends Component {
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

  componentWillUnmount() {
    if (this.props.user.editing === true) {
      this.props.editUser(this.props.history, false);
    }
  }

  render() {
    const {
      user: {
        authenticated,
        credentials: { profileCreated },
        profile,
        loading,
        editing,
      },
    } = this.props;

    //checks if loading then renders profile if it's retrived else if unauthenticated and tries to see the page it will push to login else it will render create profile if you are logged in.
    let profileMarkup = !loading ? (
      authenticated && profile !== "Profile not found" ? (
        editing ? (
          <CreateProfile history={this.props.history} />
        ) : (
          <ViewProfile history={this.props.history} />
        )
      ) : !authenticated ? (
        this.props.history.push("/login")
      ) : (
        <CreateProfile history={this.props.history} />
      )
    ) : (
      <p>loading</p>
    );
    return (
      <div className="profileBody">
        <div className="profileCard">{profileMarkup}</div>
      </div>
    );
  }
}
MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

const mapActionsToProps = {
  editUser,
};

export default connect(mapStateToProps, mapActionsToProps)(MyProfile);
