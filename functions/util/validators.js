//Helper methods
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};
const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

//checks signUpData
exports.validateSignUpData = (data) => {
  //This section checks for errors in the sign up and if they have it it will add and error to the object which will it turn be check and if any errors come up it will be shown
  let errors = {};
  console.log("here");
  console.log(data);
  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match";
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (isEmpty(data.handle)) errors.handle = "Must not be empty";

  // check if there is no keys in errors
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

//checks login
exports.validateLoginData = (data) => {
  console.log(data);
  let errors = {};
  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};
  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else userDetails.website = data.website;
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};

//TODO:
//handle images
exports.reduceProfileDetails = (data) => {
  let profileDetails = {};
  let expArr = [];
  
  if (!isEmpty(data.fullName.trim())) profileDetails.fullName = data.fullName;
  if (!isEmpty(data.recentEmp.trim()))
    profileDetails.recentEmp = data.recentEmp;
  if (!isEmpty(data.trade.trim())) profileDetails.trade = data.trade;
  if (!isEmpty(data.about.trim())) profileDetails.about = data.about;

  if (data.exp) {
    data.exp.forEach((doc) => {
      if (!isEmpty(doc["text"])) {
        expArr.push({ exp : doc });
      } else {
        // console.log("Text entry missing");
      }
    });
    profileDetails.exp = expArr;
  }

  if (data.licences) {
    if (!isEmpty(data.licences[0])){
      profileDetails.licences = data.licences;
    } else {
      profileDetails.licences = data.licences;
      console.log("Text entry missing");
    }
  }
  if (data.education) {
  if (!isEmpty(data.education[0])){
    profileDetails.education = data.education;
  } else {
    profileDetails.education = data.education;
    console.log("Text entry missing");
  }
}
if (data.refrences) {
  if (!isEmpty(data.refrences[0])) {
    profileDetails.refrences = data.refrences;
  } else {
    profileDetails.refrences = data.refrences;
    console.log("Text entry missing");
  }
}

  // TODO:
  //handle object
  //check first oject then get all key values and check if they all have something and set it
  //continue till there is none left
  if (!isEmpty(data.bestWork.trim())) profileDetails.bestWork = data.bestWork;

  return profileDetails;
};


// bestWork{
//     house1 : {
//         header: text
//         desc: text
//         imageUrl: text
//     },
//     house2 : {
//         header: text
//         desc: text
//         imageUrl: text
//     },
//     house3 : {
//         header: text
//         desc: text
//         imageUrl: text
//     },
//     house4 : {
//         header: text
//         desc: text
//         imageUrl: text
//     }
    
// }





////user profile////
// profileImg, ?
// fullName, X
// recentEmp, X
// trade,  X 
// about, X
/*exp : {  X
    exp1 :{
        text: text;
        date : date
    },
    exp2 :{
        text: text;
        date : date
    },
    exp3 :{
        text: text;
        date : date
    },
    exp4 :{
        text: text;
        date : date
    }    
},*/

// "exp": [
//   {
//       "exp1" :{
//           "date": "1",
//           "text": "1"
//       }

//   },
//   {
//        "exp2" :{
//           "date": "2",
//           "text": "2"
//       }
//   },
//    {
//        "exp3" :{
//           "date": "3",
//           "text": "3"
//       }
//   },
//    {
//        "exp4" :{
//           "date": "4",
//           "text": "4"
//       }
//   }

// ],
