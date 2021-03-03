import React, { useEffect, useState } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuCcs.module.scss";
import BuCcsPieChart from "./BuCcsPieChart";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuCcs() {
  const [graphData, setGraphData] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState(0);
  const [receivedComplaints, setReceivedComplaints] = useState(0);

  
  useEffect(() => {
    function prepareGraphData() {
      let url = `${environment.BU_KPI_URL}/complaints/data?business_unit=retail&kpi_name=ccs&data_type=ytm&level=country`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          if (response.data) {
            let resolved = 0;
            let received = 0;
            setGraphData(response.data);
            response.data.forEach((item, index) => {
              resolved += item.resolved_cases;
              received = item.total_complaints;
            })
            setResolvedComplaints(resolved);
            setReceivedComplaints(received);
          }
        })
        .catch(error => console.log(error));
    }
    prepareGraphData();
  }, [])

  return (
    <div className={`${styles.BuCcsContiner}`}>
      <div className={`d-flex justify-content-between ${styles.BuCcsHeader}`}>
        <div className={`d-flex flex-column justify-content-center ${styles.BuCcsHeaderLeft}`}>
          <div className={`${styles.HeaderTop}`}>CCS</div>
          <div className={`d-flex ${styles.legendsContainer}`}>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`}></span> {`< 2 days`}
            </div>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot2}`}></span>2-5 Days
          </div>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot3}`}></span>6-10 Days
          </div>
            <div className="mr-3 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot4}`}></span>{`> 10 Days`}
            </div>
          </div>
        </div>
        <div className={` d-flex flex-column justify-content-between ${styles.BuCcsHeaderRight}`}>
          <span className={`${styles.BuCcsHeaderResolved}`}>Complaints Resolved: {resolvedComplaints}</span>
          <span className={`${styles.BuCcsHeaderReceived}`}>Complaints Received: {receivedComplaints}</span>
        </div>
      </div>
      <div className={`d-flex align-items-center justify-content-center ${styles.graphContainer}`}>
        <div className="d-flex flex-column align-items-center">
          {
            graphData ?
              <BuCcsPieChart graphData={graphData}></BuCcsPieChart>
              :
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
          }
        </div>
        <div className={`${styles.MsHsdContainer}`}>
          <div className={`${styles.HsdCircle}`}><span className={`${styles.Hsd}`}>HSD</span></div>
          <div className={`${styles.MsCircle}`}><span className={`${styles.Ms}`}>MS</span></div>
        </div>
      </div>
      <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div>
  )
}
export default BuCcs;