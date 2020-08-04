import React from "react";

function SearchCardMin() {
  return (
    <div className="jobSearchCard">
      <div className="jobSearchExpandBar">
        <p>&#43;</p>
      </div>

     
      <div className="jobSearchHead">
        <div className="jobSearchHeadLeft">
          <img
            src={require("../../images/download.jpg")}
            className="jobIcon"alt="job icon"
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
        <p>
          Learnt from blah blah over the time I did these jobs worked with this
          person and was a high achiever in tafe. The major jobs we did were and
          it was mainly filled between with x and y. Learnt from blah blah over
          the time. Learnt from blah blah over the time.
        </p>
      </div>
    </div>
  );
}

export default SearchCardMin;
