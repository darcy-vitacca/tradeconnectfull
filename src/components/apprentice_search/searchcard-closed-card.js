import React from "react";

function ApprenticeCardMin() {
  return (
    <div className="apprenticeSearchCard">
      <div className="apprenticeSearchExpandBar">
        <p>&#43;</p>
      </div>
      <div className="apprenticeSearchHead">
        <div className="jobSearchHeadLeft">
          <img src={require("/Users/darcyvitacca/Desktop/VS/react/my-app-3/src/images/download.jpg")}className="apprenticeSearchIcon" alt="apprenticeSearch"></img>
         

          <div className="apprenticeSearchHeadLeftMiddle">
            <h2>2nd Year Electrical Apprentice</h2>
            <h4 class="apprenticeSearchHeadLeftJob">Prodata Electrical</h4>
            <h4 class="apprenticeSearchHeadLeftLocation">
              Melbourne,Victoria,Australia
            </h4>
          </div>
        </div>

        <div className="apprenticeSearchHeadRight">
          <h4>$29,000</h4>
          <h4 className="apprenticeSearchWage">Per year</h4>
          <h4 className="apprenticeSearchListed">3d ago</h4>
        </div>
      </div>

      <div className="apprenticeSearchExpandedBody">
        <ul className="apprenticeSearchExpandedKeyPoints">
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

export default ApprenticeCardMin;
