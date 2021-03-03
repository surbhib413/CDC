import React, { useEffect, useState } from "react";
import styles from "./BuLubesLossGainAnalysis.module.scss";
import expandIcon from "../../../assets/images/expandIcon.png";
import { Spinner } from "react-bootstrap";
import LubesLossGainAnalysisGraph from "./LubesLossGainAnalysisGraph"
import environment from "../../../environment";

function BuLubesLossGainAnalysis(props) {
  const [graphData, setGraphData] = useState([]);

  const prepareGraphData = () => {
    let url = `${environment.BU_KPI_URL}/loss_gain/data?level=country&data_type=ytm&business_unit=lubes`;
    fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(response => {
        setGraphData(response.data);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    prepareGraphData();
  }, [props.activeTab])

  return (
    <div className={`${styles.BuLubesLossGainAnalysisContiner}`}>
      <div className={`d-flex flex-column justify-content-center ${styles.BuCcsHeader}`}>
        <div className={`${styles.HeaderTop}`}>Loss & Gain Analysis</div>
        <div className={`d-flex ${styles.legendsContainer}`}>
          <div className="mr-4 d-flex align-items-center">
            <span className={`mr-2 ${styles.dot1}`}></span>Blending
          </div>
          <div className="mr-4 d-flex align-items-center">
            <span className={`mr-2 ${styles.dot2}`}></span>Bulk Material
          </div>
          <div className="mr-4 d-flex align-items-center">
            <span className={`mr-2 ${styles.dot3}`}></span>Financial Goods
          </div>
          <div className="mr-3 d-flex align-items-center">
            <span className={`mr-2 ${styles.dot4}`}></span>Packing Material
          </div>
        </div>
      </div>
      <div className={`d-flex ${styles.graphContainer}`}>
        {
          graphData ?
            <LubesLossGainAnalysisGraph graphData={graphData}></LubesLossGainAnalysisGraph>
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
        }
      </div>
      <div className={`d-flex justify-content-end`}>
        <img src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div >
  )
}
export default BuLubesLossGainAnalysis;