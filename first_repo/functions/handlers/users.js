const { db, admin } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase");
const { uuid } = require("uuidv4");

const {
  validateSignUpData,
  validateLoginData,
  reduceUserDetails,
  reduceProfileDetails,
  passwordUpdate,
  emailUpdate,
} = require("../util/validators");
const { request } = require("http");
const { profile } = require("console");
const { json, response } = require("express");
const { user } = require("firebase-functions/lib/providers/auth");
firebase.initializeApp(config);

//SIGN UP USER
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
          .json({ handle: "This Username is already taken" });
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
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId: userId,
        profileCreated: false,
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
        return response
          .status(500)
          .json({ general: "Something went wrong please try again." });
      }
    });
};

//LOGIN USER
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
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        return response
          .status(403)
          .json({ general: "Wrong credentials please try again." });
      }
      return response.status(500).json({ error: err.code });
    });
};

//PASSWORD RESET
exports.forgotPassword = (request, response) => {
  console.log(request.body);
  firebase
    .auth()
    .sendPasswordResetEmail(request.body.email)
    .then(() => {
      console.log("Success");
      return response.json({ message: "Password reset email sent!" });
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        return response.status(403).json({ error: "User not found." });
      } else {
        return response
          .status(403)
          .json({ error: "Wrong credentials please try again." });
      }
    });
};
//UPDATE PASSWORD
exports.updatePassword = (request, response) => {
  const newPassword = {
    oldPassword: request.body.oldPassword,
    newPassword: request.body.newPassword,
    confirmPassword: request.body.confirmPassword,
    email: request.body.email,
  };
  console.log(newPassword);
  const { valid, errors } = passwordUpdate(newPassword);
  if (!valid) return response.status(400).json(errors);

  const user = firebase.auth().currentUser;

  const cred = firebase.auth.EmailAuthProvider.credential(
    newPassword.email,
    newPassword.oldPassword
  );

  console.log(cred);

  user
    .reauthenticateWithCredential(cred)
    .then((res) => {
      console.log(res);
      firebase
        .auth()
        .currentUser.updatePassword(newPassword.newPassword)
        .then(() => {
          console.log("here1");
          return response.json({ message: "Password updated" });
        })
        .catch((error) => {
          console.log(error);
          console.log("here2");
          return response
            .status(403)
            .json({ error: "Wrong credentials please try again." });
        });
    })
    .catch((error) => {
      console.log(error);
      console.log("here3");
      return response
        .status(403)
        .json({ error: "Wrong credentials please try again." });
    });
};

//CHANGE EMAIL - update in user also //TODO:
exports.updateEmail = (request, response) => {
  console.log(request.body);
  const emailReq = {
    email: request.body.newEmail,
    password: request.body.password,
    oldEmail: request.body.oldEmail,
    handle: request.body.handle,
  };

  const { valid, errors } = emailUpdate(emailReq);
  if (!valid) return response.status(400).json(errors);

  const user = firebase.auth().currentUser;

  const cred = firebase.auth.EmailAuthProvider.credential(
    emailReq.oldEmail,
    emailReq.password
  );

  console.log(cred);

  user
    .reauthenticateWithCredential(cred)
    .then((res) => {
      console.log(res);
      firebase
        .auth()
        .currentUser.updateEmail(emailReq.email)
        .then(() => {
          db.doc(`/users/${emailReq.handle}`)
            .update({ email: emailReq.email })
            .then(() => {
              console.log("here1");
              return response.json({ message: "Email updated" });
            });
        })
        .catch((error) => {
          console.log(error);
          console.log("here2");
          if (error.code === "auth/email-already-in-use") {
            return response
              .status(400)
              .json({ error: "Email is already in use." });
          } else if (error.code === "auth/wrong-password") {
            return response
              .status(400)
              .json({ error: "Wrong credentials please try again." });
          } else {
            return response
              .status(403)
              .json({ error: "Wrong credentials please try again." });
          }
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return response.status(400).json({ error: "Email is already in use." });
      } else if (err.code === "auth/wrong-password") {
        return response.status(400).json({ error: "Incorrect credentials." });
      } else {
        return response
          .status(500)
          .json({ error: "Something went wrong please try again." });
      }
    });
};

// SEARCH EMPLOYEES// SEARCH EMPLOYEES// SEARCH EMPLOYEES// SEARCH EMPLOYEES// SEARCH EMPLOYEES// SEARCH EMPLOYEES// SEARCH EMPLOYEES
exports.searchEmployees = (request, response) => {
  console.log(request.body);
  let employeesAll = [];
  //employee search func
  employeeSearch = (data) => {
    if (data.size > 0) {
      data.forEach((doc) => {
        employeesAll.push({
          about: doc.data().about,
          bestWork: doc.data().bestWork,
          createdAt: doc.data().createdAt,
          education: doc.data().education,
          exp: doc.data().exp,
          fullName: doc.data().fullName,
          handle: doc.data().handle,
          licences: doc.data().licences,
          keywords: doc.data().keywords,
          location: doc.data().location,
          profileImageUrl: doc.data().profileImageUrl,
          employeeSummary: doc.data().employeeSummary,
          tradeClassification: doc.data().tradeClassification,
          recentEmp: doc.data().recentEmp,
          references: doc.data().references,
          state: doc.data().state,
          trade: doc.data().trade,
          userId: doc.data().userId,
          website: doc.data().website,
          workStatus: doc.data().workStatus,
        });
      });
    }
  };

  //checks for search results
  resultsCheck = () => {
    if (employeesAll === undefined || employeesAll.length == 0) {
      return response.status(404).json({ error: "No Employees Found" });
    } else {
      return response.json(employeesAll);
    }
  };
  //full Search
  if (
    (request.body.fullName && request.body.trade && request.body.state) !== ""
  ) {
    const searchReq = {
      fullName: request.body.fullName,
      trade: request.body.trade,
      state: request.body.state,
    };
    console.log(searchReq);
    db.collection("profiles")
      .where("fullName", "array-contains-any", searchReq.fullName)
      .where("state", "==", searchReq.state)
      .where("tradeClassification", "==", searchReq.trade)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        employeeSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });

    //TWO FIELDS SEARCHES
    //trade + state  no name search
  } else if (
    (request.body.trade && request.body.state) !== "" &&
    request.body.fullName === ""
  ) {
    console.log("here2");
    const searchReq = {
      trade: request.body.trade,
      state: request.body.state,
    };
    console.log(searchReq);
    db.collection("profiles")
      .where("state", "==", searchReq.state)
      .where("tradeClassification", "==", searchReq.trade)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        employeeSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
    //name, state no trade
  } else if (
    (request.body.fullName && request.body.state) !== "" &&
    request.body.trade === ""
  ) {
    console.log("here2");
    const searchReq = {
      name: request.body.fullName,
      state: request.body.state,
    };
    console.log(searchReq);
    db.collection("profiles")
      .where("fullName", "array-contains-any", searchReq.name)
      .where("state", "==", searchReq.state)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        employeeSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });

    //trade, name, no state
  } else if (
    (request.body.trade && request.body.fullName) !== "" &&
    request.body.state === ""
  ) {
    console.log("here2");
    const searchReq = {
      trade: request.body.trade,
      name: request.body.fullName,
    };
    console.log(searchReq);
    db.collection("profiles")
      .where("fullName", "==", searchReq.name)
      .where("tradeClassification", "==", searchReq.trade)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        employeeSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });

    //SINGLE SEARCHES
    //trade, no name + no state search
  } else if (
    request.body.trade !== "" &&
    (request.body.fullName && request.body.state) === ""
  ) {
    console.log("here3");
    const searchReq = {
      trade: request.body.trade,
    };
    console.log("HERE");
    console.log(searchReq);
    db.collection("profiles")
      .where("tradeClassification", "==", searchReq.trade)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        employeeSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  }
  // name  no trade + no state search
  else if (
    request.body.fullName !== "" &&
    (request.body.trade && request.body.state) === ""
  ) {
    console.log("here3");
    const searchReq = {
      name: request.body.fullName,
    };
    console.log(searchReq);
    db.collection("profiles")
      .where("fullName", "array-contains-any", searchReq.name)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        employeeSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  }
  // state  no trade + no name search
  else if (
    request.body.state !== "" &&
    (request.body.trade && request.body.fullName) === ""
  ) {
    console.log("here4");
    const searchReq = {
      state: request.body.state,
    };
    console.log(searchReq);
    db.collection("profiles")
      .where("state", "==", searchReq.state)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        console.log(data);
        employeeSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });

    //full empty search
  } else {
    console.log("else");
    db.collection("profiles")
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        employeeSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  }
};

//ADD USER DETAILS// MAY GET DELETED OR CHANGED INTO UPDATE USER DETAILS
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

//ADD FULL PROFILE
exports.addProfile = (request, response) => {
  // TODO: add other fields to be recieved
  let profileDetails = reduceProfileDetails(request.body);
  profileDetails.userId = request.user.uid;
  profileDetails.handle = request.user.handle;
  profileDetails.createdAt = new Date().toISOString();

  db.doc(`/profiles/${request.user.uid}`)
    .set(profileDetails)
    .then(() => {
      db.doc(`/users/${request.user.handle}`)
        .update({ profileCreated: true })
        .then(() => {
          return response.json({ message: "Details added succsessfully" });
        })
        .catch((err) => {
          console.error(err);
          return response.status(500).json({ error: err.code });
        });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

//GET OWN USER DETAILS
exports.getAuthenticatedUser = (request, response) => {
  //response data
  let userData = {};
  db.doc(`/users/${request.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        console.log(userData);
        return response.json(userData);
      }
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

//UPLOAD IMAGES
exports.uploadImage = (request, response) => {
  //path is a default package from node same with os]
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const busboy = new BusBoy({ headers: request.headers });

  let generatedToken;
  let imageFileName;
  let imageToBeUploaded = {};
  let imagesToBeUploaded = [];
  let imageUrl;
  let imageUrls = [];

  //this allows busboy to upload a file that handler take a fieldname, file, filename, mimetype all handlers need to be called in the name to work even if you don't use them
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    generatedToken = uuid();
    // console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return response.status(400).json({ error: "Wrong file type submitted" });
    }
    //gets the extension of our file to extract it eg the jpeg or png so we split it this then get the index of the last item with the []
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    //This will then give us the image filename
    imageFileName = `${Math.round(
      Math.random() * 100000000000
    )}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    // now we have an object created we can use the filesystem library to create the image
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
    imagesToBeUploaded.push(imageToBeUploaded);
    imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
    imageUrls.push(imageUrl);
    // console.log(imagesToBeUploaded)
  });
  //this is the finish event once the file has been created
  busboy.on("finish", () => {
    let promises = [];
    imagesToBeUploaded.forEach((doc, index) => {
      promises.push(
        admin
          .storage()
          .bucket(`${config.storageBucket}`)
          .upload(doc.filepath, {
            resumable: false,
            metadata: {
              metadata: {
                contentType: doc.mimetype,
                //Generate token to be appended to imageUrl
                firebaseStorageDownloadTokens: generatedToken,
              },
            },
          })
      );
    });
    Promise.allSettled(promises)
      .then(() => {
        console.log(imageUrls);
        return response.json({
          message: "image/s uploaded successfully",
          imageUrls: imageUrls,
        });
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  });
  busboy.end(request.rawBody);
};
//UPLOAD FILES

exports.uploadFile = (request, response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const busboy = new BusBoy({ headers: request.headers });
  let fileToBeUploaded = {};
  let filesToBeUploaded = [];
  let fileUrl;
  let fileUrls = [];
  let fileName;
  let fileNameFinal;

  let generatedToken;

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    generatedToken = uuid();
    console.log(filename);
    fileNameFinal = filename

    const fileName = filename.split(".")[filename.split(".").length - 1];
    finalFileName = `${Math.round(
      Math.random() * 100000000000
    )}.${fileName}`;

    const filepath = path.join(os.tmpdir(), finalFileName);
    console.log(fileName);
    console.log(filepath);

    // now we have an object created we can use the filesystem library to create the image
    fileToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
    filesToBeUploaded.push(fileToBeUploaded);
    fileUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${finalFileName}?alt=media&token=${generatedToken}`;
    fileUrls.push(fileUrl);
  });
  //this is the finish event once the file has been created
  busboy.on("finish", () => {
    let promises = [];
    filesToBeUploaded.forEach((doc, index) => {
      promises.push(
        admin
          .storage()
          .bucket(`${config.storageBucket}`)
          .upload(doc.filepath, {
            resumable: false,
            metadata: {
              metadata: {
                contentType: doc.mimetype,
                firebaseStorageDownloadTokens: generatedToken,
              },
            },
          })
      );
    });
    Promise.allSettled(promises)
      .then(() => {
        console.log(fileUrls);
        return response.json({
          message: "File uploaded successfully",
          fileUrls: fileUrls,
          filename : fileNameFinal
        });
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  });

  busboy.end(request.rawBody);
};

//DELETE PROFILE
//TODO: delete emails also
exports.deleteProfile = (request, response) => {
  const document = db.doc(`/profiles/${request.params.profileId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Profile not found" });
      }

      if (doc.data().handle !== request.user.handle) {
        return response.status(403).json({ error: "Unauthorized" });
      } else {
        document.delete();
        db.doc(`/users/${request.user.handle}`)
          .update({ profileCreated: false })
          .then(() => {
            return response.json({ message: "Profile deleted successfully" });
          })
          .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({ error: err.code });
    });
};

//DELETE USER IN FULL
exports.deleteUser = (request, response) => {
  const userDetails = {
    userId: request.params.userId,
    handle: request.params.handle,
  };
  //Delete Profile
  const profile = db.doc(`/profiles/${userDetails.userId}`);
  profile
    .get()
    .then((doc) => {
      if (!doc.exists) {
        deleteJobFunc();
      } else if (doc.data().handle !== userDetails.handle) {
        deleteJobFunc();
      } else {
        profile
          .delete()
          .then(() => {
            deleteJobFunc();
          })
          .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({ error: err.code });
    });

  //Delete Jobs
  deleteJobFunc = () => {
    db.collection("job")
      .where("userId", "==", userDetails.userId)
      .get()
      .then((data) => {
        if (data.size <= 0) {
          deleteUserFunc();
        } else {
          data.forEach((doc) => {
            doc.ref.delete();
          });
          deleteUserFunc();
        }
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  };
  //Delete User
  deleteUserFunc = () => {
    const users = db.doc(`/users/${userDetails.handle}`);
    users
      .get()
      .then((doc) => {
        if (!doc.exists) {
          deleteUserDB();
        } else if (doc.data().handle !== request.user.handle) {
          return response.status(403).json({ error: "Unauthorized" });
        } else {
          users
            .delete()
            .then(() => {
              deleteUserDB();
            })
            .catch((err) => {
              console.error(err);
              return response.status(500).json({ error: err.code });
            });
        }
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  };

  //Delete auth details from DB
  deleteUserDB = () => {
    firebase
      .auth()
      .currentUser.delete()
      .then((data) => {
        console.log("Successfully deleted user");
        return response.json({ message: "Profile deleted successfully" });
      })
      .catch((err) => {
        console.log("Error deleting user:", err);
        return response.status(500).json({ error: err.code });
      });
  };
};
