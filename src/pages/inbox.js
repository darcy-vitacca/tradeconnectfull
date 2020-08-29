//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Redux
//Functions
//Packages
import { uuid } from "uuidv4";
import ReactTooltip from "react-tooltip";
import { ScaleLoader } from "react-spinners";

class Inbox extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  componentDidMount() {}

  inboxItem() {
    return (
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
        <td>
          <img
            className="inboxReplyIcon"
            src={require("../images/reply.png")}
            alt="profile"
          ></img>
        </td>
        <td>
          <img
            className="inboxDeleteIcon"
            src={require("../images/deletedash.png")}
            alt="profile"
          ></img>
        </td>
      </tr>
    );
  }

  readEmail() {}

  render() {
    let {
      UI: { loading },
      user: { authenticated },
    } = this.props;
    let helpMarkup = !loading ? (
      !authenticated ? (
        this.props.history.push("/login")
      ) : (
        <div className="profileBody">
          <div className="accountContainer">
            <h1 className="accountHeader">Inbox</h1>
            <div className="accountCont">
              <table className="inbox">
                <tr>
                  <th className="col1">From</th>
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
                {this.inboxItem()}
                
              
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
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Inbox);
