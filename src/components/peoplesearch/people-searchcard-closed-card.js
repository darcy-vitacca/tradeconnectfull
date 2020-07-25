import React from "react";

function JobSearchCardMin() {
  return (
    <div className="peopleSearchCard">
      <div className="peopleSearchExpandBar">
        <p>&#43;</p>
      </div>
      <div className="peopleSearchHead">
        <div className="peopleSearchHeadLeft">
        <img className="peopleSearchIcon"src={require("../../images/profilephoto.png")} alt="people search"></img>
        </div>

        <div className="peopleSearchHeadRight">
          <h1>Darcy Vitacca</h1>
          <h2>A Grade Electrician</h2>
          <h4 class="peopleSearchHeadRightJob">Prodata Electrical</h4>
          <h4 class="peopleSearchHeadRightLocation">
            Melbourne,Victoria,Australia
          </h4>
        </div>
      </div>

      <div className="peopleSearchExpandedBody">
        <p>
          Learnt from blah blah over the time I did these jobs worked with this
          person and was a high achiever in tafe. The major jobs we did were and
          it was mainly filled between with x and y. Learnt from blah blah over
          the time. Learnt from blah blah over the time.
        </p>
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

export default JobSearchCardMin;
