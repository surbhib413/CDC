import React from "react";

import styles from "./InfographicKpi3.module.scss";

function InfographicKpi3(props) {
  return (
    <div className={`d-flex align-items-center ${styles.cduContainer}`} style={{top:`${props.top}`, right:`${props.right}`, bottom:`${props.bottom}`, left:`${props.left}`, }}>
      <div className={`d-flex justify-content-center align-items-center ${styles.cduLeft}`}>{props.kpiName}</div>
      <div className={`d-flex justify-content-center align-items-center ${styles.cduRight}`} style={{color:`${props.textColor}`}} >{props.kpiValue}</div>
    </div>

  )
}
export default InfographicKpi3;
