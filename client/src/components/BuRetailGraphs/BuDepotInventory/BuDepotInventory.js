import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuDepotInventory.module.scss";
import BuDepotInventoryPieChart from "./BuDepotInventoryPieChart";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuDepotInventory() {
  const [graphMsData, setMsGraphData] = useState([]);
  const [graphHsdData, setHsdGraphData] = useState([]);

  
  useEffect(() => {
    function prepareGraphData(product) {
      let url = `${environment.BU_KPI_URL}/inventory/data?business_unit=retail&kpi_name=depot inventory&data_type=daily&level=country&product=${product}`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          if (response.data) {
            response.data.forEach((item, index) => {
              if (item.product === "MS") {
                setMsGraphData(response.data);
              }
              else if (item.product === "HSD") {
                setHsdGraphData(response.data);
              }
            });
          }
        })
        .catch(error => console.log(error));
    }
    prepareGraphData("ms");
    prepareGraphData("hsd");
  }, [])

  return (
    <div className={`${styles.BuDepotInventoryContiner}`}>
      <div className={`d-flex justify-content-between ${styles.BuCcsHeader}`}>
        <div className={`d-flex flex-column justify-content-center ${styles.BuCcsHeaderLeft}`}>
          <div className={`${styles.HeaderTop}`}>Depot Inventory</div>
          <div className={`d-flex ${styles.legendsContainer}`}>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`}></span> {`Meets Target`}
            </div>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot2}`}></span>Below Target
            </div>
            <div className="mr-3 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot4}`}></span>{`More than 10 Days`}
            </div>
          </div>
        </div>
        <div className={` d-flex flex-column justify-content-center ${styles.BuCcsHeaderRight}`}>
          <span className={`${styles.BuCcsHeaderResolved}`}>Total Depos: 80</span>
        </div>
      </div>
      <div className={`d-flex align-items-center justify-content-center ${styles.graphContainer}`}>
        <div className="d-flex flex-column align-items-center mr-4">
          {
            graphMsData ?
              <BuDepotInventoryPieChart graphData={graphMsData}></BuDepotInventoryPieChart>
              :
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
          }
          <span className={`${styles.pieChartTitle}`}>MS</span>
        </div>
        <div className="d-flex flex-column align-items-center mr-4">
          {
            graphHsdData ?
              <BuDepotInventoryPieChart graphData={graphHsdData}></BuDepotInventoryPieChart>
              :
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
          }
          <span className={`${styles.pieChartTitle}`}>HSD</span>

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
export default BuDepotInventory;