import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import BuTransportationGraph from "./BuTransportationGraph";
import styles from "./BuTransportation.module.scss";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuTransportation() {
    const [graphData, setGraphData] = useState([]);
    const [lastItem, setLastItem] = useState({});

    
    useEffect(() => {
      function prepareGraphData() {
          let url = `${environment.BU_KPI_URL}/data?business_unit=retail&kpi_name=transportation charge&data_type=ytm&level=country`;
          fetch(url, { method: "GET" })
              .then(res => res.json())
              .then(response => {
                  setGraphData(response.data);
                  setLastItem(response.data[response.data.length - 1]);
              })
              .catch(error => console.log(error));
      }
        prepareGraphData();
    }, [])

    return (
        <div className={`${styles.BuTransportationContainer}`}>
            <div className={`d-flex align-items-center justify-content-between ${styles.headerContainer}`}>
                <div className={`${styles.headerLeft}`}>
                    <div className={`${styles.heading}`}><span>Transportation Charges</span></div>
                    <div className={`d-flex align-items-center mt-2 ${styles.headerLabels}`}>
                        <div className="d-flex mr-2 align-items-center "><span className={`mr-2 ${styles.actualDot}`}></span>Actual</div>
                        <div className="d-flex mr-2 align-items-center "><span className={`mr-2 ${styles.targetDot}`}></span>Target</div>
                    </div>
                </div>
                <div className={`${styles.headerRight}`}>
                    <span>Total: {lastItem.actual} INR</span>
                    <span className={`ml-5`} style={{ color: `${Math.sign(lastItem.growth) === 1 ? "#74ce12" : "#e13219"}` }}>{lastItem.growth}%</span>
                </div>
            </div>
            <div className={`d-flex ${styles.graphContainer}`}>
                {
                    graphData ?
                        <BuTransportationGraph graphData={graphData}></BuTransportationGraph>
                        :
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>

                }

                <div className={`${styles.MsHsdContainer}`}>
                    <div className={`${styles.HsdCircle}`}><span className={`${styles.Hsd}`}>HSD</span></div>
                    <div className={`${styles.MsCircle}`}><span className={`${styles.Ms}`}>MS</span></div>
                </div>

            </div>
            <div>
                <img style={{ float: "right", marginRight: "5px" }} src={expandIcon} alt='Expand Icon'></img>
            </div>
        </div>
    )
}
export default BuTransportation;