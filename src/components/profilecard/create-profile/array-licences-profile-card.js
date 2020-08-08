import React from "react";

const SkillsProfile = (props) => {
  // console.log(props)
  return props.licences.map((val, idx) => {
    // console.log(val)
    return (
      <div  key={val.index} className="licenseArr">
        <input
          type="text"
          className="arrSkills"
          data-id={idx}
          placeholder="Add your licences"
          name="licences"
          label="licences"
          id="licences"
          required
        ></input>
        
          {idx === 0 ? (
            <button
              onClick={() => props.add(props)}
              type="button"
              className="licBtnPlus"
            >
              +
            </button>
          ) : (
            <button className="licBtcMinus" onClick={() => props.delete(val)}>
              -
            </button>
          )}
        
      </div>
    );
  });
};

export default SkillsProfile;

