import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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

// <h1>Here</h1>
// <div className="carouselImageCont">

// <div className="imageContCarousel">
// <img
//     className="carouselImage"
//     src={require("../../../images/carouseltest.jpg")}
//     alt="arrows img nave"
//   ></img>

// </div>

// <div className="arrowsContLeft">
// <div className="arrowsCircleLeft">
//   <img
//     className="arrowsCarouselLeft"
//     src={require("../../../images/arrowleft.png")}
//     alt="arrows img nave"
//   ></img>
// </div>
// </div>

// <div className="arrowsContRight">
// <div className="arrowsCircleRight">
//   <img
//     className="arrowsCarouselRight"
//     src={require("../../../images/arrowright.png")}
//     alt="arrows img nav"
//   ></img>
// </div>

// </div>

// </div>
