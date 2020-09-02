//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Components
import JobDashBoardSummary from "../components/jobdashboard/jobdashboard_summary";
//Redux
import {
  jobDashboard,
  pageChangeErrorClear,
} from "../redux/actions/userActions";
//Function
//Packages
import ReactTooltip from "react-tooltip";
import { ScaleLoader } from "react-spinners";
import { uuid } from "uuidv4";
//Dropdowns

class JobDashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  componentWillUnmount() {
    if (this.props.UI.errors !== null) {
      this.props.pageChangeErrorClear();
    }
  }

  componentDidMount() {
    this.props.jobDashboard(this.props.user.credentials.userId);
  }

  render() {
    const {
      UI: { errors },
      user: {
        authenticated,
        credentials: { profileCreated },
        profile,
        loading,
        editing,
      },
    } = this.props;
    let dashBoardMarkup = !loading ? (
      !authenticated ? (
        this.props.history.push("/login")
      ) : !editing ? (
        <div className="dashboardCard">
          <h1 className="jobDashBoardHeader">Job Dashboard</h1>
          <div>
            <div className="jobDashCont">
              <div className="jobDashHead">
                <h2>Active Jobs</h2>
                <Link to="/postjob">
                  <img
                    className="postJobLink"
                    src={require("../images/plusIcon.png")}
                    alt="profile"
                    data-tip="Post A New Job"
                    data-place="left"
                  ></img>
                  <ReactTooltip />
                </Link>
              </div>
              {this.props.jobs !== [] ? (
                this.props.user.jobs.map((jobs) => (
                  <JobDashBoardSummary
                    key={uuid()}
                    jobs={jobs}
                    history={this.props.history}
                  />
                ))
              ) : (
                <h4 className="jobDashError">No Jobs Listed</h4>
              )}
              {errors !== null ? (
                <div className="errorsMessage">{errors.error}</div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        this.props.history.push("/postjob")
      )
    ) : (
      <p>loading</p>
    );

    return <div className="profileBody">{dashBoardMarkup}</div>;
  }
}
JobDashboard.propTypes = {
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
  jobDashboard,
  pageChangeErrorClear
};

export default connect(mapStateToProps, mapActionsToProps)(JobDashboard);
