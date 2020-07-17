const {db} = require('../util/admin');
const config = require('../util/config')
const firebase = require("firebase");
const {validateSignUpData, validateLoginData} = require('../util/validators')
firebase.initializeApp(config);


exports.signup = (request, response) => {
    const newUser = {
      email: request.body.email,
      password: request.body.password,
      confirmPassword: request.body.confirmPassword,
      handle: request.body.handle,
    };
    
    // Passes in the newUser into validateSignupData and gives an error if it returns errors.
    const {valid, errors } = validateSignUpData(newUser);
    if(!valid) return response.status(400).json(errors);
  
  
    //validate data checks if handle is valid and unqiuewe return an object containing errors  if it isn't it creates a new user which returns an authentication token
    let token, userId;
    db.doc(`/users/${newUser.handle}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return response
            .status(400)
            .json({ handle: "this handle is already taken" });
          //If it isn't already taken we then create and auth it and get the id token  then return a token and if there is an error we can catch it
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
      })
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idToken) => {
        token = idToken;
        const userCredentials = {
          handle: newUser.handle,
          email: newUser.email,
          createdAt: new Date().toISOString(),
          userId: userId,
        };
        return db.doc(`users/${newUser.handle}`).set(userCredentials);
      })
      .then(() => {
        return response.status(201).json({ token });
      })
      //this checks for errors if the email is already in use and gives an error message if it is
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          return response.status(400).json({ email: "Email is already in use." });
        } else {
          return response.status(500).json({ error: err.code });
        }
      });
  }

  exports.login = (request, response) => {
    const user = {
      email: request.body.email,
      password : request.body.password
    }
    const {valid, errors } = validateLoginData(user);
    if(!valid) return response.status(400).json(errors);
  
    
    // if we have no errors we need to login the user
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data =>{
       return data.user.getIdToken();
    })
    .then(token =>{
      return response.json({token})
    })
    .catch(err =>{
      console.error(err)
      if(err.code == "auth/user-not-found"){
        return response.status(403).json({general : 'Wrong credentials please try again.'})
      }
      return response.status(500).json({error: err.code})
    })
  
  }