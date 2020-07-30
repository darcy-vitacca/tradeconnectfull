import React, { Component } from "react";

const licenses = (props) => {
  return props.licenses.map((val, idx) => {
    return (
      <div key={idx}>
        <input
          type="text"
          data-id={idx}
          placeholder="Add your licenses"
          name="licenses"
          label="licenses"
          id="licenses"
          required
        ></input>
        <div className="btnExpCont" data-id={idx}>
          {idx === 0 ? (
            <button
              onClick={() => props.add()}
              type="button"
              className="expBtnPlus"
            >
              +
            </button>
          ) : (
            <button className="expBtnMinus" onClick={() => props.delete(idx)}>
              -
            </button>
          )}
        </div>
      </div>
    );
  });
};

export default licenses;

// handleChange = (e) => {
//     console.log(e.target.name);

//     //if in licenses
//     if (e.target.name === "licenses") {
//       let lic = [...this.state.licenses];
//       lic[e.target.dataset.id] = e.target.value;
//     }
//     //if in
//     else {
//       if (
//         [
//           "index",
//           "company",
//           "date",
//           "imageUrl",
//           "text",
//           "date1",
//           "date2,",
//           "date3",
//           "date4",
//         ].includes(e.target.name)
//       ) {
//         let exp = [...this.state.exp];
//         console.log(exp);
// if (e.target.name === "date1" || "date2" || "date3" || "date4") {
//   if (e.target.name === "date1") {
//     exp[e.target.dataset.id].date[0] = e.target.value;
//   } else if (e.target.name === "date2") {
//     exp[e.target.dataset.id].date[1] = e.target.value;
//   } else if (e.target.name === "date3") {
//     exp[e.target.dataset.id].date[2] = e.target.value;
//   } else if (e.target.name === "date4") {
//     exp[e.target.dataset.id].date[3] = e.target.value;
//   } else {
//     console.log("error");
//   }
// } else {
//           console.log("Here");
//           this.setState({ [e.target.name]: e.target.value });
//         }
//       }
//     }
//   };
