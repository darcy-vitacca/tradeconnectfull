import React from "react";

const ExperienceProfile = (props) => {
  //TODO:recentEmployment
  //TODO: FIX IMAGE URL ISSUE NOT WORKING
  return props.exp.map((val) => {
    return (
     
        <div className="expDiv"  key={val.index} >
          <div className="expLeft">
            {/* TODO:Need to make images actually plug in here */}
            <img
              className="expIconProfile"
              src={require("../../../images/stowe.png")}
              alt="Exp icons"
            ></img>
            <p>{val.date}</p>
          </div>


          <div className="expRight">
            <h4>{val.company}</h4>
            <p>
             {val.text}
            </p>
          </div>
        </div>
  
    );
  });
};

export default ExperienceProfile;
