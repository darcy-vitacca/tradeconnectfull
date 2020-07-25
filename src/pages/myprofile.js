import React from 'react';
import AboutProfile from '../components/profilecard/about-profile-card';
import ExperienceProfile from '../components/profilecard/experience-profile-card'
import SkillsProfile from '../components/profilecard/skills-profile-card'
import WorkegProfile from '../components/profilecard/workeg-profile-card'
import '../components/profilecard/profile.css';


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
