import React, { Component } from "react";
import boat from "./boat.png";

class Marker extends Component {
  state = {};

  render() {
    return (
      <div>
        <img
          src={boat}
          alt='boat'
          style={{
            position: "absolute",
            top: "45%",
            left: "10%",
            zIndex: 1000,
            width: "75px"
          }}
        />
      </div>
    );
  }
}

export default Marker;
