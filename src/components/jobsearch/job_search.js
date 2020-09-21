//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import { Contact } from "../../redux/actions/userActions";
//Packages
import dayjs from "dayjs";
import { uuid } from "uuidv4";
const relativeTime = require("dayjs/plugin/relativeTime");

class JobCard extends Component {
  constructor() {
    super();
    this.sendMessageToInbox = this.sendMessageToInbox.bind(this);
    this.state = {
      expanded: false,
    };
  }
  handleCardExpand = (e) => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  };

  sendMessageToInbox = (userId) => {
    console.log(userId);
    console.log(this.props);
    this.props.Contact(userId.userId, userId.handle, this.props.history);
  };

  render() {
    dayjs.extend(relativeTime);
    let { expanded } = this.state;
    let {
      job: {
        job,
        company,
        location,
        salary,
        salaryFreq,
        createdAt,
        tradeClassification,
        workType,
        imageUrl,
        aboutBusiness,
        role,
        skillsExp,
        additionalInfo,
        contactDetails,
        jobSummary,
        userId,
        handle,
      },
    } = this.props;
    location = location.join(" ");
    return (
      <div className="jobSearchCard" key={uuid()}>
        <div className="jobSearchExpandBar">
          {expanded ? (
            <p onClick={this.handleCardExpand}>&minus;</p>
          ) : (
            <p onClick={this.handleCardExpand}>&#43;</p>
          )}
        </div>

        {/* head */}
        <div className="jobSearchHead">
          <img src={imageUrl} className="jobIcon" alt="job search"></img>
          <div className="jobSearchHeadLeftMiddle"></div>

          <div className="jobSearchHeadRight">
            <h2>{job}</h2>

            <h4>{salary}</h4>
            <h4 className="jobSearchWage">{salaryFreq}</h4>
            <h4 className="jobSearchWage">{workType}</h4>

            {/* </Link> */}
            <h4 className="jobSearchHeadLeftJob">{company}</h4>
            <h4 className="jobSearchWage">
              Classification: {tradeClassification}
            </h4>
            <h4 className="jobSearchHeadLeftLocation">{location}</h4>

            <h4 className="jobSearchListed">{dayjs(createdAt).fromNow()}</h4>
          </div>
        </div>

        {expanded ? (
          <div className="jobSearchExpandedBody">
            <h4>About This Business</h4>
            <p>{aboutBusiness}</p>
            <h4>The Role</h4>
            <p>{role}</p>
            <h4>Skills and Experience Required</h4>
            <p>{skillsExp}</p>
            <div className="applyNow">
              <h4>Additional Information</h4>
              <p>{additionalInfo}</p>
            </div>

            <div className="applyRow">
              <div className="contactText">
                <h4>Contact:</h4>
                <p>{contactDetails}</p>
              </div>
            </div>
            <div className="applyNowBtn">
              <button
                id="applyJobButton"
                onClick={() => {
                  this.sendMessageToInbox({
                    userId: userId,
                    handle: handle,
                  });
                }}
              >
                Apply
              </button>
            </div>
          </div>
        ) : (
          <div className="jobSearchExpandedBody">
            <h4>Job Oppurtunity</h4>
            <p>{jobSummary}</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

const mapActionsToProps = {
  Contact,
};

export default connect(mapStateToProps, mapActionsToProps)(JobCard);
