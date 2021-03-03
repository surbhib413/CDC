import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import BuLubesOperatingCostGraph from "../../../charts/BuLubesOperatingCostGraph/BuLubesOperatingCostGraph"
import styles from "./BuLubesOperatingCost.module.scss";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuLubesOperatingCost(props) {
  const [graphData, setGraphData] = useState([]);

  
  useEffect(() => {
    const prepareGraphData = () => {
      let url = `${environment.BU_KPI_URL}/operating/data?data_type=ytm&level=country&business_unit=lubes&kpi_name=operating cost`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setGraphData(response.data);
        })
        .catch(error => console.log(error));
    }
    prepareGraphData();
  }, [props.product])

  return (
    <div className={`${styles.BuOperatingCostContiner}`}>
      <div className={`pt-2 ${styles.headerContainer}`}>
        <div className={`row`}>
          <div className={`col-8`}>
            <span>Operating Cost</span>
          </div>
          <div className={`col-4 mt-2 ${styles.headerRight}`}>
            <span>Total: 330 INR</span>
            <span className={`ml-4`} style={{ color: "#e13219" }}>-10%</span>
          </div>
        </div>
        <div className={`row pt-2`}>
          <div className={`col-9 d-flex align-items-center ${styles.headerLabels}`}>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.cnfDot}`}></span>CNF</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.plantDot}`}></span>PLANT</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.othersDot}`}></span>OTHERS</div>
          </div>
          <div className={`col-3 ${styles.headerLabelsTarget}`}>
            <span>---- Target</span>
          </div>
        </div>
      </div>
      <div className={`row ${styles.graphContainer}`}>
        {
          graphData ?
            <BuLubesOperatingCostGraph graphData={graphData}
            ></BuLubesOperatingCostGraph>
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
        }
      </div>
      <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div>
  )
}
export default BuLubesOperatingCost;