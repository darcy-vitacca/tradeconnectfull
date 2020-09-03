import React from "react";

const SkillsProfile = (props) => {
  return props.licences.map((val, idx) => {
    return (
      <div  key={val.index} className="licenseArr">
        <input
          type="text"
          className="arrSkills"
          data-id={idx}
          placeholder="Add your licences"
          name="licences"
          label="licences"
          value={val.licences}
          id="licences"
          required
        ></input>
        
        {idx === 0 ? (
                <img
                  className="clearSearchIcon"
                  src={require("../../../images/plusIcon.png")}
                  alt="profile"
                  className="dynamicButtonsSmall"
                  onClick={() => props.add(props)}
                ></img>
              ) : (
                <img
                  className="dynamicButtonsSmall"
                  src={require("../../../images/deletedash.png")}
                  alt="profile"
                  onClick={() => props.delete(val)}
                ></img>
              )}
        
      </div>
    );
  });
};

export default SkillsProfile;

