import React, { Component } from "react";

const AboutProfile = (props) => {
  //TODO:recentEmployment 
  let {
    about,
    fullName,
    location,
    profileImageUrl,
    recentEmp,
    trade,
    workStatus,
    website,
  } = props.profile
  console.log(props.profile)
  //TODO: IMAGE OF RECENT EMPLOYERS
  return(
    
    <div className="pageBody" >
        <div className="head-profile-card-row1">
          <div>
            <img
              className="iconProfile"
              src={profileImageUrl}
              alt="profile"
            ></img>
          
            <p>{trade}</p>
            <p>{location}</p>
            <p>{website}</p>
          </div>

          <div>
            <h1>{fullName}<span class="dot"></span></h1>
            
            <p>{workStatus}</p>
            
            <img
              className="expIconProfile"
              src={require("../../../images/stowe.png")}
              alt="exp icon"
            ></img>
             
            <img
              className="expIconProfile"
              src={require("../../../images/swin.png")}
              alt="exp icon"
            ></img>
          </div>
        </div>

        <div className="head-profile-card-row2">
          <h1>About</h1>
          <p>
           {about}
          </p>
        </div>
      </div>
  )
  
  
}

export default AboutProfile;
