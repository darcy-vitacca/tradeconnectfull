import React from "react";
const references = (props) => {
  return props.references.map((val, idx) => {
    // console.log(val)
    return (
      <div key={val.index} className="referencesArr">
        <textarea
          type="text"
          data-id={idx}
          name="references"
          label="references"
          id="references"
          class="referencesInput"
          placeholder="Enter a reference from someone who you have worked for that can vouch for your quality of work. Include their name and Company/Relationship......."
          required
        ></textarea>

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
