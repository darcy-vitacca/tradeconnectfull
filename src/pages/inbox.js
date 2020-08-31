//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../css/inbox_settings_help.css";
//Redux
import { getInbox, deleteMessage } from "../redux/actions/userActions";
//Functions
//Packages
import { uuid } from "uuidv4";
import ReactTooltip from "react-tooltip";
import { ScaleLoader } from "react-spinners";
//Components
import InboxItem from "../components/inbox/inbox_item";
import InboxView from "../components/inbox/inbox_view_reply_send";
class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      inboxState: false,
      viewEmail: false,
      viewEmailCurr: [],
      replyEmail: false,
      replyInboxCurr: [],
      replySent: false,
      replySentCurr: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  componentDidMount() {
    this.props.getInbox(this.props.user.credentials.userId);
  }

  clickOnDelete = (item, inboxMethod) => {
    this.props.deleteMessage(item.messageId, inboxMethod);
  };

  toggleInbox = () => {
    this.setState(
      {
        inboxState: !this.state.inboxState,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  replyEmail = (email) => {
    console.log("here");
    console.log(email);
  };
  replySentEmail = () => {};

  viewEmail = (email) => {
    console.log("here");
    console.log(email);
    this.setState(
      {
        viewEmail: true,
        viewEmailCurr: email,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  viewSentEmail = () => {};

  closeEmail = () => {
    this.setState ({
      viewEmail: false,
      viewEmailCurr: [],
      replyEmail: false,
      replyInboxCurr: [],
      replySent: false,
      replySentCurr: [],
    });
  };

  render() {
    let {
      UI: { loading },
      user: {
        authenticated,
        inbox: { inboxAll, sentAll },
      },
    } = this.props;
    let {
      inboxState,
      viewEmail,
      viewEmailCurr,
      replyEmail,
      replyInboxCurr,
      replySent,
      replySentCurr,
    } = this.state;
    let helpMarkup = !loading ? (
      !authenticated ? (
        this.props.history.push("/login")
      ) : (
        <div className="profileBody">
          <div className="accountContainer">
            {!inboxState ? (
              <h1 className="accountHeader">Inbox</h1>
            ) : (
              <h1 className="accountHeader">Sent Items</h1>
            )}
            <div className="accountCont">
              {viewEmail  ? <InboxView message={viewEmailCurr} key={uuid()} closeEmail={this.closeEmail.bind(this)}/> : null}
              <div className="inboxButtons">
                <button
                  onClick={this.toggleInbox}
                  id="inboxButton"
                  disabled={inboxState !== true}
                  className="inboxButtonToggle"
                >
                  Inbox : {inboxAll !== undefined ? inboxAll.length : 0}
                </button>
                <button
                  onClick={this.toggleInbox}
                  id="sentButton"
                  disabled={inboxState}
                  className="inboxButtonToggle"
                >
                  Sent: {sentAll !== undefined ? sentAll.length : 0}{" "}
                </button>
              </div>

              <table className="inbox">
                <tr>
                  {!inboxState ? (
                    <th className="col1">From</th>
                  ) : (
                    <th className="col1">To</th>
                  )}
                  <th className="col2">Subject</th>
                  <th className="col3">Date</th>
                  <th className="col4">Reply</th>
                  <th className="col5">
                    <img
                      className="inboxDeleteIcon"
                      src={require("../images/deletedash.png")}
                      alt="profile"
                    ></img>{" "}
                  </th>
                </tr>
                {!inboxState ? (
                  inboxAll !== undefined ? (
                    inboxAll === "Inbox empty" ? (
                      <p>{inboxAll}</p>
                    ) : (
                      <InboxItem
                        reply={this.replyEmail.bind(this)}
                        view={this.viewEmail.bind(this)}
                        inboxAll={inboxAll}
                        key={uuid()}
                        delete={this.clickOnDelete.bind(this)}
                      />
                    )
                  ) : (
                    <p>loading</p>
                  )
                ) : sentAll !== undefined ? (
                  sentAll === "No sent items" ? (
                    <p>{sentAll}</p>
                  ) : (
                    <InboxItem
                      reply={this.replySentEmail.bind(this)}
                      view={this.viewSentEmail.bind(this)}
                      sentAll={sentAll}
                      key={uuid()}
                      delete={this.clickOnDelete.bind(this)}
                    />
                  )
                ) : (
                  <p>loading</p>
                )}
              </table>
            </div>
          </div>
        </div>
      )
    ) : (
      <p>...loading</p>
    );
    return <div>{helpMarkup}</div>;
  }
}
Inbox.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});
const mapActionsToProps = {
  getInbox,
  deleteMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(Inbox);
