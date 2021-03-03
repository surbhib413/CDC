import React from "react";
import styles from "./FinanceTreasurey.module.scss";
import ExpandIcon from "../../../assets/images/expandIcon.png";
import OrgListFT from "./OrgListFT";
import ForeignCurrency from "./ForeignCurrency/ForeignCurrency";
import InternationalBond from "./InternationalBond/InternationalBond";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const FinanceTreasurey = () => {
  const handle = useFullScreenHandle();
  const fullScrn = () => {
    let getfsdiv = document.getElementById('fullSrnft');
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
    <div className={`${styles.treasureyContainer}`}>
      <FullScreen handle={handle}>
      <div className={`d-flex align-items-center justify-content-between ${styles.treasureyHeader}`}>
        <span>Treasurey</span>
        <img src={ExpandIcon} alt="Expand Treasurey KPIs" id="fullSrnft" data-fs="handleenter" onClick={fullScrn}></img>
      </div>
      <div className={`${styles.foreignCurrencyLoanGraphContainer}`}>
        <ForeignCurrency></ForeignCurrency>
      </div>
      <div className={`${styles.internationalBondGraphContainer}`}>
        <InternationalBond></InternationalBond>
      </div>
      </FullScreen>
      <OrgListFT></OrgListFT>
    </div>
  )
}
export default FinanceTreasurey;