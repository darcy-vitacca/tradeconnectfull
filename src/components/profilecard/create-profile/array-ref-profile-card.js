import React from "react";
const references = (props) => {
  return props.references.map((val, idx) => {
    return (
      <div key={val.index} className="referencesArr">
        <textarea
          type="text"
          data-id={idx}
          name="references"
          label="references"
          id="references"
          maxLength="500"
          value={val.references}
          onInput={props.inputHandler}
          className="referencesInput"
          placeholder="Enter a reference from someone who you have worked for that can vouch for your quality of work. Include their name and Company/Relationship......."
          required
        ></textarea>
        <div className="referencesInfo">
        
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
        <p id={`references${idx}Label`} className="inputLengthLabels">0/500</p>

        </div>

        
      </div>
    );
  });
};

export default references;
