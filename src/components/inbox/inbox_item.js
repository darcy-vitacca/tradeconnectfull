import React from "react";
import dayjs from "dayjs";
import { uuid } from "uuidv4";

const relativeTime = require("dayjs/plugin/relativeTime");
const InboxItem = (props) => {
  if (props.inboxAll) {
    return props.inboxAll.map((val, idx) => {
      dayjs.extend(relativeTime);
      return (
        <tr data-id={idx} key={uuid()}>
          <td
            data-id={idx}
            onClick={() => {
              props.view(val);
            }}
          >
            {val.senderHandle}
          </td>
          <td
            data-id={idx}
            onClick={() => {
              props.view(val);
            }}
          >
            {val.subject}
          </td>
          <td
            data-id={idx}
            onClick={() => {
              props.view(val);
            }}
          >
            {dayjs(val.createdAt).fromNow()}
          </td>
          <td data-id={idx}>
            <img
              data-id={idx}
              className="inboxReplyIcon"
              src={require("../../images/reply.png")}
              alt="profile"
              onClick={() => {
                props.reply(val);
              }}
            ></img>
          </td>
          <td>
            <img
              data-id={idx}
              className="inboxDeleteIcon"
              src={require("../../images/deletedash.png")}
              alt="profile"
              onClick={() => {
                if (
                  window.confirm(`Are you sure you want to  delete this email?`)
                )
                  props.delete(val, "recipient");
              }}
            ></img>
          </td>
        </tr>
      );
    });
  } else if (props.sentAll) {
    return props.sentAll.map((val, idx) => {
      dayjs.extend(relativeTime);
      return (
        <tr data-id={idx} key={uuid()}>
          <td
            data-id={idx}
            onClick={() => {
              props.view(val);
            }}
          >
            {val.recipientHandle}
          </td>
          <td
            data-id={idx}
            onClick={() => {
              props.view(val);
            }}
          >
            {val.subject}
          </td>
          <td
            data-id={idx}
            onClick={() => {
              props.view(val);
            }}
          >
            {dayjs(val.createdAt).fromNow()}
          </td>
          <td data-id={idx}>
            <img
              data-id={idx}
              className="inboxReplyIcon"
              src={require("../../images/reply.png")}
              alt="profile"
              onClick={() => {
                props.reply(val);
              }}
            ></img>
          </td>
          <td>
            <img
              data-id={idx}
              className="inboxDeleteIcon"
              src={require("../../images/deletedash.png")}
              alt="profile"
              onClick={() => {
                if (
                  window.confirm(`Are you sure you want to  delete this email?`)
                )
                  props.delete(val, "sender");
              }}
            ></img>
          </td>
        </tr>
      );
    });
  }
};

export default InboxItem;
