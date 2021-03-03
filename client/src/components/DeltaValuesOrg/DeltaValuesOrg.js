import React from "react";
import styles from "./DeltaValuesOrg.module.scss"
import deltaTriangle from "../../assets/images/deltaTriangle.png";

const DeltaValuesOrg = (props) => {
  return (
    <div className={`d-flex ${styles.deltaValuesContainer}`}>
      <div className={`mr-4 ${styles.container}`}>
        <span className={`${styles.title}`}>
          <img className={`${styles.deltaIcon}`} src={deltaTriangle} alt="delta"></img>Q:
        </span>
        <span className={`${styles.value}`} style={{ color: "#7df289" }}>+5,51%</span>
      </div>

      <div className={`${styles.container}`}>
        <span className={`${styles.title}`}>
          <img className={`${styles.deltaIcon}`} src={deltaTriangle} alt="delta"></img>Y:
        </span>
        <span className={`${styles.value}`} style={{ color: "#ff5b4f" }}>+5,51%</span>
      </div>
    </div>
  )
}
export default DeltaValuesOrg;