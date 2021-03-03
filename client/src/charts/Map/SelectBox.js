import React from "react";
import styles from "./Map.module.scss";
const SelectBox = props => {
  const getMode = e => {
    console.log("here*********");
    console.log(e.target.value);
    props.getSelectBoxMode(e.target.value);
  };
  return (
    <div>
      <select
        className={`${styles.selectboxPalette}`}
        onChange={e => getMode(e)}
      >
        {" "}
        <option value='ytm'>View as YTM</option>
        <option value='ytm'>YTM</option>
        <option value='ytm'>MTD</option>
       
        {/* <option value='mtm'>View as MTM</option> */}
      </select>
    </div>
  );
};

export default SelectBox;
