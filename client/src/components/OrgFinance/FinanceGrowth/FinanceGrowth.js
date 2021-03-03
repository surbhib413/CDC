import React from "react";
import styles from "./FinanceGrowth.module.scss";
// import ExpandIcon from "../../../assets/images/expandIcon.png"
import GrowthKpi1 from "../GrowthKpi1/GrowthKpi1";
import SalesKpi from "../SalesKpi/SalesKpi";

const FinanceGrowth = () => {
  return (
    <div className={`${styles.growthContainer}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.growthHeader}`}>
        <span>Growth</span>
        {/*<img src={ExpandIcon} alt="Expand Growth KPIs"></img>*/}
      </div>
      <div className={`d-flex ${styles.growthContentContainer}`}>
        <GrowthKpi1 kpiName="Throughput"></GrowthKpi1>
        <GrowthKpi1 kpiName="CAGR"></GrowthKpi1>
        <GrowthKpi1 kpiName="GRM"></GrowthKpi1>
        <SalesKpi kpiName="Sales"></SalesKpi>
        <div></div>
      </div>
    </div>
  )
}
export default FinanceGrowth;