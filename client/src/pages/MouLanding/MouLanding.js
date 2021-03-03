import React from 'react';

import styles from "./MouLanding.module.scss"
import KpisList from "../../components/Mou/KpisList/KpiList"
import { getColor } from "../../utility/utility";
import environment from "../../environment";


function MouLanding() {
  document.title = 'MOU | BPCL';
  const mouMandatoryKpis = {
    title: "Mandatory Kpis",
    //kpiList: ["Turnover", "Operating Profit", "ROI"]
    kpiList: [
      { kpi_name: "Turnover", kpi_chart_type: "line", url: `${environment.PLANNING_KPI_URL}/mandatory/data/turnover` },
      { kpi_name: "Operating Profit", kpi_chart_type: "bar", url: `${environment.PLANNING_KPI_URL}/mandatory/data/operating profit"`},
      { kpi_name: "ROI", kpi_chart_type: "line", url: `${environment.PLANNING_KPI_URL}/mandatory/data/ROI` },
    ]
  }
  console.log("turnover", mouMandatoryKpis);
  const mouOtherKpis = {
    title: "Others",
    kpiList: [
      { kpi_name: "Crude Throughput", kpi_chart_type: "line" },
      { kpi_name: "Operation Availability", kpi_chart_type: "bar" },
      { kpi_name: "Ethanol Blending", kpi_chart_type: "bar" },
      { kpi_name: "Digital Payment at RO LPG", kpi_chart_type: "line" },
      { kpi_name: "% of NANO Retail outlet", kpi_chart_type: "line" },
      { kpi_name: "Capex", kpi_chart_type: "line" },
      { kpi_name: "PNG Connections", kpi_chart_type: "line" },
      { kpi_name: "CNG stations", kpi_chart_type: "line" },
      { kpi_name: "Initiative for Women", kpi_chart_type: "line" },
      { kpi_name: "5&4 star LPG distributors", kpi_chart_type: "bar" },
    ]
  }

  return (

    <div className={`container p-0 border ${styles.landing}`}>
      <div className={`d-flex align-items-center justify-content-center ${styles.kpi_section_header_container}`}>
        <span>MOU</span>
      </div>
      <div className={`row m-0 d-flex flex-row justify-content-between align-items-stretch ${styles.kpi_section_overview_container}`}>
        <div className={`col-6 m-0 p-0 pl-2 d-flex align-items-center justify-content-center ${styles.kpi_section_overview_left}`}>
          <span className={`${styles.performance_title}`}>Overall Performance: </span>
          <span className={`${styles.performance_value}`} style={{ color: getColor("good") }}>Good</span>
        </div>
        <div className={`col-6 m-0 p-0 pr-2 d-flex align-items-center justify-content-center ${styles.kpi_section_overview_right}`}>
          <span className={styles.score_title}>Score:</span>
          <span className={styles.score_value}>76/100</span>
        </div>
      </div>
      <KpisList kpiListData={mouMandatoryKpis}></KpisList>
      <KpisList kpiListData={mouOtherKpis}></KpisList>
    </div>
  );
}

export default MouLanding;
