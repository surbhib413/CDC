import React from "react";
import styles from "../../OrgListTile/OrgListTile.module.scss";
import DeltaValuesOrg from "../../DeltaValuesOrg/DeltaValuesOrg";

const OrgListPP = () => {
  return (
    <div>
      <div className={`d-flex align-items-center ${styles.CollapsedListItemContainer}`}>
        <div className={`${styles.kpiTitle}`}>Revenue / Employee</div>
        <div className={`${styles.kpiValue}`}>35,450 Cr INR</div>
        <div className={`${styles.deltaComponent}`}>
          <DeltaValuesOrg></DeltaValuesOrg>
        </div>
      </div>
      <div className={`d-flex align-items-center ${styles.CollapsedListItemContainer}`}>
      <div className={`${styles.kpiTitle}`}>Opex / Employee</div>
      <div className={`${styles.kpiValue}`}>35,450 Cr INR</div>
      <div className={`${styles.deltaComponent}`}>
        <DeltaValuesOrg></DeltaValuesOrg>
      </div>
      </div>
      <div className={`d-flex align-items-center ${styles.CollapsedListItemContainer}`}>
      <div className={`${styles.kpiTitle}`}>EBITDA / Employee</div>
      <div className={`${styles.kpiValue}`}>35,450 Cr INR</div>
      <div className={`${styles.deltaComponent}`}>
        <DeltaValuesOrg></DeltaValuesOrg>
      </div>
      </div>
    </div>
  )
}
export default OrgListPP;