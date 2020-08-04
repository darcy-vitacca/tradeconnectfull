import React from "react";

const BestWorkProfile = (props) => {

  return props.bestWork.map((val) => {
    console.log(val);
  return (
    <div className="bestWork-profile-card-row" key={val.index}>
      <div className="bestWorkCont-row">
        <div className="bestWorkCont">
          <div className="bestWorkLeft">
            <img
              className="bestWorkLeftImg"
              src={val.imageUrl}
              alt="Best work"
            ></img>
          </div>

          <div className="bestWorkRight">
            <h3>{val.header}</h3>
            <p>
             {val.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  });
}

export default BestWorkProfile;
