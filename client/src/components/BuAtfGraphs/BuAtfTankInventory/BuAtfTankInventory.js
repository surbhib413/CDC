import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuAtfTankInventory.module.scss";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";
import TankInventoryWaffleGraph from "./TankInventoryWaffleGraph";

function BuAtfTankInventory(props) {
  const [loadingCivil, setLoadingCivil] = useState(true);
  const [loadingDefense, setLoadingDefense] = useState(true);
  const [civilTankData, setCivilTankData] = useState({});
  const [defenseTankData, setDefenseTankData] = useState({});

  
  useEffect(() => {
    const prepareGraphData = () => {
      let url = `${environment.BU_KPI_URL}/inventory/data?data_type=ytm&level=country&inventory_type=tank inventory&business_unit=atf`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          response.data.forEach((responseItem, index) => {
            if (responseItem.depot_type === "civil") {
              setCivilTankData(responseItem);
              setLoadingCivil(false);
            }
            if (responseItem.depot_type === "defense") {
              setDefenseTankData(responseItem);
              setLoadingDefense(false);
            }
          })
          return;
        })
        .catch(error => console.log(error));
    }
    prepareGraphData();
  }, [props.activeTab])

  return (
    <div className={`${styles.BuOperatingCostContiner}`}>
      <div className={`d-flex justify-content-between ${styles.BuCcsHeader}`}>
        <div className={`d-flex flex-column justify-content-center ${styles.BuCcsHeaderLeft}`}>
          <div className={`${styles.HeaderTop}`}>Tank Inventory</div>
          <div className={`d-flex ${styles.legendsContainer}`}>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`}></span>Depots Above Norm
            </div>
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot2}`}></span>Depots Below Norm
            </div>
          </div>
        </div>
        <div className={` d-flex flex-column justify-content-center align-items-end ${styles.BuCcsHeaderRight}`}>
          <span className={`${styles.BuCcsHeaderResolved}`}>Total Civil Depos: {civilTankData.above_norm + civilTankData.below_norm}</span>
          <span className={`${styles.BuCcsHeaderResolved}`}>Total Defende Depos: {defenseTankData.above_norm + defenseTankData.below_norm}</span>
        </div>
      </div>
      <div className={`d-flex justify-content-around align-items-center ${styles.graphContainer}`}>
        <div className={`d-flex flex-column align-items-center justify-content-between ${styles.graphAndTitleContainer}`}>
          {loadingCivil
            ?
            <Spinner></Spinner>
            :
            <TankInventoryWaffleGraph graphData={civilTankData}></TankInventoryWaffleGraph>
          }
          <span className={`${styles.waffleTitle}`}>DOS</span>
        </div>
        <div className={`d-flex flex-column align-items-center justify-content-between ${styles.graphAndTitleContainer}`}>
          {loadingDefense
            ?
            <Spinner></Spinner>
            :
            <TankInventoryWaffleGraph graphData={defenseTankData}></TankInventoryWaffleGraph>}
          <span className={`${styles.waffleTitle}`}>90% Capacity in KL</span>
        </div>
      </div>
      <div className={`d-flex justify-content-end`}>
        <img src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div>
  )
}
export default BuAtfTankInventory;