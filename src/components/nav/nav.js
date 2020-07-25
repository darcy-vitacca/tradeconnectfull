import React from "react";
// import NavSignedIn from './signedinnav';
import NavSignedOut from './signedoutnav';
// import { Link } from "react-router-dom";
import "../../App.css";


function Nav() {
  return (
    <div>
       {/* <NavSignedIn /> */}
       <NavSignedOut />
      

    </div>
  
  );
}

export default Nav;
