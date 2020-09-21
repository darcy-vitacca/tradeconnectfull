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

//CONTACT FORM

exports.contactForm = (request, response) => {
  console.log(request.body);
  const templateParams = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    state: request.body.state,
    currentEmployer: request.body.currentEmployer ?(request.body.currentEmployer):(""),
    enquiry: request.body.enquiry,
  };
  console.log(templateParams)
  emailjs.send('default_service','template_3t7llpv', templateParams, 'tradeconnect')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    //  return response.json({ message: `Message Successful` });
    }, (err) => {
      console.log('FAILED...', error);
      // return response.status(500).json({ error: `Message Failed` });
    });
};

//SEND MESSAGE
exports.sendMessage = (request, response) => {
  console.log(request.body);
  const message = {
    senderId: request.user.uid,
    senderHandle: request.user.handle,
    senderDeleted: false,
    recipientId: request.body.recipientId,
    recipientHandle: request.body.recipientHandle,
    recipientDeleted: false,
    messageId: "",
    createdAt: new Date().toISOString(),
    subject: request.body.subject,
    body: request.body.body,
    attachments: request.body.attachments,
  };
  console.log(message);
  //create an entry in recipient
  db.collection("messages")
    .add(message)
    .then((doc) => {
      db.doc(`/messages/${doc.id}`)
        .update({ messageId: doc.id })
        .then(() => {
          response.json({ message: `document ${doc.id} created succesfully` });
        })
        .catch((err) => {
          console.error(err);
          return response.status(500).json({ error: err.code });
        });
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};

//GET INBOX
//TODO: need to handle if there is no emails and make sure it runs through properly
exports.getInbox = (request, response) => {
  let inboxAll = [];
  let sentAll = [];
  let errors = {};
  console.log(request.user.uid);
  //Inbox
  db.collection("messages")
    .where("recipientId", "==", request.user.uid)
    .where("recipientDeleted", "==", false)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      if (data.size > 0) {
        data.forEach((entry) => {
          // console.log(entry);
          inboxAll.push({
            messageId: entry.id,
            subject: entry.data().subject,
            body: entry.data().body,
            createdAt: entry.data().createdAt,
            attachments: entry.data().attachments,
            senderHandle: entry.data().senderHandle,
            senderId: entry.data().senderId,
            recipientHandle: entry.data().recipientHandle,
            recipientId: entry.data().recipientId,
          });
        });
      }
      console.log(inboxAll);
      if (inboxAll === undefined || inboxAll.length === 0) {
        inboxAll = "Inbox empty";
        return sentItemCheck();
      } else {
        return sentItemCheck();
      }
    })
    .catch((err) => {
      console.error(err);
      errors = err.code;
      return sentItemCheck();
    });

  // Sent
  sentItemCheck = () => {
    db.collection("messages")
      .where("senderId", "==", request.user.uid)
      .where("senderDeleted", "==", false)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        console.log(data.size);
        if (data.size > 0) {
          data.forEach((entry) => {
            // console.log(entry);
            sentAll.push({
              messageId: entry.id,
              subject: entry.data().subject,
              body: entry.data().body,
              createdAt: entry.data().createdAt,
              attachments: entry.data().attachments,
              senderHandle: entry.data().senderHandle,
              senderId: entry.data().senderId,
              recipientHandle: entry.data().recipientHandle,
              recipientId: entry.data().recipientId,
            });
          });
        }
        if (sentAll === undefined || sentAll.length === 0) {
          sentAll = "No sent items";
          return response.json({ inboxAll, sentAll });
        } else {
          return response.json({ inboxAll, sentAll });
        }
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: errors ? errors : err.code });
      });
  };
};

//DELETE MESSAGE
exports.deleteMessage = (request, response) => {
  const message = {
    messageId: request.params.messageid,
    inboxMethod: request.params.inboxmethod,
  };
  console.log(message);
  //Delete from sender inbox
  if (message.inboxMethod === "sender") {
    db.doc(`/messages/${message.messageId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return response.status(404).json({ error: "Message not found" });
        }
        messageDoc = doc.data();
        console.log(messageDoc);
        if (messageDoc.recipientDeleted === true) {
          db.doc(`/messages/${messageDoc.messageId}`).delete();
          return response.json({ message: `Message deleted` });
        } else if (messageDoc.recipientDeleted === false) {
          db.doc(`/messages/${messageDoc.messageId}`)
            .update({ senderDeleted: true })
            .then(() => {
              return response.json({
                message: `Message deleted from your inbox`,
              });
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
    //Inbox Delete
  } else if (message.inboxMethod === "recipient") {
    db.doc(`/messages/${message.messageId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return response.status(404).json({ error: "Message not found" });
        }
        messageDoc = doc.data();
        console.log(messageDoc);
        if (messageDoc.senderDeleted === true) {
          db.doc(`/messages/${messageDoc.messageId}`).delete();
          return response.json({ message: `Message deleted` });
        } else if (messageDoc.senderDeleted === false) {
          db.doc(`/messages/${messageDoc.messageId}`)
            .update({ recipientDeleted: true })
            .then(() => {
              return response.json({
                message: `Message deleted from your inbox`,
              });
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
  }
};

// TODO: handle resume upload
