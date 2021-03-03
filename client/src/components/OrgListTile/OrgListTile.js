import React from "react";
import styles from "./OrgListTile.module.scss";
import DeltaValuesOrg from "../DeltaValuesOrg/DeltaValuesOrg";

const OrgListTile = () => {
  return (
    <div>
      <div className={`d-flex align-items-center ${styles.CollapsedListItemContainer}`}>
        <div className={`${styles.kpiTitle}`}>Total Oil Bond Holding</div>
        <div className={`${styles.kpiValue}`}>35,450 Cr INR</div>
        <div className={`${styles.deltaComponent}`}>
          <DeltaValuesOrg></DeltaValuesOrg>
        </div>
      </div>
      <div className={`d-flex align-items-center ${styles.CollapsedListItemContainer}`}>
      <div className={`${styles.kpiTitle}`}>Total Capital Employed</div>
      <div className={`${styles.kpiValue}`}>35,450 Cr INR</div>
      <div className={`${styles.deltaComponent}`}>
        <DeltaValuesOrg></DeltaValuesOrg>
      </div>
      </div>
    </div>
  )
}
export default OrgListTile;