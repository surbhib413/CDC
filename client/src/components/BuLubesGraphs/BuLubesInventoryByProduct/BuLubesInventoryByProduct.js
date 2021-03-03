import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuLubesInventoryByProduct.module.scss";
import BuLubesInventoryGraph from "./BuLubesInventoryGraph";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuLubesInventoryByProduct() {
    const [graphData, setGraphData] = useState([]);

    
    useEffect(() => {
      const prepareGraphData = () => {
          let url = `${environment.BU_KPI_URL}/inventory/data?level=country&business_unit=lubes&kpi_name=inventory&data_type=ytm`;
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
    }, [])

    return (
        <div className={`${styles.BuDepotInventoryContiner}`}>
            <div className={`pt-2 ${styles.headerContainer}`}>
                <div className={`row`}>
                    <div className={`col-9`}>
                        <span>Inventory By Product Group </span>
                    </div>
                </div>
                <div className={`row pt-2`}>
                    <div className={`col-9 d-flex align-items-center ${styles.headerLabels}`}>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.aboveDot}`}></span>Depot above target inventory</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.belowDot}`}></span>Depot below target inventory</div>
                    </div>
                </div>
            </div>
            <div className={`d-flex align-items-center justify-content-center ${styles.graphContainer}`}>
                {
                    graphData ?
                        <BuLubesInventoryGraph graphData={graphData}></BuLubesInventoryGraph>
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
export default BuLubesInventoryByProduct;