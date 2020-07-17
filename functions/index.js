const functions = require("firebase-functions");
const app = require("express")();
// const {admin} = require('./util/admin');


const FBAuth = require('./util/fbAuth');

const {getAllJobs, createNewJob} = require ('./handlers/jobs');
const {signup, login} = require ('./handlers/users');



//JOB ROUTES
app.get("/getjobs", getAllJobs);
app.post("/createjob", FBAuth, createNewJob);

//USER ROUTES
app.post("/signup", signup );
app.post("/login", login);



//This tells us that app is the container for all routes in the app. Express allows us to put api in the baseurl after the request and allows the app to run multiple routes. This will route it into your console on firebase
exports.api = functions.region("australia-southeast1").https.onRequest(app);

// eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxODQ1OWJiYTE2NGJiN2I5MWMzMjhmODkxZjBiNTY1M2UzYjM4YmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdHJhZGVjb25uZWN0LWFiMTQwIiwiYXVkIjoidHJhZGVjb25uZWN0LWFiMTQwIiwiYXV0aF90aW1lIjoxNTk0OTczODYxLCJ1c2VyX2lkIjoiQkVpS2lrUWdNNGhKcWM0Q2NTWElFMWVyaFJsMSIsInN1YiI6IkJFaUtpa1FnTTRoSnFjNENjU1hJRTFlcmhSbDEiLCJpYXQiOjE1OTQ5NzM4NjEsImV4cCI6MTU5NDk3NzQ2MSwiZW1haWwiOiJuZXcxMUBlbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibmV3MTFAZW1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.E-JjX6vdyLtVWigqhEwB7UmBLLRDFAo8QPeMEiqJFDTVY8PRRgr-z15oxmsuS_WNEsDlRW7tklGK18IukWryl8RJYG1iJJofv5-UiKH8E13cv7s5pQ9yD7zkSOF4NYYmgDSDS1Ym2dFkjZjxcOWpfPB1TZbOdgCiU7Tt1WED5DNfg50LsoJSOSxBi4XvWX7PMniMJ3aKwza35j4NglXlgt6WUnme2uCuLxUC4KRxI55_8U0945PNJecgFDAAhZ2SxqRgfUaFncMa7Nz2kR0Gd_CRK5HcgQ6lYR1Ov-selXfpNj0jRCIm4R5nq46YU6CMubFs0Vc611tQkrc4IAjUfw