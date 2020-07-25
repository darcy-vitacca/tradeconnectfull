import React from 'react';

function AboutProfile() {
  return (
    <div className="pageBody">
       
        <div className="head-profile-card-row1">
  
        <div>
        <img className="iconProfile"src={require("../../images/profilephoto.png")} alt="profile"></img>
         <p>A Grade, Electrician</p>
        </div>
      
         <div>
         <h1>Darcy Vitacca</h1>
            <img className="expIconProfile" src={require("../../images/stowe.png")}alt="exp icon"></img>
            <img className="expIconProfile" src={require("../../images/swin.png")}alt="exp icon"></img>
         </div>
        
        </div>



        <div className="head-profile-card-row2">
            <h1>About</h1>
            <p>-Learnt from blah blah over the time I did these jobs worked with this person and was a high achiever in tafe. The major jobs we did were and it was mainly filled between with x and y.Learnt from blah blah over the time I did these jobs worked with this person and was a high achiever in tafe. The major jobs we did were and it was mainly filled between with x and yLearnt from blah blah over the time I did these jobs worked with this person and was a high achiever in tafe. The major jobs we did were and it was mainly filled between with x and y</p>
        </div> 

       
    </div>
  );
}

export default AboutProfile;
