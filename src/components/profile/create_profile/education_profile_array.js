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

export default Education;

