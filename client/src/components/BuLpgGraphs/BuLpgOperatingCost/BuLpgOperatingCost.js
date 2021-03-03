import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import BuLpgOperatingCostGraph from "./BuLpgOperatingCostGraph"
import styles from "./BuLpgOperatingCost.module.scss";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuLpgOperatingCost(props) {

  const [graphData, setGraphData] = useState([]);

  
  useEffect(() => {
    function prepareGraphData() {
      let url = `${environment.BU_KPI_URL}/operating/data?business_unit=lpg&kpi_name=operating cost&data_type=ytm&level=country`
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
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.staffCostDot}`}></span>All</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.rmDot}`}></span>Staff Cost</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.rentalDot}`}></span>Bottling</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.thirdPartyDot}`}></span>Transport</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.salesProDot}`}></span>Rentals</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.othersDot}`}></span>Others</div>
          </div>
          <div className={`col-3 ${styles.headerLabelsTarget}`}>
            <span>---- Target</span>
          </div>
        </div>
      </div>
      <div className={`d-flex ${styles.graphContainer}`}>
        {
          graphData ?
            <BuLpgOperatingCostGraph graphData={graphData}
            ></BuLpgOperatingCostGraph>
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
export default BuLpgOperatingCost;