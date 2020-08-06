import React from "react";

const exp = (props) => {
  return props.exp.map((val, idx) => {
    let cardIdExp = `expCard${idx}`;
    // console.log(val.index, idx);
    // console.log(val);
    return (
      <div className={cardIdExp} key={val.index}>
        <div className="expCardrow1">
          <div>
            <label>Company</label>
            <input
              type="text"
              data-id={idx}
              className="expCardSec"
              placeholder="Company"
              name="company"
              label="company"
              id="company"
              required
            ></input>
            <label>Period Worked</label>
            <select name="date1"  data-id={idx}  className="expCardSec"required>
              <option value="Jan" >Jan</option>
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
              className="expCardSec"
              id="quantity"
              min="1940"
              max="2020"
              placeholder="2019"
              required
            ></input>
            <label>-</label>
            <select name="date3"  data-id={idx} required>
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
              className="expCardSec"
              name="date4"
              min="1940"
              max="2020"
              placeholder="2020"
              required
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
        <div className="expCardrow2">
          <div>
            <textarea
              type="text"
              name="text"
              data-id={idx}
              className="expCardSec"
              id="expCardDesc"
              placeholder="A description of experience and work done by you as well as your role in the company...."
            ></textarea>
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