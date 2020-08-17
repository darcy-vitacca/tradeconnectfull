import CreateProfile from "../components/profilecard/create-profile-full";
import "../components/profilecard/profile.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ViewProfile from "../components/profilecard/view-profile-card";
import { uuid } from "uuidv4";


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
    const {
      user: {
        authenticated,
        credentials: { profileCreated },
        profile,
        loading
      },
    } = this.props;
    //TODO: put a spinner in
    //checks if loading then renders profile if it's retrived else if unauthenticated and tries to see the page it will push to login else it will render create profile if you are logged in.
    let profileMarkup = !loading ? (
      authenticated && profile !== "Profile not found"? (
        <ViewProfile/>
      ) : (
        !authenticated ? (this.props.history.push('/login')): (<CreateProfile history={this.props.history} />)
        
      )
    ) : (
      <p>loading</p>
    );
    return (
      <div className="profileBody">
        <div className="profileCard">
          {profileMarkup}
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
