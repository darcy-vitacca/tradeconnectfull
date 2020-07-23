const functions = require("firebase-functions");
const app = require("express")();
// const {admin} = require('./util/admin');

const FBAuth = require("./util/fbAuth");

const { getJob , getAllJobs, createNewJob,deleteJob } = require("./handlers/jobs");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  addProfile,
  getAuthenticatedUser,
  getAllProfiles,
  deleteProfile
} = require("./handlers/users");
const {getProfile} = require ("./handlers/profile");
//IF YOU ARE GOING TO ADD NOTIFACTIONS AND HCAT ETC. WATCH VIDEO 12 + 13 again
//JOB ROUTES
app.get("/getjob/:jobId", getJob);              //get one job - with full details
app.get("/getjobs", getAllJobs);               //get all jobs
app.post("/createjob", FBAuth, createNewJob); //create new job 
app.delete("/deletejob/:jobId", FBAuth, deleteJob)//remove job

//PROFILE
app.post("/createprofile", FBAuth, addProfile);                  //add profile
app.get("/getprofile/:userId", getProfile);                     //get one profile
app.delete("/deleteprofile/:profileId", FBAuth, deleteProfile) //remove profile                                       

app.get("/getprofiles", getAllProfiles);
//TODO:  //get all profiles- maybe without pictures or a smaller version then get the full version
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
