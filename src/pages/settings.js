//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../css/inbox_settings_help.css";
//Packages
import ReactTooltip from "react-tooltip";
import { ScaleLoader } from "react-spinners";
import { uuid } from "uuidv4";

class Settings extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  componentDidMount() {}

  render() {
    let {
      UI: { loading },
      user: { authenticated },
    } = this.props;
    let helpMarkup = !loading ? (
      !authenticated ? (
        this.props.history.push("/login")
      ) : (
        <div className="profileBody">
          <div className="accountContainer">
            <h1 className="accountHeader">Settings</h1>
            <div className="accountCont">
              <h4>Edit Account Details</h4>
              <h4>Change Password</h4>
              <h4>Delete Account</h4>
            </div>
          </div>
        </div>
      )
    ) : (
      <p>...loading</p>
    );
    return <div>{helpMarkup}</div>;
  }
}
Settings.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Settings);
