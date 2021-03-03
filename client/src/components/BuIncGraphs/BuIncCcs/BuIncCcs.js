import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuIncCcs.module.scss";
import BuIncCCsPieChart from "./BuIncCcsPieChart";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";
import axios from 'axios';

function BuIncCcs(props) {
    const [graphData, setGraphData] = useState([]);
    const [resolvedComplaints, setResolvedComplaints] = useState(0);
    const [receivedComplaints, setReceivedComplaints] = useState(0);

    
    useEffect(() => {
      const prepareGraphData = () => {
          let url = `${environment.BU_KPI_URL}/complaints/data?data_type=ytm&level=country&kpi_name=ccs&business_unit=inc`;
          axios.get(url)
              .then(response => {
                  if (response.data.success) {
                      var resolved = 0;
                      var received = 0;
                      setGraphData(response.data.data);
                      response.data.data.forEach((item, index) => {
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
    }, [props.activeTab])

    return (
        <div className={`${styles.BuDepotInventoryContiner}`}>
            <div className={`pt-2 ${styles.headerContainer}`}>
                <div className={`row`}>
                    <div className={`col-8`}>
                        <span>CCS</span>
                    </div>
                    <div className={`col-4 mt-2 ${styles.headerRight}`}>
                        <span>Complaints Resolved :</span>
                        <span className={`ml-4`} >{resolvedComplaints}</span>
                    </div>
                </div>
                <div className={`row`}>
                    <div className={`col-8 d-flex align-items-center ${styles.headerLabels}`}>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot1}`}></span>{`< 2 Days`}</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot2}`}></span>2-5 Days</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot3}`}></span>6-10 Days</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot4}`}></span>{`> 10 Days`}</div>
                    </div>
                    <div className={`col-4 mt-2 ${styles.headerRight}`}>
                        <span>Complaints Received :</span>
                        <span className={`ml-4`} >{receivedComplaints}</span>
                    </div>
                </div>
            </div>
            <div className={`d-flex align-items-center justify-content-center ${styles.graphContainer}`}>
                {
                    graphData ?
                        <BuIncCCsPieChart graphData={graphData}></BuIncCCsPieChart>
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
export default BuIncCcs;