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
          <div className="inboxHeader">
            <div className="inboxFrom">
            <h4>From</h4>

            </div>
            <div className="inboxSubject">
            <h4>Subject</h4>

            </div>
            <div className="inboxCreatedAt">
            

            </div>
       
       

          </div>
       

        </div>
       
        


        </div>
        
      </div>
      )
    ) : (
      <p>...loading</p>
    );
    return (<div>{helpMarkup}</div>);
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
