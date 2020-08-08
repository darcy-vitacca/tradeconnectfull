import React, { Component } from "react";
import AboutProfile from "../profilecard/view-profile/about-profile-card";
import ExperienceProfile from "../profilecard/view-profile/experience-profile-card";
import SkillsProfile from "../profilecard/view-profile/skills-profile-card";
import BestWorkProfile from "../profilecard/view-profile/bestwork-profile-card";

import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");


  class PeopleSearchCard extends Component {
 
  render(){
    dayjs.extend(relativeTime);
    const {
      profile: {
      about,
      bestWork,
      createdAt,
      education,
      exp,
      fullName,
      licences,
      recentEmp,
      references,
      trade,
      userId,
      website,
      workStatus,
      },
    } = this.props;
    console.log(this.props)

  return (
   
    
    //Small Card
    <div>
      {/* <div className="peopleSearchCard">
        <div className="peopleSearchExpandBar">
          <p>&#43;</p>
        </div>
        <div className="peopleSearchHead">
          <div className="peopleSearchHeadLeft">
            <img
              className="peopleSearchIcon"
              src={require("../../images/profilephoto.png")}
              alt="people search"
            ></img>
          </div>

          <div className="peopleSearchHeadRight">
            <h2>Darcy Vitacca</h2>
            <h2>A Grade Electrician</h2>
            <h4 className="peopleSearchHeadRightJob">Prodata Electrical</h4>
            <h4 className="peopleSearchHeadRightLocation">Melbourne ,Victoria</h4>
          </div>
        </div>

        <div className="peopleSearchExpandedBody">
          <h4>Experience/About</h4>
          <p>
            Learnt from blah blah over the time I did these jobs worked with
            this person and was a high achiever in tafe. The major jobs we did
            were and it was mainly filled between with x and y. Learnt from blah
            blah over the time. Learnt from blah blah over the time.
          </p>
          <div className="contactPersonBtn">
            <button id="contactPersonButton">Contact</button>
          </div>
        </div>
      </div> */}

      {/* //Big Card */}
      <div className="peopleSearchCard">
      <div className="peopleSearchExpandBar">
          <p>&#43;</p>
        </div>

      
        <AboutProfile profile={this.props.profile} />
        <div className="peopleSearchExpandedBody">
          <h4>Experience</h4>
          <ExperienceProfile exp={exp} />

        
        
            <div className="skillsCard">
            <h4>Licences/Certifications/Tickets</h4>
              <ul className="skillsCardList">
                <SkillsProfile licenses={licences} />
              </ul>
            </div>
        
         
         
            <div className="skillsCard">
            <h4>Education</h4>
              <ul className="skillsCardList">
              <SkillsProfile education={education} />
              </ul>
            </div>
          
          
         
            <div className="skillsCard">
            <h4>References</h4>
              <ul className="skillsCardList">
              <SkillsProfile references={references} />
              </ul>
            </div>

            <div>
        <h4>Best Work</h4>
        <BestWorkProfile bestWork={bestWork}/>
        </div>
        <div className="contactPersonBtn">
            <button id="contactPersonButton">Contact</button>
          </div>
        </div>

       
        
        
      </div>
    </div>
  );
}
}

export default PeopleSearchCard;
