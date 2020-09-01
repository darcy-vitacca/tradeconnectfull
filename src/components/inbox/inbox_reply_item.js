//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { uuid } from "uuidv4";
import { Link } from "react-router-dom";

const relativeTime = require("dayjs/plugin/relativeTime");
const InboxView = (props, idx) => {
  console.log(props);
  dayjs.extend(relativeTime);
  let {
    recipientHandle,
    subject,
    body,
    createdAt,
    recipientId,
    messageState,
  } = props.emailDraft;
  if (props.inboxState === false) {
    return (
      <div className="viewMessageHolder" data-id={idx} key={idx}>
        <form onSubmit={props.sendEmail} onChange={props.handleChange}>
          <div className="viewEmailHeader">
            <p className="emailFontView">
              {!messageState ? (<b>Send a message to :</b>) : (<b>Replying to :</b>)} 
              <span>{recipientHandle}</span>
            </p>
            <div>
              <img
                data-id={idx}
                className="inboxDeleteIcon"
                src={require("../../images/deletedash.png")}
                alt="profile"
                onClick={() => {
                  props.closeEmail();
                }}
              ></img>
            </div>
          </div>

          <p className="emailFontView">
            <b>Subject : </b>
            <input
              data-id={idx}
              name="subject"
              defaultValue={subject}
              required
            ></input>
          </p>
          <p className="emailFontView">
            <b>Body :</b>{" "}
          </p>
          <textarea
            className="replyMessageTextArea"
            data-id={idx}
            name="body"
            defaultValue={body}
            required
          ></textarea>
          {/* TODO: need to handle file uploads to firebase*/}
          <div className="replyEmailFooter">
            <p className="emailFontView">
              <b>Add attachments : </b>{" "}
              <input data-id={idx} name="attachments" type="file"></input>
            </p>
            <button type="submit" className="sendEmailButton">
              Reply
            </button>
          </div>

          {!messageState ? null : (
            <p className="emailFontView">
              Recieved: {dayjs(createdAt).fromNow()}
            </p>
          )}
        </form>
      </div>
    );
  } else if (props.inboxState === true) {
    return (
      <div className="viewMessageHolder" data-id={idx} key={idx}>
        <form onSubmit={props.sendEmail} onChange={props.handleChange}>
          <div className="viewEmailHeader">
            <p className="emailFontView">
              <b>Replying to : </b>
              <span>{recipientHandle}</span>
            </p>
            <div>
              <img
                data-id={idx}
                className="inboxDeleteIcon"
                src={require("../../images/deletedash.png")}
                alt="profile"
                onClick={() => {
                  props.closeEmail();
                }}
              ></img>
            </div>
          </div>

          <p className="emailFontView">
            <b>Subject : </b>
            <input
              data-id={idx}
              name="subject"
              defaultValue={subject}
              required
            ></input>
          </p>
          <p className="emailFontView">
            <b>Body :</b>{" "}
          </p>
          <textarea
            className="replyMessageTextArea"
            data-id={idx}
            name="body"
            defaultValue={body}
            required
          ></textarea>
          {/* TODO: need to handle file uploads to firebase*/}
          <div className="replyEmailFooter">
            <p className="emailFontView">
              <b>Add attachments : </b>{" "}
              <input data-id={idx} name="attachments" type="file"></input>
            </p>
            <button type="submit" className="sendEmailButton">
              Reply
            </button>
          </div>

          <p className="emailFontView">
            Recieved: {dayjs(createdAt).fromNow()}
          </p>
        </form>
      </div>
    );
  }
};

export default InboxView;
