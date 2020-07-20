const { db, admin } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase");
const { uuid } = require("uuidv4");

const {
  validateSignUpData,
  validateLoginData,
  reduceUserDetails,
  reduceProfileDetails
} = require("../util/validators");
const { request } = require("http");
firebase.initializeApp(config);

//sign up user
exports.signup = (request, response) => {
  const newUser = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    handle: request.body.handle,
  };
  // Passes in the newUser into validateSignupData and gives an error if it returns errors.
  const { valid, errors } = validateSignUpData(newUser);
  if (!valid) return response.status(400).json(errors);

  const noImg = "no-img.png";

  //validate data checks if handle is valid and unqiuewe return an object containing errors  if it isn't it creates a new user which returns an authentication token
  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ handle: "This handle is already taken" });
        //If it isn't already taken we then create and auth it and get the id token  then return a token and if there is an error we can catch it
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      console.log(data);
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
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
};

//login user
exports.login = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };
  const { valid, errors } = validateLoginData(user);
  if (!valid) return response.status(400).json(errors);

  // if we have no errors we need to login the user
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return response.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code == "auth/user-not-found") {
        return response
          .status(403)
          .json({ general: "Wrong credentials please try again." });
      }
      return response.status(500).json({ error: err.code });
    });
};




//add user details
exports.addUserDetails = (request, response) => {
  let userDetails = reduceUserDetails(request.body);

  db.doc(`/users/${request.user.handle}`)
    .update(userDetails)
    .then(() => {
      return response.json({ message: "Details added succsessfully" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};


//add full profile
exports.addProfile = (request, response) =>{
  let profileDetails = reduceProfileDetails(request.body);

  db.doc(`/users/${request.user.handle}`)
  .update(profileDetails)
  .then(() => {
    return response.json({message : "Details added succsessfully"})
  })
  .catch((err)=> {
    console.error(err);
    return response.status(500).json({error: err.code});
  });

}





//Get own user details
exports.getAuthenticatedUser = (request, response) => {
  //response data
  let userData = {};
  db.doc(`/users/${request.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
      }
    });
};








// to upload images
exports.uploadImage = (request, response) => {
  //path is a default package from node same with os]
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: request.headers });

  let imageFileName;
  let imageToBeUploaded = {};
  // String for image token
  let generatedToken = uuid();

  //this allows busboy to upload a file that handler take a fieldname, file, filename, mimetype all handlers need to be called in the name to work even if you don't use them
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return response.status(400).json({ error: "Wrong file type submitted" });
    }

    //gets the extension of our file to extract it eg the jpeg or png so we split it this then get the index of the last item with the []
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    //This will then give us the image filename CHANGE TO UUID IN THE FUTURE SO IT"S SCALABLE
    imageFileName = `${Math.round(
      Math.random() * 100000000000
    )}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    // now we have an object created we can use the filesystem library to create the image
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  //this is the finish event once the file has been created
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket(`${config.storageBucket}`)
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      //construct an image url to add to our users
      .then(() => {
        // alt media allows it to be shown in the broswer without it it gets downloaded and not shown
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;

        //we need to add the image to our user document so because we use FBAuth we can get access to the user document becuase they have already been authenticated and logged in and can then retrun the users section to add the image to. Because imageURL doesn't exsist it wil create it so you use the firebasfunction update which will take a key value to update
        return db
          .doc(`/users/${request.user.handle}`)
          .update({ imageUrl: imageUrl });
      })
      .then(() => {
        return response.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  });
  busboy.end(request.rawBody);
};
