import React from "react";
import styles from "./BalanceSheets.module.scss";
import ExpandIcon from "../../../assets/images/expandIcon.png"
import OrgListTile from "../../OrgListTile/OrgListTile";
import BalanceSheetGraph from "./BalanceSheetGraph";
import DeltaValuesOrg from "../../DeltaValuesOrg/DeltaValuesOrg";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const BalanceSheets = () => {
  const handle = useFullScreenHandle();
  const fullScrn = () => {
    let getfsdiv = document.getElementById('fullSrnbs');
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
    <div className={`${styles.BalanceSheetsContainer}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.BalanceSheetsHeader}`}>
        <span>Balance Sheets</span>
        <img src={ExpandIcon} alt="Expand BalanceSheets" id="fullSrnbs" data-fs="handleenter" onClick={fullScrn}></img>
      </div>

      <div className={`${styles.BalanceSheetsGraphContainer}`}>
        <div className={`pt-2 ${styles.headerContainer}`}>
          <div className={`${styles.headerRight}`}>
            <span>Total Debt & Current Maturities</span>
          </div>
          <div className={`${styles.headerLabels} mt-2 d-flex align-items-center `}>
            <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.HpclDot}`}></span>Total Debt: <span style={{color:'#fff',fontWeight : 'normal',marginLeft : '5px'}}>110 Cr. INR </span></div>
            <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.IoclDot}`}></span>Current Maturities: <span style={{color:'#fff',fontWeight : 'normal',marginLeft : '5px'}}>110 Cr INR </span></div>
          </div>
          <div className={`d-flex mt-2`}>
            <div className={`d-flex mr-5`}><DeltaValuesOrg></DeltaValuesOrg></div>
            <div className={`d-flex mr-5`}><DeltaValuesOrg></DeltaValuesOrg></div>
          </div>
        </div>
        <BalanceSheetGraph></BalanceSheetGraph>
      </div>
      <OrgListTile></OrgListTile>
    </div>
    </FullScreen>
  )
}
export default BalanceSheets;