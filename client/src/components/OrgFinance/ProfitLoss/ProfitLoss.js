import React from "react";
import styles from "./ProfitLoss.module.scss";
import ExpandIcon from "../../../assets/images/expandIcon.png"
import OrgListAccordian from "../../OrgListAccordian/OrgListAccordian"
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const ProfitLoss = () => {
  const handle = useFullScreenHandle();
  const fullScrn = () => {
    let getfsdiv = document.getElementById('fullSrnpl');
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
    <div className={`${styles.profitLossContainer}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.profitLossHeader}`}>
        <span>Profit & Loss</span>
        <img src={ExpandIcon} alt="Expand Growth KPIs" id="fullSrnpl" data-fs="handleenter" onClick={fullScrn}></img>
      </div>
      <OrgListAccordian></OrgListAccordian>
    </div>
    </FullScreen>
  )
}
export default ProfitLoss;