import React, { Component } from "react";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");

//TODO: the search bars are slightly different on the job/people search
//the data that you are calling on is passed in the props from higher order down like all job details
class JobCard extends Component {
  render() {
    dayjs.extend(relativeTime);
    // we can destructure the api call within here
    let {
      job: {
        job,
        company,
        location,
        salary,
        salaryFreq,
        aboutBusiness,
        role,
        skillsExp,
        applyNow,
        contactDetails,
        createdAt,
        // handle,
        imageUrl,
      },
    } = this.props;
   
    location = location.join(" ");
    return (
      <div className="jobSearchCard">
        <div className="jobSearchExpandBar">
          <p>&minus;</p>
        </div>

        {/* head */}
        <div className="jobSearchHead">
          
            <img src={imageUrl} className="jobIcon" alt="job search"></img>
            <div className="jobSearchHeadLeftMiddle">
             
            </div>
         

          <div className="jobSearchHeadRight">
             {/* TODO:might need to change this */}
              {/* <Link to={`/users/${handle}`} > */}
              <h2>{job}</h2>
              {/* </Link> */}
              <h4 className="jobSearchHeadLeftJob">{company}</h4>
              <h4 className="jobSearchHeadLeftLocation">{location}</h4>
            <h4>{salary}</h4>
            <h4 className="jobSearchWage">{salaryFreq}</h4>
            <h4 className="jobSearchListed">{dayjs(createdAt).fromNow()}</h4>
          </div>
        </div>
        
        {/* body */}
        <div className="jobSearchExpandedBody">
          {/* TODO: add key points to attract the right applicant easily */}
          <ul className="jobSearchExpandedKeyPoints">
            <li>Close Team</li>
            <li>Room to grow</li>
            <li>Leaders in the industry</li>
            <li>Flexible working hours</li>
          </ul>
          <h4>About This Business</h4>
          <p>{aboutBusiness}</p>
          <h4>The Role</h4>
          <p>{role}</p>
          <h4>Skills and Experience Required</h4>
          <p>{skillsExp}</p>
          <div className="applyNow">
            <h4>Apply Now</h4>
            <p>{applyNow}</p>
          </div>

          <div className="applyRow">
            <div className="contactText">
              <h4>Contact:</h4>
              <p>{contactDetails}</p>
            </div>
          </div>
          <div className="applyNowBtn">
            <button id="applyJobButton">Apply</button>
          </div>
        </div>
      </div>
    );
  }
}

export default JobCard;

