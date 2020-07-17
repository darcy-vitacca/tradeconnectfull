const admin = require("firebase-admin");
// admin.initializeApp();

//HAVE TO REMOVE THIS IF EVER LAUNCHED
const serviceAccount = require("../admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tradeconnect-ab140.firebaseio.com",
});
const db = admin.firestore();

module.exports = {admin, db}
