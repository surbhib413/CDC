import React from "react";
import styles from "./TotalCapex.module.scss";
import ExpandIcon from "../../../assets/images/expandIcon.png"
import DeltaValueOrgTotalCap from "../../DeltaValuesOrg/DeltaValueOrgTotalCap";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const TotalCapex = () => {
  const handle = useFullScreenHandle();
  const fullScrn = () => {
    let getfsdiv = document.getElementById('fullSrntc');
    let datafs = getfsdiv.getAttribute('data-fs');
    if(datafs === 'handleenter'){
      getfsdiv.setAttribute('data-fs','handleexit');
      document.body.style.zoom = (window.innerWidth / window.outerWidth);
      handle.enter();
    }else if(datafs === 'handleexit'){
      getfsdiv.setAttribute('data-fs','handleenter');
      handle.exit();
      document.body.style.zoom = 0;
    }
  }
  return (
    <FullScreen handle={handle}>
    <div className={`${styles.totalCapexContainer}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.totalCapexHeader}`}>
        <span>Total Capex</span>
        <img src={ExpandIcon} alt="Expand Total Capex" id="fullSrntc" data-fs="handleenter" onClick={fullScrn}></img>
      </div>
      <div className={`${styles.totalCapexContentContainer}`}>
        <div className={`${styles.barContainer}`}>
          <div className={`d-flex justify-content-between align-items-center py-3 ${styles.barHeader}`}>
            <div className={`d-flex`}>
              <span className={`${styles.totalValues} mr-5`}>354.50 CR INR</span>
              <DeltaValueOrgTotalCap></DeltaValueOrgTotalCap>
            </div>
          </div>
          <div className={`d-flex `} >
            <div className={`d-flex flex-column justify-content-center ${styles.progressBar}`} style={{ width: "60%" }}>
              <span className={`pl-3 ${styles.percentageBarGreen}`} ></span>
              <span className="pl-3 pt-2" style={{opacity : 0}}>Minor</span>
            </div>
            <div className={`d-flex flex-column  ${styles.progressBar}`} style={{ width: "40%" }}>
              <span className={`pl-3 ${styles.percentageBarOrange}`}></span>
              <span className="pl-3 pt-2" style={{opacity : 0}}>Serious</span>
            </div>
          </div>
          <div className={`d-flex justify-content-end ${styles.fatalitiesText}`}>
            <span>Budget: 500 CR</span>
          </div>
        </div>
      </div>
    </div>
    </FullScreen>
  )
}
export default TotalCapex;