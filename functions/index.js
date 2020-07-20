const functions = require("firebase-functions");
const app = require("express")();
// const {admin} = require('./util/admin');


const FBAuth = require('./util/fbAuth');

const {getAllJobs, createNewJob} = require ('./handlers/jobs');
const {signup, login, uploadImage, addUserDetails, addProfile, getAuthenticatedUser} = require ('./handlers/users');



//JOB ROUTES
app.get("/getjobs", getAllJobs);
app.post("/createjob", FBAuth, createNewJob);
app.post("/user/image", FBAuth, uploadImage);

//could be used maybe to update profile 
app.post('/user' , FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);


//TODO:
//PROFILE
//create profile
app.post ('/createprofile', FBAuth, addProfile)
//get all profiles
//get one profile

//USER ROUTES
app.post("/signup", signup );
app.post("/login", login);



//This tells us that app is the container for all routes in the app. Express allows us to put api in the baseurl after the request and allows the app to run multiple routes. This will route it into your console on firebase
exports.api = functions.region("australia-southeast1").https.onRequest(app);
