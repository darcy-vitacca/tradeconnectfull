import React from "react";
const BestWorkProfile = (props) => {
  return props.bestWork.map((val) => {
    // console.log(val);
    return (
      // <div className="bestWorkDiv" key={val.index}>

      //   <div className="bestWorkLeft">
      //         <img
      //           className="bestWorkLeftImg"
      //           src={val.imageUrl}
      //           alt="Best work"
      //         ></img>
      //            <img
      //           className="bestWorkLeftImg"
      //           src={val.imageUrl}
      //           alt="Best work"
      //         ></img>

      //         </div>

      //       <div className="bestWorkRight">
      //         <h5>{val.header}</h5>
      //         <p>
      //          {val.desc}
      //         </p>
      //       </div>

      // </div>
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
