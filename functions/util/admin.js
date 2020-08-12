const admin = require("firebase-admin");
// admin.initializeApp();

// need to get rid of this when launching

var serviceAccount = require("../admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tradeconnect-ab140.firebaseio.com"
});



const db = admin.firestore();
module.exports = {admin, db}


