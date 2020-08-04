import React from "react";
// import NavSignedIn from './signedinnav';
import NavSignedOut from "./signedoutnav";

import "../../App.css";

function Nav() {
  return (
    <div>
      <header>
        {/* <NavSignedIn /> */}
        <NavSignedOut />
      </header>
    </div>
  );
}

export default Nav;
