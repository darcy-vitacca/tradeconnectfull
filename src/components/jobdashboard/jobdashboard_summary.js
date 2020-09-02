//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Redux
import { editJob, deleteJob } from "../../redux/actions/userActions";
//Functions
//Packages
import ReactTooltip from "react-tooltip";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");


class JobDashBoardSummary extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }

  render() {
    dayjs.extend(relativeTime);
    dayjs().format();

    let {
      user: { editing, loading },
      jobs: {
        jobId,
        job,
        jobSummary,
        company,
        location,
        state,
        salary,
        salaryFreq,
        role,
        additionalInfo,
        tradeClassificaiton,
        imageUrl,
        workType,
        createdAt,
      },
    } = this.props;

    let { userId } = this.props.user.credentials;
    let { expanded } = this.state;

    return (
      <div className="jobDashCard">
        <div className="jobDashCardUpper">
          <div className="jobDashCardUpperLeft">
            <h4>{job}</h4>
          </div>

          <div className="jobDashCardUpperRight">
            <img
              className="editDeleteIcon"
              src={require("../../images/editdash.png")}
              alt="profile"
              data-tip="Edit Job"
              data-place="bottom"
              onClick={() => {
                if (window.confirm(`Are you sure you want to edit ${job}`))
                  this.props.editJob(jobId, true, this.props.history);
              }}
            ></img>
            <ReactTooltip />

            <img
              className="editDeleteIcon"
              src={require("../../images/deletedash.png")}
              alt="profile"
              data-tip="Delete Job"
              data-place="bottom"
              onClick={() => {
                if (window.confirm(`Are you sure you wish to delete ${job}`))
                  this.props.deleteJob(jobId, userId, this.props.history);
              }}
            ></img>
            <ReactTooltip />
          </div>
        </div>

        <p>Listed {dayjs(createdAt).fromNow()}</p>
        <p>Expiring {dayjs(createdAt).to(dayjs(createdAt).add(30, "days"))}</p>
        <p>View Counts</p>
        <p>Applicants</p>
      </div>
    );
  }
}

JobDashBoardSummary.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  editJob: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

const mapActionsToProps = {
  deleteJob,
  editJob,
};

export default connect(mapStateToProps, mapActionsToProps)(JobDashBoardSummary);
