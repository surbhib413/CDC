import React from "react";
import styles from "./FinanceMarket.module.scss";
import ExpandIcon from "../../../assets/images/expandIcon.png"
import DeltaValuesWithTotalOrg from "../../DeltaValuesWithTotalOrg/DeltaValuesWithTotalOrg";
import BpclMarket from './BpclMarket/BpclMarket';
import Sensex from './Sensex/Sensex';
import Nifty from './Nifty/Nifty';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const FinanceMarket = () => {
  const handle = useFullScreenHandle();
  const fullScrn = () => {
    let getfsdiv = document.getElementById('fullSrnfm');
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
    <div className={`${styles.marketContainer}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.marketHeader}`}>
        <span>Market</span>
        <img src={ExpandIcon} alt="Expand Growth KPIs" id="fullSrnfm" data-fs="handleenter" onClick={fullScrn}></img>
      </div>
      <div className={`d-flex ${styles.topContainer}`}>
        <div className={`${styles.shareContainer}`}>
          <BpclMarket /> 
        </div>
        <div className={`${styles.shareContainer}`}>
          <Sensex /> 
        </div>
        <div className={`${styles.shareContainer}`}>
          <Nifty /> 
        </div>
      </div>
      <div className={`${styles.bottomContainer}`}>

        <div className={`d-flex ${styles.listItemRow}`}>
          <div className={`d-flex ${styles.listItemContainer}`}>
            <div className={`d-flex align-items-center ${styles.kpiTitle}`}>Mkt Cap</div>
            <div className={`d-flex align-items-center justify-content-center ${styles.Kpi}`}>
              <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
            </div>
          </div>
          <div className={`d-flex ${styles.listItemContainer}`}>
            <div className={`d-flex align-items-center ${styles.kpiTitle}`}>P/E</div>
            <div className={`d-flex align-items-center justify-content-center ${styles.Kpi}`}>
              <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
            </div>
          </div>
        </div>

        <div className={`d-flex ${styles.listItemRow}`}>
          <div className={`d-flex ${styles.listItemContainer}`}>
            <div className={`d-flex align-items-center ${styles.kpiTitle}`}>P/BV</div>
            <div className={`d-flex align-items-center justify-content-center ${styles.Kpi}`}>
              <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
            </div>
          </div>
          <div className={`d-flex ${styles.listItemContainer}`}>
            <div className={`d-flex align-items-center ${styles.kpiTitle}`}>Beta</div>
            <div className={`d-flex align-items-center justify-content-center ${styles.Kpi}`}>
              <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
            </div>
          </div>
        </div>

        <div className={`d-flex ${styles.listItemRow}`}>
          <div className={`d-flex ${styles.listItemContainer}`}>
            <div className={`d-flex align-items-center ${styles.kpiTitle}`}>Div Yield</div>
            <div className={`d-flex align-items-center justify-content-center ${styles.Kpi}`}>
              <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
            </div>
          </div>
          <div className={`d-flex ${styles.listItemContainer}`}>
            <div className={`d-flex align-items-center ${styles.kpiTitle}`}>Share Rtn.</div>
            <div className={`d-flex align-items-center justify-content-center ${styles.Kpi}`}>
              <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
            </div>
          </div>
        </div>

      </div>
    </div>
    </FullScreen>
  )
}
export default FinanceMarket;