import React from "react";

const exp = (props) => {
  return props.exp.map((val, idx) => {
    let cardIdExp = `expCard${idx}`;
    // console.log(val.index, idx);
    // console.log(val);
    return (
      <div key={val.index}>
        <div className="expCardrow1">
          <h5>Company</h5>
          <input
            type="text"
            data-id={idx}
            className="expCardSec"
            placeholder="Company"
            value={val.company}
            name="company"
            label="company"
            id="companyId"
            required
          ></input>
          <h5>Company Logo Image</h5>
          <input
            type="file"
            className="expCardSec"
            name="imageUrl"
            onChange={props.imageUploadFunc}
            data-id={idx}
            placeholder="Company logo image"
            id="expImageUrl"
          ></input>
          <h5>Period Worked</h5>
          <div className="periodWorkedArea">
            <div className="periodWorked">
              <select
                name="date1"
                data-id={idx}
                value={val.date[0]}
                className="periodWorkedMon"
                required
              >
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Aug">Aug</option>
                <option value="Sep">Sep</option>
                <option value="Oct">Oct</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
              </select>
              <input
                type="number"
                name="date2"
                data-id={idx}
                value={val.date[1]}
                className="periodWorkedYear"
                id="quantity"
                min="1940"
                max="2020"
                placeholder="2019"
                required
              ></input>
              <label> - </label>
              <select
                name="date3"
                data-id={idx}
                value={val.date[2]}
                className="periodWorkedMon"
                required
              >
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Aug">Aug</option>
                <option value="Sep">Sep</option>
                <option value="Oct">Oct</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
              </select>
              <input
                type="number"
                data-id={idx}
                id="quantity"
                value={val.date[3]}
                className="periodWorkedYear"
                name="date4"
                min="1940"
                max="2020"
                placeholder="2020"
                required
              ></input>
            </div>
            <div className="btnExpCont">
              {idx === 0 ? (
                <img
                  className="clearSearchIcon"
                  src={require("../../../images/plusIcon.png")}
                  alt="profile"
                  className="dynamicButtons"
                  onClick={() => props.add(props)}
                ></img>
              ) : (
                <img
                  className="dynamicButtons"
                  src={require("../../../images/deletedash.png")}
                  alt="profile"
                  onClick={() => props.delete(val)}
                ></img>
              )}
            </div>
          </div>
        </div>
        <div className="expCardrow2">
          <div>
            <textarea
              type="text"
              name="text"
              id="experienceText"
              value={val.text}
              onInput={props.inputHandler}
              data-id={idx}
              maxLength="600"
              className="createProfileTextAreas"
              placeholder="A description of experience and work done by you as well as your role in the company...."
            ></textarea>
            <p id={`experienceText${idx}Label`} className="inputLengthLabels">
              0/600
            </p>
          </div>
        </div>
      </div>
    );
  });
};

export default exp;

//  //delete array
//  clickOnDeleteArray = (index) => {
//   console.log(index)
//   console.log(this.state.licenses)
//   this.state.licenses.splice(index, 1);
//   this.setState(
//     {
//       licenses: this.state.licenses
//     },
//     () => console.log(this.state.licenses)
//   );
// };
