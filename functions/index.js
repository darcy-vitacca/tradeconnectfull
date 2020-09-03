const functions = require("firebase-functions");
const app = require("express")();
// const {admin} = require('./util/admin');
const cors = require("cors");
app.use(cors());

const FBAuth = require("./util/fbAuth");

const {
  getJob,
  createNewJob,
  deleteJob,
  searchJobs,
  jobDashboard,
} = require("./handlers/jobs");
const {
  getInbox,
  sendMessage,
  deleteMessage,
} = require("./handlers/messaging");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  addProfile,
  getAuthenticatedUser,
  deleteProfile,
  searchEmployees,
  deleteUser,
  forgotPassword,
  updateEmail,
  updatePassword,
  uploadFile
} = require("./handlers/users");
const { getProfile } = require("./handlers/profile");
const fbAuth = require("./util/fbAuth");
//IF YOU ARE GOING TO ADD NOTIFACTIONS AND HCAT ETC. WATCH VIDEO 12 + 13 again

//JOB ROUTES
app.get("/getjob/:jobId", getJob); //get one job - with full details
app.post("/searchjobs", searchJobs); //search jobs
app.post("/createjob", FBAuth, createNewJob); //create new job
app.delete("/deletejob/:jobId", FBAuth, deleteJob); //remove job
app.get("/jobdashboard/:userid", FBAuth, jobDashboard);

//PROFILE ROUTES
app.get("/getprofile/:userId", getProfile); //get one profile
app.post("/searchemployee", searchEmployees); //search people
app.post("/createprofile", FBAuth, addProfile); //add profile
app.delete("/deleteprofile/:profileId", FBAuth, deleteProfile);

//MESSAGING
app.get("/getinbox", fbAuth, getInbox);
app.post("/sendmessage", fbAuth, sendMessage);
app.delete("/deletemessage/:messageid/:inboxmethod", fbAuth, deleteMessage);


//USER ROUTES
app.post("/login", login);
app.post("/signup", signup);
app.post("/updateemail", FBAuth, updateEmail);
app.post("/updatepassword", FBAuth, updatePassword);
app.post("/user", FBAuth, addUserDetails);
app.post("/forgotpassword", forgotPassword);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user/file", FBAuth, uploadFile);
app.get("/user", FBAuth, getAuthenticatedUser);
app.delete("/delete/:userId/:handle", FBAuth, deleteUser);

//This tells us that app is the container for all routes in the app. Express allows us to put api in the baseurl after the request and allows the app to run multiple routes. This will route it into your console on firebase
exports.api = functions.region("australia-southeast1").https.onRequest(app);
