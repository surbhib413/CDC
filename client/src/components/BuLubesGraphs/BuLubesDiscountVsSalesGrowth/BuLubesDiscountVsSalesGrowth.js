import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuLubesDiscountVsSalesGrowth.module.scss";
import LubesDicountVsSalesBubbleChart from "./LubesDicountVsSalesBubbleChart";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuLubesDiscountVsSalesGrowth(props) {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    function prepareGraphData() {
      let url = `${environment.BU_KPI_URL}/discount_sales/data?level=country&data_type=ytm&business_unit=lubes`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setGraphData(response.data)
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
    prepareGraphData();
  }, [props.ActiveTab])

  return (
    <div className={`${styles.BuDepotInventoryContiner}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.BuCcsHeader}`}>
        <div className={`${styles.BuCcsHeaderLeft}`}>Discount vs Sales Growth</div>
        {/* <div className={` d-flex flex-column justify-content-center ${styles.BuCcsHeaderRight}`}>
          <span className={`${styles.BuCcsHeaderResolved}`}>80 Total Depos</span>
        </div> */}
      </div>
      <div className={`d-flex align-items-center ${styles.graphContainer}`}>
        {loading
          ?
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          :
          <LubesDicountVsSalesBubbleChart graphData={graphData}></LubesDicountVsSalesBubbleChart>
        }
      </div>
      <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div>
  )
}
export default BuLubesDiscountVsSalesGrowth;