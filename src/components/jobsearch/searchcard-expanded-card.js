import React, { Component } from 'react'
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime')



//the data that you are calling on is passed in the props from higher order down like all job details
class JobCard extends Component {
  render() {
    dayjs.extend(relativeTime)
    // we can destructure the api call within here 
    const { job : {job, company, location, salary, salaryFreq, aboutBusiness, role, skillsExp, applyNow, contactDetails, createdAt, handle, imageUrl}}= this.props
   
    return (
      <div className="jobSearchCard">
      <div className="jobSearchExpandBar">
        <p>&minus;</p>
      </div>
      <div className="jobSearchHead">
        <div className="jobSearchHeadLeft">
          <img
            src={imageUrl}
            className="jobIcon" alt="job search"
          ></img>
          <div className="jobSearchHeadLeftMiddle">
          {/* might need to change this */}
            <Link to={`/users/${handle}`} ><h2>{job}</h2></Link>
            <h4 className="jobSearchHeadLeftJob">{company}</h4>
            <h4 className="jobSearchHeadLeftLocation">
              {location}
            </h4>
          </div>
        </div>

        <div className="jobSearchHeadRight">
          <h4>{salary}</h4>
          <h4 className="jobSearchWage">{salaryFreq}</h4>
          <h4 className="jobSearchListed">{dayjs(createdAt).fromNow()}</h4>
        </div>
      </div>

      <div className="jobSearchExpandedBody">
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
        <h4>Apply Now</h4>
        <p>{applyNow}</p>
        <div className="applyRow">
            <h2 className="applyButton">Apply</h2>
            <div className="contactText">
              <p>Contact</p>
              <p>{contactDetails}</p>
            </div>   
        </div>   
      </div>
    </div>
    )
  }
}

export default JobCard


















// function SearchCardExp() {
//   return (
    // <div className="jobSearchCard">
    //   <div className="jobSearchExpandBar">
    //     <p>&minus;</p>
    //   </div>
    //   <div className="jobSearchHead">
    //     <div className="jobSearchHeadLeft">
    //       <img
    //         src={require("../../images/download.jpg")}
    //         className="jobIcon" alt="job search"
    //       ></img>
    //       <div className="jobSearchHeadLeftMiddle">
    //         <h2>A Grade Electrician</h2>
    //         <h4 class="jobSearchHeadLeftJob">Prodata Electrical</h4>
    //         <h4 class="jobSearchHeadLeftLocation">
    //           Melbourne,Victoria
    //         </h4>
    //       </div>
    //     </div>

    //     <div className="jobSearchHeadRight">
    //       <h4>$79,000</h4>
    //       <h4 className="jobSearchWage">Per year</h4>
    //       <h4 className="jobSearchListed">3d ago</h4>
    //     </div>
    //   </div>

    //   <div className="jobSearchExpandedBody">
    //     <ul className="jobSearchExpandedKeyPoints">
    //       <li>Close Team</li>
    //       <li>Room to grow</li>
    //       <li>Leaders in the industry</li>
    //       <li>Flexible working hours</li>
    //     </ul>
    //     <h4>About This Business</h4>
    //     <p>
    //       Learnt from blah blah over the time I did these jobs worked with this
    //       person and was a high achiever in tafe. The major jobs we did were and
    //       it was mainly filled between with x and y. Learnt from blah blah over
    //       the time I did these jobs worked with this person and was a high
    //       achiever in tafe.{" "}
    //     </p>
    //     <h4>The Role</h4>
    //     <p>
    //       Learnt from blah blah over the time I did these jobs worked with this
    //       person and was a high achiever in tafe. The major jobs we did were and
    //       it was mainly filled between with x and y. -Learnt from blah blah over
    //       the time I did these jobs worked with this person and was a high
    //       achiever in tafe.{" "}
    //     </p>
    //     <h4>Skills and Experience Required</h4>
    //     <p>
    //       Learnt from blah blah over the time I did these jobs worked with this
    //       person and was a high achiever in tafe. The major jobs we did were and
    //       it was mainly filled between with x and y. Learnt from blah blah over
    //       the time I did these jobs worked with this person and was a high
    //       achiever in tafe.{" "}
    //     </p>
    //     <h4>Apply Now</h4>
    //     <p>
    //       -Learnt from blah blah over the time I did these jobs worked with this
    //       person and was a high achiever in tafe. The major jobs we did were and
    //       it was mainly filled between with x and y. Learnt from blah blah over
    //       the time I did these jobs worked with this person and was a high
    //       achiever in tafe.{" "}
    //     </p>
    //     <div className="applyRow">
    //         <h2 className="applyButton">Apply</h2>
    //         <div className="contactText">
    //           <p>Contact</p>
    //           <p>042330111 or email at vitacca21@hotmail.com</p>
    //         </div>   
    //     </div>   
    //   </div>
    // </div>
//   );
// }

// export default SearchCardExp;
