import React from "react";

const ExperienceProfile = (props) => {
  //TODO:recentEmployment
  //TODO: FIX IMAGE URL ISSUE NOT WORKING
  return props.exp.map((val) => {
    console.log(val);
    return (
      <div key={val.index}>
        <div className="expCard">
          <div className="expIconLeft">
            <img
              className="expIconProfile"
              src={require("../../../images/stowe.png")}
              alt="Exp icons"
            ></img>
            <p>{val.date}</p>
          </div>
          <div className="expIconRight">
            <h4>{val.company}</h4>
            <p>
             {val.text}
            </p>
          </div>
        </div>
      </div>
    );
  });
};

export default ExperienceProfile;
