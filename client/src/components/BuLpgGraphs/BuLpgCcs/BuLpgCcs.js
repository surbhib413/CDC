import React, { useEffect, useState } from "react";
import styles from "./BuLpgCcs.module.scss";
import expandIcon from "../../../assets/images/expandIcon.png";
import { Spinner } from "react-bootstrap";
import BuLpgCcsPieChart from "./BuLpgCcsPieChart";
import environment from "../../../environment";

function BuLpgCcs(props) {
    const [graphData, setGraphData] = useState([]);
    const [resolvedComplaints, setResolvedComplaints] = useState(0);
    const [receivedComplaints, setReceivedComplaints] = useState(0);

    useEffect(() => {
      function prepareGraphData() {
          let url = `${environment.BU_KPI_URL}/complaints/data?business_unit=lpg&kpi_name=ccs&data_type=ytm&level=country`;
          fetch(url, { method: "GET" })
              .then(res => res.json())
              .then(response => {
                  var resolved = 0;
                  var received = 0;
                  setGraphData(response.data);
                  response.data.forEach((item, index) => {
                      resolved += item.resolved_cases;
                      received = item.total_complaints;
                  })
                  setResolvedComplaints(resolved);
                  setReceivedComplaints(received);
              })
              .catch(error => console.log(error));
      }
        prepareGraphData();
    }, [props.activeTab])

    return (
        <div className={`${styles.BuCcsContiner}`}>
            <div className={`pt-2 ${styles.headerContainer}`}>
                <div className={`row`}>
                    <div className={`col-7`}>
                        <span>CCS</span>
                    </div>
                    <div className={`d-flex col-5 mt-2 ${styles.headerRight}`}>
                        <div className="mr-2 align-items-center "><span className={`mr-2 ${styles.actualDot}`}></span>{resolvedComplaints} Complaints Resolved</div>
                        <div className="mr-2 align-items-center "><span className={`mr-2 ${styles.actualDot}`}></span>+2%</div>
                    </div>
                </div>
                <div className={`row pt-2`}>
                    <div className={`col-7 d-flex align-items-center ${styles.headerLabels}`}>
                    </div>
                    <div className={`d-flex col-5 mt-2 ${styles.headerRight}`}>
                        <div className="mr-2 align-items-center "><span className={`mr-2 ${styles.actualDot}`}></span>{receivedComplaints} Complaints Received</div>
                        <div className="mr-2 align-items-center "><span className={`mr-2 ${styles.targetDot}`}></span>-2%</div>
                    </div>
                </div>
            </div>
            <div className={`d-flex align-items-center justify-content-between ${styles.graphContainer}`}>
                <div className={`d-flex align-items-center justify-content-between`}>
                    {
                        graphData ?
                            <BuLpgCcsPieChart graphData={graphData}></BuLpgCcsPieChart>
                            :
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                    }
                </div>
                <div className={`d-flex flex-column  ${styles.legendsContainer}`}>
                    <span className={`mb-3 ${styles.legendsHeader}`}>Resolution Time</span>
                    <div className="mb-3 d-flex align-items-center">
                        <span className={`mr-3 ${styles.dot1}`}></span>Less than 2 Days
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <span className={`mr-3 ${styles.dot2}`}></span>2-5 Days
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <span className={`mr-3 ${styles.dot3}`}></span>6-10 Days
                     </div>
                    <div className="mb-3 d-flex align-items-center">
                        <span className={`mr-3 ${styles.dot4}`}></span>More than 10 days
                    </div>
                </div>
            </div>
            <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
                <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
            </div>
        </div>
    )
}
export default BuLpgCcs;