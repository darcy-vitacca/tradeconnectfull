//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Redux
//Functions
//Packages
import { uuid } from "uuidv4";
import ReactTooltip from "react-tooltip";
import { ScaleLoader } from "react-spinners";

class Help extends Component {
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
        <h1 className="accountHeader">Help</h1>
        <div className="accountCont">
        <h4>How to write a job ad</h4>
        <h4>What to look for in an new employee</h4>
        <h4>How to interview candidates</h4>
        <h4>How to find the best candidate</h4>
        <h4>Looking for job search advice?</h4>
        <h4>Have an interview coming up?</h4>
        <h4>How to imporve your resume/ profile?</h4>
        <h4>Skills/licenses/certifications can you should add?</h4>

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
Help.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(Help);
