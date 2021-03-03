import React from "react";
import styles from "./GrowthKpi1.module.scss";
import DeltaValuesOrg from "../../DeltaValuesOrg/DeltaValuesOrg";
import GrowthKpiGraph1 from "./GrowthKpiGraph1";

const GrowthKpi1 = (props) => {
  return (
    <div className={`${styles.GrowthKpi1Container}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.GrowthKpi1Header}`}>
        <div className={`${styles.kpiTitle}`}>{props.kpiName}</div>
        <div className={`d-flex flex-column ${styles.kpiOverallDetails}`}>
          <span className={`${styles.totalValues}`}>Total: $5.44/Bbl</span>
          <DeltaValuesOrg></DeltaValuesOrg>
        </div>
      </div>
      <div className={`${styles.GrowthKpi1ContentContainer}`}>
        <div className={`pt-2 ${styles.headerContainer}`}>
          <div className={`mt-2 d-flex align-items-right ${styles.headerLabels}`}>
            <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot1}`}></span>FY 19</div>
            <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot2}`}></span>FY 20</div>
            <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot3}`}></span>Target</div>
            {
              props.kpiName === 'GRM' && <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot4}`}></span>ARGM</div>
            }

          </div>
        </div>
        <div className={`${styles.graphContainer}`}>
          <GrowthKpiGraph1 kpiName={props.kpiName} ></GrowthKpiGraph1>
        </div>
      </div>
    </div>

  )
}
export default GrowthKpi1;