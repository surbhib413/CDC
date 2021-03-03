import React, { Component } from "react";
import btn from "./backImg.png";
import styles from "./Map.module.scss";
class BackButton extends Component {
  state = {};

  render() {
    return (
      <div>
        <img
          alt="Back"
          src={btn}
          value='Back'
          className={`${styles.backBtn}`}
          onClick={e => this.props.backClickHandler(e)}
        />
      </div>
    );
  }
}

export default BackButton;
