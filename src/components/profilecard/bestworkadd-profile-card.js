import React, { Component } from "react";

const bestwork = (props) => {
  return props.bestWork.map((val, idx) => {
    let cardIdBestWork = `bestWorkCard${idx}`;
    // console.log(val.index, idx);
    // console.log(val);
    return (
      <div className={cardIdBestWork} key={val.index}>
        <div className="expCardrow1">
          <div>
            <label>Best work header</label>
            <input
              type="text"
              data-id={idx}
              className="bestWorkSec"
              placeholder="Project Header"
              name="header"
              label="header"
              id="header"
              required
            ></input>
             <input
                type="file"
                className="bestWorkSec"
                placeholder="Best Work photo"
                id="bestWorkImageUrl"
              ></input>
            <div className="btnExpCont">
              {idx === 0 ? (
                <button
                  onClick={() => props.add(props)}
                  type="button"
                  className="expBtnPlus"
                >
                  +
                </button>
              ) : (
                <button
                  className="expBtnMinus"
                  onClick={() => props.delete(val)}
                >
                  -
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="bestWorkCardrow2">
          <div>
            <textarea
              type="text"
              name="desc"
              data-id={idx}
              id ="bestWorkCardDesc"
              className="bestWorkSec"
              placeholder="A description of your best work project as well as any other details that might interest people."
            ></textarea>
          </div>
        </div>
      </div>
    );
  });
};

export default bestwork;



// if (["date1", "date2", "date3", "date4"].includes(e.target.name)) {
//   let exp = [...this.state.exp];
//   if (e.target.name === "date1" || "date2" || "date3" || "date4") {

//     if (e.target.name === "date1") {
//       exp[e.target.dataset.id].date[0] = e.target.value;
//     } else if (e.target.name === "date2") {
//       exp[e.target.dataset.id].date[1] = e.target.value;
//     } else if (e.target.name === "date3") {
//       exp[e.target.dataset.id].date[2] = e.target.value;
//     } else if (e.target.name === "date4") {
//       exp[e.target.dataset.id].date[3] = e.target.value;
//     } else {
//       console.log("error");
//     }
//   }

  //FORM CHANGE HANDLER
  // handleChange = (e) => {
    // console.log(e.target.name)
    // if (e.target.name === "licenses") {
    //   let license = [...this.state.licenses];
    //   license[e.target.dataset.id][e.target.name] = e.target.value;
    //   // console.log(license);
    // } else if (e.target.name === "education") {
    //   let education = [...this.state.education];
    //   education[e.target.dataset.id][e.target.name] = e.target.value;
    //   // console.log(education);
    // } else if (e.target.name === "references") {
    //   let reference = [...this.state.references];
    //   reference[e.target.dataset.id][e.target.name] = e.target.value;
    //   // console.log(reference);
    // } else {
    //   if (
    //     ["index", "company", "date", "imageUrl", "text"].includes(e.target.name)
    //   ) {
    //     let exp = [...this.state.exp];
    //     exp[e.target.dataset.id][e.target.name] = e.target.value;
    //   } else if (["date1", "date2", "date3", "date4"].includes(e.target.name)) {
    //     let exp = [...this.state.exp];
    //     if (e.target.name === "date1" || "date2" || "date3" || "date4") {
    //       if (e.target.name === "date1") {
    //         exp[e.target.dataset.id].date[0] = e.target.value;
    //       } else if (e.target.name === "date2") {
    //         exp[e.target.dataset.id].date[1] = e.target.value;
    //       } else if (e.target.name === "date3") {
    //         exp[e.target.dataset.id].date[2] = e.target.value;
    //       } else if (e.target.name === "date4") {
    //         exp[e.target.dataset.id].date[3] = e.target.value;
    //       } else {
    //         console.log("error");
    //       }
    //     }
    //   } else {
    //     console.log("Here");
    //     this.setState({ [e.target.name]: e.target.value });
    //   }
  //   }
  // };