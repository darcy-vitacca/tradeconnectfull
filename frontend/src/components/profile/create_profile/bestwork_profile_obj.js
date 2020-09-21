import React from "react";

const bestwork = (props) => {
  return props.bestWork.map((val, idx) => {
    let cardIdBestWork = `bestWorkCard${idx}`;
    return (
      <div className={cardIdBestWork} key={val.index}>
        <div className="expCardrow1">
          <div>
            <h5>Best work header</h5>
            <input
              type="text"
              data-id={idx}
              value={val.header}
              className="bestWorkSec"
              placeholder="Project Header"
              name="header"
              label="header"
              id="header"
              required
            ></input>

            <h5>Best Work Image</h5>
            <div className="bestWorkBtnSec">
              <input
                type="file"
                className="bestWorkSec"
                name="imageUrl"
                onChange={props.imageUploadFunc}
                data-id={idx}
                placeholder="Best Work photo"
                id="bestWorkImageUrl"
              ></input>

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
        </div>
        <div className="bestWorkCardrow2">
          <div>
            <textarea
              type="text"
              name="desc"
              data-id={idx}
              id="bestWorkCardDesc"
              value={val.desc}
              maxLength="600"
              onInput={props.inputHandler}
              className="bestWorkSec"
              placeholder="A description of your best work project as well as any other details that might interest people."
            ></textarea>
             <p id={`bestWorkCardDesc${idx}Label`} className="inputLengthLabels">0/600</p>
          </div>
        </div>
      </div>
    );
  });
};

export default bestwork;

