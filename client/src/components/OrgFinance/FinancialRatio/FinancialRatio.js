import React from "react";
import styles from "./FinancialRatio.module.scss";
import ExpandIcon from "../../../assets/images/expandIcon.png"
import OrgListFR from "./OrgListFR";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const FinancialRatio = () => {
  const handle = useFullScreenHandle();
  const fullScrn = () => {
    let getfsdiv = document.getElementById('fullSrnfr');
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
    <div className={`${styles.FinancialRatioContainer}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.FinancialRatioHeader}`}>
        <span>Financial Ratio</span>
        <img src={ExpandIcon} alt="Expand FinancialRatio" id="fullSrnfr" data-fs="handleenter" onClick={fullScrn}></img>
      </div>
      <OrgListFR></OrgListFR>
    </div>
    </FullScreen>
  )
}
export default FinancialRatio;