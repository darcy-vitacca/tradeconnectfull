import React from "react";
import dayjs from "dayjs";
import { uuid } from "uuidv4";
import { Link } from "react-router-dom";

const relativeTime = require("dayjs/plugin/relativeTime");
const InboxView = (props, idx) => {
  dayjs.extend(relativeTime);
  if (props.inboxState === false) {
    return (
      <div className="viewMessageHolder" key={uuid()}>
        <div className="viewEmailHeader">
          <p className="emailFontView">
            <b>From : </b>
            <span>{props.message.senderHandle}</span>
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
          {props.message.subject}
        </p>
        <p className="emailFontView">{props.message.body}</p>
        {/* TODO: need to handle file uploads to firebase*/}
        <p className="emailFontView">
          <b>Attachments: </b>{" "}
          {props.message.attachments.map((val) => {
            return (
              <a
                download="charity_key.pdf"
                href={val}
                target="_blank"
                key={uuid()}
              >
                a
              </a>
            );
          })}
        </p>
        <p className="emailFontView">
          Recieved: {dayjs(props.message.createdAt).fromNow()}
        </p>
      </div>
    );
  } else if (props.inboxState === true) {
    return (
      <div className="viewMessageHolder" key={uuid()}>
        <div className="viewEmailHeader">
          <p className="emailFontView">
            <b>To : </b>
            <span>{props.message.recipientHandle}</span>
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
          {props.message.subject}
        </p>
        <p className="emailFontView">{props.message.body}</p>
        {/* TODO: need to handle file uploads to firebase*/}
        <p className="emailFontView">
          <b>Attachments: </b>{" "}
          {props.message.attachments.map((val) => {
            return (
              <a
                download="charity_key.pdf"
                href={val}
                target="_blank"
                key={uuid()}
              >
                a
              </a>
            );
          })}
        </p>
        <p className="emailFontView">
          Sent: {dayjs(props.message.createdAt).fromNow()}
        </p>
      </div>
    );
  }
};

export default InboxView;
