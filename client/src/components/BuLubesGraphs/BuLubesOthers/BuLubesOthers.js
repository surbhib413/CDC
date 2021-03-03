import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuLubesOthers.module.scss";
import LubesOthersPieChart from "./LubesOthersPieChart";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuLubesOthers(props) {
  const [overdueData, setOverdueData] = useState([]);
  const [outstandingData, setOutstandingData] = useState([]);

  
  useEffect(() => {
    const prepareGraphData = (kpi_name) => {
      let url = `${environment.BU_KPI_URL}/payment/data?level=country&data_type=ytm&kpi_name=${kpi_name}&business_unit=lubes`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          if (response.data) {
            response.data.forEach((item, index) => {
              if (item.kpi_name === 'overdue payment') {
                setOverdueData(response.data);
              }
              else if (item.kpi_name === 'outstanding payment') {
                setOutstandingData(response.data);
              }
            });
          }
        })
        .catch(error => console.log(error));
    }
    prepareGraphData('overdue payment');
    prepareGraphData('outstanding payment');
  }, [props.activeTab])

  return (
    <div className={`${styles.BuLubesOthersContainer}`}>
      <div className={`d-flex flex-column justify-content-center ${styles.BuCcsHeader}`}>
        <div className={`${styles.HeaderTop}`}>Others</div>
        <div className={`d-flex ${styles.legendsContainer}`}>
          <div className="mr-4 d-flex align-items-center">
            <span className={`mr-2 ${styles.dot1}`}></span> {`< 5 days`}
          </div>
          <div className="mr-4 d-flex align-items-center">
            <span className={`mr-2 ${styles.dot2}`}></span>5-10 Days
          </div>
          <div className="mr-4 d-flex align-items-center">
            <span className={`mr-2 ${styles.dot3}`}></span>10-30 Days
          </div>
          <div className="mr-3 d-flex align-items-center">
            <span className={`mr-2 ${styles.dot4}`}></span>{`> 30 Days`}
          </div>
        </div>
      </div>
      <div className={`d-flex align-items-center justify-content-around ${styles.graphContainer}`}>
        <div className="d-flex flex-column align-items-center">
          {overdueData
            ?
            <LubesOthersPieChart graphData={overdueData}></LubesOthersPieChart>
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          }
          <span className={`${styles.pieChartTitle}`}>Title 1</span>
        </div>
        <div className="d-flex flex-column align-items-center">
          {outstandingData
            ?
            <LubesOthersPieChart graphData={outstandingData}></LubesOthersPieChart>
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          }
          <span className={`${styles.pieChartTitle}`}>Title 2</span>
        </div>

        <div className={`d-flex flex-column ${styles.contentRow1}`}>
          <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
            <div className={`${styles.graphHeaderSectionTop}`}>
              <span className={`${styles.topLeft}`}>330</span>
              <span style={{ color: "#e13219" }} className={`${styles.topRight}`}>+2%</span>
            </div>
            <div className={`${styles.graphHeaderSectionBottom}`}><span>Overdue</span></div>
          </div>
          <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
            <div className={`${styles.graphHeaderSectionTop}`}>
              <span className={`${styles.topLeft}`}>330</span>
              <span style={{ color: "#e13219" }} className={`${styles.topRight}`}>+0.003%</span>
            </div>
            <div className={`${styles.graphHeaderSectionBottom}`}><span>Outstanding</span></div>
          </div>
          <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
            <div className={`${styles.graphHeaderSectionTop}`} >
              <span className={`${styles.topLeft}`}>30%</span>
              <span style={{ color: "#74ce12" }} className={`${styles.topRight}`}>+0.2%</span>
            </div>
            <div className={`${styles.graphHeaderSectionBottom}`}><span>New Distributors Added</span></div>
          </div>
        </div>

      </div>
      <div className={`d-flex justify-content-end`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div>
  )
}
export default BuLubesOthers;