import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuIncIndendationRatio.module.scss";
import BuIncIndendationRatioGraph from "./BuIncIndendationRatioGraph";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";
import axios from 'axios';

function BuIncIndendationRatio(props) {
  const [msData, setMsData] = useState([]);
  const [hsData, setHsData] = useState([]);


  useEffect(() => {
    const prepareGraphData = (depot_type) => {
      let url = `${environment.BU_KPI_URL}/indendation_ratio/data?data_type=ytm&level=country&business_unit=inc&depot_type=${depot_type}`;
      axios.get(url)
        .then(response => {
          if (response.data.success) {
            response.data.data.forEach((item, index) => {
              if (item.depot_type === 'MS') {
                setMsData(response.data.data);
              }
              else if (item.depot_type === 'HS') {
                setHsData(response.data.data);
              }
            });
          }
        })
        .catch(error => console.log(error));
    }
    prepareGraphData('ms');
    prepareGraphData('hs');
  }, [props.activeTab])

  return (
    <div className={`${styles.BuDepotInventoryContiner}`}>
      <div className={`d-flex justify-content-between ${styles.BuCcsHeader}`}>
        <div className={`d-flex flex-column justify-content-center ${styles.BuCcsHeaderLeft}`}>
          <div className={`${styles.HeaderTop}`}>Indendation Ratio</div>
          <div className={`d-flex ${styles.legendsContainer}`}>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`}></span> -10 to 0
                        </div>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot2}`}></span>-30 to -10
                        </div>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot3}`}></span> -30 to -60
                        </div>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot4}`}></span> -60 to -10
                        </div>
          </div>
        </div>
        <div className={` d-flex justify-content-center align-items-center ${styles.BuCcsHeaderRight}`}>
          <span className={`${styles.BuCcsHeaderResolved}`}>Total 330 INR (Cr)</span>
          <span className="ml-3" style={{ color: "#74ce12" }}>+2%</span>
        </div>
      </div>
      <div className={`d-flex align-items-center justify-content-around  ${styles.graphContainer}`}>
        <div className="d-flex flex-column align-items-center">
          {msData
            ?
            <BuIncIndendationRatioGraph graphData={msData}></BuIncIndendationRatioGraph>
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          }
          <span className={`mt-2 ${styles.pieChartTitle}`}>MS Deports</span>
        </div>
        <div className="d-flex flex-column align-items-center">
          {hsData
            ?
            <BuIncIndendationRatioGraph graphData={hsData}></BuIncIndendationRatioGraph>
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          }
          <span className={`mt-2 ${styles.pieChartTitle}`}>HS Deports</span>
        </div>
      </div>
      <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div>
  )
}
export default BuIncIndendationRatio;