import React from "react";

const AboutProfile = (props) => {
  let {
    about,
  } = props.profile;
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
