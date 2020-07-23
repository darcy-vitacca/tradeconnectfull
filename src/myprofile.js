import React from 'react';
import AboutProfile from './profilecard/about-profile-card';
import ExperienceProfile from './profilecard/experience-profile-card'
import SkillsProfile from './profilecard/skills-profile-card'
import WorkegProfile from './profilecard/workeg-profile-card'
import './profilecard/profile.css';


function MyProfile() {
  return (
    <div className="profileCard">
      <AboutProfile/>
      <ExperienceProfile/>
      <SkillsProfile/>
      <WorkegProfile/>

  
    </div>
  );
}

export default MyProfile;
