import React from "react";
import styles from "./SalesKpi.module.scss";
import SalesKpiGraph from './SalesKpiGraph';
import DeltaValuesOrg from "../../DeltaValuesOrg/DeltaValuesOrg";

const SalesKpi = (props) => {
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
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.HpclDot}`}></span>Domestic</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.IoclDot}`}></span>Export</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.ShellDot}`}></span>Total</div>
                    </div>
                </div>
                <div className={`${styles.graphContainer}`}>
                    <SalesKpiGraph kpiName={props.kpiName} ></SalesKpiGraph>
                </div>
                
            </div>
        </div>
    )
}
export default SalesKpi;