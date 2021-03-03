import React, { useEffect } from 'react';
import styles from "./ItrmDemurrage.module.scss";
import DemurrageGraph from "./DemurrageGraph";

function ItrmDemurrage(props) {

  useEffect(() => {
  }, [props.demurrageData])

  return (
    <div className={`${styles.itrmDemurrageContainer}`}>
      <div className={`d-flex justify-content-between align-items-center ${styles.headerContainer}`}>
        <div className={`d-flex flex-column justify-content-between ${styles.headerLeft}`}>
          <div className={`${styles.heading}`}>
            <span>Demurrage (Hours)</span>
          </div>
          <div className={`d-flex ${styles.labels}`}>
            <div className="d-flex align-items-center mr-3">
              <span className={`mr-2 ${props.location === "mumbai" ? styles.lpMumbaiDot : styles.lpKochiDot}`}></span>LP
            </div>
            <div className="d-flex align-items-center mx-3">
              <span className={`mr-2 ${props.location === "mumbai" ? styles.dpMumbaiDot : styles.dpKochiDot}`}></span>DP
            </div>
          </div>
        </div>
        <div className={`${styles.headerRight}`}>
          <span className={`${props.location === "mumbai" ? styles.mumbaiColor : styles.kochiColor}`}>     --- YTM : 33 Hr,R 1.7 Cr </span>
        </div>
      </div>
      <div className={`d-flex ${styles.graphContainer}`}>
        <DemurrageGraph demurrageData={props.demurrageData} location={props.location}></DemurrageGraph>
      </div>
    </div>
  )
}
export default ItrmDemurrage;