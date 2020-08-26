import React from "react";
const BestWorkProfile = (props) => {
  return props.bestWork.map((val) => {
    return (
      <div className="bestWorkDivImageOnly" key={val.index}>
        <img
          className="bestWorkLeftImgOnly"
          src={val.imageUrl}
          alt="Best work"
        ></img>
      </div>
    );
  });
};

export default BestWorkProfile;
