import React, { useEffect, useState } from "react";
import styles from "./BuLpgCustomerPopulation.module.scss";
import expandIcon from "../../../assets/images/expandIcon.png";
import { Spinner } from "react-bootstrap";
import BuLpgCustPopulationGraph from "./BuLpgCustPopulationGraph"
import environment from "../../../environment";

function BuLpgCustomerPopulation(props) {
  const [graphData, setGraphData] = useState([]);
  const [connectionData, setConnectionItem] = useState([]);
  const [sbcData, setSbcItem] = useState([]);
  const [dbcData, setDbcItem] = useState([]);

  
  useEffect(() => {
    const prepareGraphData = () => {
      let url = `${environment.BU_KPI_URL}/customer_population/data?business_unit=lpg&data_type=ytm&level=country`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          if (response.data) {
            setGraphData(response.data);
            setConnectionItem(response.data[response.data.length - 1].connection);
            setSbcItem(response.data[response.data.length - 1].sbc);
            setDbcItem(response.data[response.data.length - 1].dbc);
          }
        })
        .catch(error => console.log(error));
    }
    prepareGraphData();
  }, [])

  return (
    <div className={`${styles.BuOperatingCostContiner}`}>
      <div className={`pt-2 ${styles.headerContainer}`}>
        <div className={`row`}>
          <div className={`col-8`}>
            <span>Customer Population</span>
          </div>
          <div className={`col-4 mt-2 ${styles.headerRight}`}>
            <span>Total: 330 INR</span>
            <span className={`ml-4`} style={{ color: "#e13219" }}>-10%</span>
          </div>
        </div>
        <div className={`row pt-2`}>
          <div className={`col-9 d-flex align-items-center ${styles.headerLabels}`}>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.bpclDot}`}></span>BPCL</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.hpclDot}`}></span>HPCL</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.ioclDot}`}></span>IOCL</div>
            <div className="d-flex mr-3 align-items-center "><span className={`${styles.bpclLabel}`} >--- BPCL Target</span></div>
          </div>
        </div>
      </div>
      <div className={`d-flex ${styles.graphContainer}`}>
        {
          graphData ?
            <BuLpgCustPopulationGraph graphData={graphData}></BuLpgCustPopulationGraph>
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
        }
        <div className={`d-flex flex-column justify-content-center pt-4 ${styles.graphFilters}`}>
          {
            connectionData ?
              <div className="d-flex mr-3 align-items-center "><span className={`mr-4`}>Connections : {connectionData.actual}</span><span style={{ color: `${Math.sign(connectionData.growth) === 1 ? "#74ce12" : "#e13219"}` }}>{connectionData.growth}%</span></div> : ""
          }
          {
            sbcData ?
              <div className="d-flex mr-3 align-items-center mt-3 "><span className={`mr-4`}>SBC : {sbcData.actual} Cr.</span><span style={{ color: `${Math.sign(sbcData.growth) === 1 ? "#74ce12" : "#e13219"}` }}>{sbcData.growth}%</span></div> : ""
          }
          {
            dbcData ?
              <div className="d-flex mr-3 align-items-center mt-3"><span className={`mr-4`}>DBC : {dbcData.actual}</span><span style={{ color: `${Math.sign(dbcData.growth) === 1 ? "#74ce12" : "#e13219"}` }}>{dbcData.growth}%</span></div> : ""
          }


        </div>
      </div>
      <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div >
  )
}
export default BuLpgCustomerPopulation;