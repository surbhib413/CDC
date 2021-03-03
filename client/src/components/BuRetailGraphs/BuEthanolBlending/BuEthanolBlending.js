import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuEthanolBlending.module.scss";
import BuEthanolBlendGraph from "./BuEthanolBlendGraph";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuEthanolBlending(props) {
    const [graphData, setGraphData] = useState([]);

    
    useEffect(() => {
      function prepareGraphData() {
          let url = `${environment.BU_KPI_URL}/data?business_unit=retail&kpi_name=ethanol blending&data_type=ytm&level=country&product=${props.product}`;
          fetch(url, { method: "GET" })
              .then(res => res.json())
              .then(response => {
                  if (response.data) {
                      setGraphData(response.data);
                  }
              })
              .catch(error => console.log(error));
      }
        prepareGraphData();
    }, [props.product])

    return (
        <div className={`${styles.BuTransportationContainer}`}>
            <div className={`d-flex align-items-center justify-content-between ${styles.headerContainer}`}>
                <div className={`${styles.headerLeft}`}>
                    <div className={`${styles.heading}`}><span>Ethanol Blending</span></div>
                </div>
            </div>
            <div className={`d-flex ${styles.graphContainer} `}>
                <div className={`${styles.Table}`} style={{ borderRadius: "20px", display: "block" }}>
                    <div className={`${styles.Heading}`}>
                        <div className={`${styles.Cell}`} >
                            {
                                graphData ?
                                    <BuEthanolBlendGraph graphData={graphData}></BuEthanolBlendGraph>
                                    :
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                            }

                        </div>
                    </div>
                </div>
                <div className={`${styles.MsHsdContainer}`}>
                    <div className={`${styles.HsdCircle}`}><span className={`${styles.Hsd}`}>{props.product.toLocaleUpperCase()}</span></div>
                    {/* <div className={`${styles.MsCircle}`}><span className={`${styles.Ms}`}>MS</span></div> */}
                </div>
            </div>
            <div style={{ display: "block" }}>
                <img style={{ float: "right", marginRight: "5px", marginTop: "-35px" }} src={expandIcon} alt='Expand Icon'></img>
            </div>
        </div>
    )
}
export default BuEthanolBlending;