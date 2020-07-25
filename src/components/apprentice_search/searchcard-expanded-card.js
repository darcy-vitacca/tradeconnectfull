import React from "react";

function ApprenticeCardExp() {
  return (
    <div className="apprenticeSearchCard">
      <div className="apprenticeSearchExpandBar">
        <p>&minus;</p>
      </div>
      <div className="apprenticeSearchHead">
        <div className="apprenticeSearchHeadLeft">
          <img
            src={require("../../images/download.jpg")}
            className="apprenticeSearchIcon" alt="apprentice 1 search"
          ></img>
          <div className="apprenticeSearchHeadLeftMiddle">
            <h2>1st Year Electrical Apprentice</h2>
            <h4 class="apprenticeSearchHeadLeftJob">Prodata Electrical</h4>
            <h4 class="apprenticeSearchHeadLeftLocation">
              Melbourne,Victoria,Australia
            </h4>
          </div>
        </div>

        <div className="apprenticeSearchHeadRight">
          <h4>$39,000</h4>
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
          the time I did these jobs worked with this person and was a high
          achiever in tafe.
        </p>
        <p>
          Learnt from blah blah over the time I did these jobs worked with this
          person and was a high achiever in tafe. The major jobs we did were and
          it was mainly filled between with x and y. -Learnt from blah blah over
          the time I did these jobs worked with this person and was a high
          achiever in tafe.
        </p>
        <p>
          Learnt from blah blah over the time I did these jobs worked with this
          person and was a high achiever in tafe. The major jobs we did were and
          it was mainly filled between with x and y. Learnt from blah blah over
          the time I did these jobs worked with this person and was a high
          achiever in tafe.
        </p>
        <p>
          -Learnt from blah blah over the time I did these jobs worked with this
          person and was a high achiever in tafe. The major jobs we did were and
          it was mainly filled between with x and y. Learnt from blah blah over
          the time I did these jobs worked with this person and was a high
          achiever in tafe.
        </p>

        <p>Contact 042330111 or email at vitacca6@hotmail.com</p>
      </div>
    </div>
  );
}

export default ApprenticeCardExp;
