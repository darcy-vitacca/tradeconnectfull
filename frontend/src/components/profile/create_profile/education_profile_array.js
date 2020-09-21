import React from "react";

const Education = (props) => {
  return props.education.map((val, idx) => {
    return (
      <div  key={val.index} className="educationArr">
        <input
          type="text"
          className="arrSkills"
          data-id={idx}
          placeholder="Add your Education"
          name="education"
          label="education"
          id="education"
          value={val.education}
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

export default Education;

