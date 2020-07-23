import React from "react";

function SearchCardExp() {
  return (
    <div className="jobSearchCard">
      <div className="jobSearchExpandBar">
        <p>&minus;</p>
      </div>
      <div className="jobSearchHead">
        <div className="jobSearchHeadLeft">
          <img
            src={require("../images/download.jpg")}
            className="jobIcon"
          ></img>
          <div className="jobSearchHeadLeftMiddle">
            <h2>A Grade Electrician</h2>
            <h4 class="jobSearchHeadLeftJob">Prodata Electrical</h4>
            <h4 class="jobSearchHeadLeftLocation">
              Melbourne,Victoria
            </h4>
          </div>
        </div>

        <div className="jobSearchHeadRight">
          <h4>$79,000</h4>
          <h4 className="jobSearchWage">Per year</h4>
          <h4 className="jobSearchListed">3d ago</h4>
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
        <p>
          Learnt from blah blah over the time I did these jobs worked with this
          person and was a high achiever in tafe. The major jobs we did were and
          it was mainly filled between with x and y. Learnt from blah blah over
          the time I did these jobs worked with this person and was a high
          achiever in tafe.{" "}
        </p>
        <h4>The Role</h4>
        <p>
          Learnt from blah blah over the time I did these jobs worked with this
          person and was a high achiever in tafe. The major jobs we did were and
          it was mainly filled between with x and y. -Learnt from blah blah over
          the time I did these jobs worked with this person and was a high
          achiever in tafe.{" "}
        </p>
        <h4>Skills and Experience Required</h4>
        <p>
          Learnt from blah blah over the time I did these jobs worked with this
          person and was a high achiever in tafe. The major jobs we did were and
          it was mainly filled between with x and y. Learnt from blah blah over
          the time I did these jobs worked with this person and was a high
          achiever in tafe.{" "}
        </p>
        <h4>Apply Now</h4>
        <p>
          -Learnt from blah blah over the time I did these jobs worked with this
          person and was a high achiever in tafe. The major jobs we did were and
          it was mainly filled between with x and y. Learnt from blah blah over
          the time I did these jobs worked with this person and was a high
          achiever in tafe.{" "}
        </p>
        <div className="applyRow">
            <h2 className="applyButton">Apply</h2>
            <div className="contactText">
              <p>Contact</p>
              <p>042330111 or email at vitacca21@hotmail.com</p>
            </div>   
        </div>   
      </div>
    </div>
  );
}

export default SearchCardExp;
