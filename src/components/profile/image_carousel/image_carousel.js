//Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uuid } from "uuidv4";


class ImageCarousel extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  backFunc = () => {
    if (this.state.index === 0) {
      this.setState({ index: this.props.bestWork.length - 1 });
    } else {
      this.setState({ index: this.state.index - 1 });
    }
  };

  forwardFunc = () => {
    if (this.state.index === this.props.bestWork.length - 1) {
      this.setState({ index: 0 });
    } else {
      this.setState({ index: this.state.index + 1 });
    }
  };
  sendMessageToInbox = (userId) => {
    this.props.sendMessage(userId.userId, userId.handle);
  };

  render() {
    let { desc, imageUrl, header, index } = this.props.bestWork[
      this.state.index
    ];

    return (
      <div className="carouselContainer">
        <img
          className="carouselImage"
          src={imageUrl}
          alt="best work image"
        ></img>
        <div className="arrows">
          <img
            className="arrowsCircleLeft"
            onClick={this.backFunc}
            src={require("../../../images/arrowLeft2.png")}
            alt="arrows img nav"
          ></img>

          <img
            className="arrowsCircleRight"
            onClick={this.forwardFunc}
            src={require("../../../images/arrowRight2.png")}
            alt="arrows img nav"
          ></img>
        </div>
        <h4>{header}</h4>
        <p>{desc}</p>
        <div className="contactPersonBtn">
          <button
            id="contactPersonButton"
            onClick={()=>{this.sendMessageToInbox({
                userId: this.props.userId,
                handle: this.props.handle,
              })}}
            key={uuid()}
          >
            Contact
          </button>
        </div>
      </div>
    );
  }
}
ImageCarousel.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

export default connect(mapStateToProps)(ImageCarousel);
