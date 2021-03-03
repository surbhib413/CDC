import React from "react";

import styles from "./InfographicKpiRound.module.scss";

function InfographicKpiRound(props) {
  return (
    <div className={`d-flex align-items-center flex-column ${styles.cduContainer}`} style={{top:`${props.top}`, right:`${props.right}`, bottom:`${props.bottom}`, left:`${props.left}`, }}>
      <div className={`d-flex justify-content-center align-items-center ${styles.cduLeft}`}>{props.kpiName}</div>
      <div className={`d-flex justify-content-center align-items-center ${styles.cduRight}`} style={{color:`${props.textColor}`}} >{props.kpiValue}</div>
    </div>

  )
}
export default InfographicKpiRound;
