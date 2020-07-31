import React, { Component } from "react";

const licenses = (props) => {
  return props.licenses.map((val, idx) => {
   
    console.log(val)
    return (
      <div  key={val.index}>
        <input
          type="text"
          className="arrSkills"
          data-id={idx}
          placeholder="Add your licenses"
          name="licenses"
          label="licenses"
          id="licenses"
          required
        ></input>
        
          {idx === 0 ? (
            <button
              onClick={() => props.add()}
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

export default licenses;

