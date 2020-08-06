import React from "react";
const references = (props) => {
  return props.references.map((val, idx) => {
    // console.log(val)
    return (

      <div  key={val.index}>
        <input
          type="text"
          className="arrSkills"
          data-id={idx}
          placeholder="Add your references"
          name="references"
          label="references"
          id="references"
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

export default references;

