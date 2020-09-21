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
            <div className="helpCont">
              <h4>How to write a job ad</h4>
              <p>
                A Guide about how to write a job ad.
              </p>
              <h4>What to look for in an new employee</h4>
              <p>
                What qualities should you look for in an employee.
              </p>
              <h4>How to interview candidates</h4>
              <p>
                A guide on how to conduct yourself in an interview and best practices.
              </p>
              <h4>How to find the best candidate</h4>
              <p>
                Key tips for finding the best candidate for your business.
              </p>
              <h4>Looking for job search advice?</h4>
              <p>
                How to find a job that fits you and what to look for in an employer.
              </p>
              <h4>Have an interview coming up?</h4>
              <p>
                Key interview tips about how to get the job.
              </p>
              <h4>How to imporve your resume/ profile?</h4>
              <p>
                Resume writing tips as well as the ideal resume.
              </p>
              <h4>Skills/licenses/certifications can you should add?</h4>
              <p>
                How to boost your chances of getting a job and what skills employers are looking for.
              </p>
              <img
                    src={require("../images/resume.jpg")}
                    alt="How to write a job ad"
                    className="helpImage"
                  ></img>
                  </div>
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
