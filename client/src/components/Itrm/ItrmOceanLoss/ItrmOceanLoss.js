import React, { useEffect } from 'react';
import styles from "./ItrmOceanLoss.module.scss";
import { Spinner } from "react-bootstrap";
import OceanLossGraph from "./OceanLossGraph";


function ItrmOceanLoss(props) {

  useEffect(() => {
  }, [props.oceanLossData]);

  return (
    <div className={`${styles.itrmOceanLossContainer}`}>
      <div className={`d-flex justify-content-between align-items-center ${styles.headerContainer}`}>
        <div className={`d-flex flex-column justify-content-between align-items-center ${styles.headerLeft}`}>
          <span className={`${styles.heading}`}>Ocean Loss (%)</span>
        </div>
        <div className={`${styles.headerRight}`}>
          <span className={`${props.location === "mumbai" ? styles.mumbaiTheme : styles.kochiTheme}`}>--- YTM : 0.5%</span>
        </div>
      </div>
      <div className={`d-flex ${styles.graphContainer}`}>
        {
          props.oceanLossData.length === 0 ?
            <Spinner animation='border' role='status'>
              <span className='sr-only'>Loading...</span>
            </Spinner> :
            <OceanLossGraph oceanLossData={props.oceanLossData} location={props.location}></OceanLossGraph>
        }

      </div>
    </div>
  )
}
export default ItrmOceanLoss;