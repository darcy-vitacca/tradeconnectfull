import React from "react";
import { uuid } from "uuidv4";

const SkillsProfile = (props) => {
  // console.log(props);
  let arrayRender = [];
  if (props.licenses) {
    arrayRender = props.licenses;
  } else if (props.education) {
    arrayRender = props.education;
  } else if (props.references) {
    arrayRender = props.references;
  } else {
    return console.log("error");
  }
  return arrayRender.map((val) => {
    return <li className={props.references ? ("refrencesListItems"):("skillsListItems")}key={uuid()}>{val}</li>;
  });
};

export default SkillsProfile;

