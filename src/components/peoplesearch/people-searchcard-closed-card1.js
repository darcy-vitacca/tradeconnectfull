import React, { Component } from "react";

  class PeopleSearchCard extends Component {
 
  render(){


  return (
    //Small Card
    <div>
      <div className="peopleSearchCard">
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
            <h2 >Darcy Vitacca</h2>
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
      </div>

      {/* //Big Card */}
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
            <h4 class="peopleSearchHeadRightJob">Prodata Electrical</h4>
            <h4 class="peopleSearchHeadRightLocation">Melbourne ,Victoria</h4>
          </div>
        </div>

        <div className="peopleSearchExpandedBody">
        <AboutProfile profile={profile} />
        <div className="exp-profile-card-row">
          <h1>Experience</h1>
          <ExperienceProfile exp={profile.exp} />
          <h1>Licences/Certifications</h1>
          <div>
            <div className="expCard">
              <ul>
                <SkillsProfile licenses={profile.licences} />
              </ul>
            </div>
          </div>
          <h1>Education</h1>
          <div>
            <div className="expCard">
              <ul>
              <SkillsProfile education={profile.education} />
              </ul>
            </div>
          </div>
          <h1>References</h1>
          <div>
            <div className="expCard">
              <ul>
              <SkillsProfile references={profile.references} />
              </ul>
            </div>
          </div>
        </div>
          <div className="contactPersonBtn">
            <button id="contactPersonButton">Contact</button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
}

export default PeopleSearchCard;
