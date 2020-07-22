const functions = require("firebase-functions");
const app = require("express")();
// const {admin} = require('./util/admin');

const FBAuth = require("./util/fbAuth");

const { getAllJobs, createNewJob } = require("./handlers/jobs");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  addProfile,
  getAuthenticatedUser,
  getAllProfiles
} = require("./handlers/users");
const {getProfile} = require ("./handlers/profile");

//JOB ROUTES
//TODO:                                         //get one job
app.get("/getjobs", getAllJobs);               //get all jobs
app.post("/createjob", FBAuth, createNewJob);//create new job 


//PROFILE
app.post("/createprofile", FBAuth, addProfile); //add profile
app.get("/getprofile/:userId", getProfile); //get one profile
//TODO:                                    //get all profiles
app.get("/getprofiles", getAllProfiles);
//TODO:                                      //chat to person



//USER ROUTES
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);


//use tradie instagrammer dunnis and and that indian bloke to do viral videos

//This tells us that app is the container for all routes in the app. Express allows us to put api in the baseurl after the request and allows the app to run multiple routes. This will route it into your console on firebase
exports.api = functions.region("australia-southeast1").https.onRequest(app);
