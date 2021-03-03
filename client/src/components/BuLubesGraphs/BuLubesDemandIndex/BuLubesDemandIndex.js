import React from "react";
import styles from "./BuLubesDemandIndex.module.scss"


function BuLubesDemandIndex() {
  return (
    <div className={`${styles.BuLubesDemandIndexContainer}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.BuCcsHeader}`}>
        <div className={`${styles.BuCcsHeaderLeft}`}>Demand Fulfilment Index</div>
        {/* <div className={` d-flex flex-column justify-content-center ${styles.BuCcsHeaderRight}`}>
          <span className={`${styles.BuCcsHeaderResolved}`}>80 Total Depos</span>
        </div> */}
      </div>
      <div className={`d-flex align-items-center ${styles.graphContainer}`}>
        {/* <LubesDicountVsSalesBubbleChart></LubesDicountVsSalesBubbleChart> */}
      </div>
      {/* <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div> */}
    </div>
  )
}
export default BuLubesDemandIndex;