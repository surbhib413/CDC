import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuAtfCustomerGrowth.module.scss";
import AtfCustomerGrowthGraph from "./AtfCustomerGrowthGraph";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuAtfCustomerGrowth(props) {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    function prepareGraphData() {
      let url = `${environment.BU_KPI_URL}/key_customer/data?data_type=ytm&level=country&business_unit=atf`;
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
      <div className={`d-flex justify-content-between ${styles.BuCcsHeader}`}>
        <div className={`d-flex flex-column justify-content-center ${styles.BuCcsHeaderLeft}`}>
          <div className={`${styles.HeaderTop}`}>Key Customer Growth</div>
          <div className={`d-flex ${styles.legendsContainer}`}>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`}></span> Current Year
            </div>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot2}`}></span>Last Year
            </div>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot3}`}></span> Gain
            </div>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot4}`}></span> Loss
            </div>
          </div>
        </div>
        <div className={` d-flex justify-content-center align-items-center ${styles.BuCcsHeaderRight}`}>
          <span className={`${styles.BuCcsHeaderResolved}`}>Total 330 INR (Cr)</span>
          <span className="ml-3" style={{ color: "#74ce12" }}>+2%</span>
        </div>
      </div>
      <div className={`d-flex justify-content-between ${styles.graphContainer}`}>
        {loading
          ?
          <Spinner></Spinner>
          :
          <AtfCustomerGrowthGraph graphData={graphData}></AtfCustomerGrowthGraph>
        }
        <div className={`d-flex flex-column ${styles.revenueGrowthTableContainer}`}>
          <div className={`d-flex flex-column ${styles.tableHeaderRowContainer}`}>
            <div className={`${styles.tableHeaderRow}`}>
              <div className={`${styles.headerCell}`}>
                Revenue (Cr)
              </div>
              <div className={`${styles.headerCell}`}>
                Growth
              </div>
            </div>
            <div className={` d-flex flex-column ${styles.tableDataRowContainer}`}>
              {
                graphData.map((item, index) => {
                return (
                  <div key={index} className={`d-flex ${styles.tableDataRow}`}>
                    <div className={`${styles.dataCell}`}><span>{item.curr_year}</span></div>
                    <div className={`${styles.dataCell}`}><span style={{ color: `${Math.sign(item.percentage_growth) === 1 ? "#74ce12" : "#e13219"}` }}>{item.percentage_growth}%</span></div>
                  </div>
                )})
              }
            </div>
          </div>
        </div>
      </div>
      <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div>
  )
}
export default BuAtfCustomerGrowth;