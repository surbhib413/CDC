import React from "react";

import styles from "./InfographicKpi4.module.scss";

function InfographicKpi4(props) {
  return (
    <div className={`d-flex justify-content-center align-items-center ${styles.ytdMtd}`} style={{ top: `${props.top}`, right: `${props.right}`, bottom: `${props.bottom}`, left: `${props.left}`, }}>
      <div className={`d-flex px-1 align-items-center ${styles.ytd}`}>
        <span className={`${styles.value}`} style={{color:`${props.textColor}`}}>{props.crudeProcYtmData}</span>
        <span className={`${styles.percentage}`} style={{color:`${props.crudeProcYtmColor}`}}>{props.crudeProcYtmDelta}%</span>
      </div>
      <div className={`d-flex px-1 align-items-center ${styles.mtd}`}>
        <span className={`${styles.value}`} style={{color:`${props.textColor}`}}>{props.crudeProcMtdData}</span>
        <span className={`${styles.percentage}`} style={{color:`${props.crudeProcMtdColor}`}}  >{props.crudeProcMtdDelta}%</span>
      </div>
    </div>
  )
}
export default InfographicKpi4;
