import React from "react";

const ExperienceProfile = (props) => {
  return props.exp.map((val) => {
    return (
        <div className="expDiv"  key={val.index} >
          <div className="expLeft">
            <img
              className="expIconProfile"
              src={val.imageUrl}
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
