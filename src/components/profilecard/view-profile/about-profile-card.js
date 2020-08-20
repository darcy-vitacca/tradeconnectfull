import React from "react";

const AboutProfile = (props) => {
  //TODO:recentEmployment
  let {
    about,
  } = props.profile;
  //TODO: IMAGE OF RECENT EMPLOYERS
  return (
    <div>
   
        <div className="peopleSearchExpandedBody">
          <h4>About</h4>
          <p>{about}</p>
        </div>
 
    </div>
  );
};

export default AboutProfile;
