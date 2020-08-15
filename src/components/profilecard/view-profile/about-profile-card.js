import React from "react";

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
  } = props.profile;
  fullName = fullName.join(" ");
  location = location.join(" ");
  //TODO: IMAGE OF RECENT EMPLOYERS
  return (
    <div>
      <div className="peopleSearchHead">
        <div className="peopleSearchHeadLeft">
          <img
            className="peopleSearchIcon"
            src={profileImageUrl}
            alt="profile"
          ></img>
        </div>

        <div className="peopleSearchHeadRight">
          <h2>{fullName}</h2>
          <h2>{trade}</h2>
          <h4 className="peopleSearchHeadRightLocation">{location}</h4>
          <h4 className="peopleSearchHeadRightWebiste">{website}</h4>
          <h4 className="peopleSearchHeadRightJob">{recentEmp}</h4>

          <h4 className="peopleSearchHeadRightLocation">{workStatus}</h4>
          <span className="dot"></span>
        </div>
      </div>

      <div className="peopleSearchExpandedBody">
        <h4>About</h4>
        <p>{about}</p>
      </div>
    </div>
  );
};

export default AboutProfile;
