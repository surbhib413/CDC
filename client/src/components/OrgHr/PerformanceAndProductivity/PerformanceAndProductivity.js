import React from "react";
import styles from "./PerformanceAndProductivity.module.scss";
import ExpandIcon from "../../../assets/images/expandIcon.png"
import OrgListPP from "./OrgListPP";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const PerformanceAndProductivity = () => {
  const handle = useFullScreenHandle();
  const fullScrn = () => {
    let getfsdiv = document.getElementById('fullSrnpp');
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
    <div className={`${styles.PerformanceAndProductivityContainer}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.PerformanceAndProductivityHeader}`}>
        <span>Performance & Productivity</span>
        <img src={ExpandIcon} alt="Expand Employee Data And Recruitment" id="fullSrnpp" data-fs="handleenter" onClick={fullScrn}></img>
      </div>
      <OrgListPP></OrgListPP>
    </div>
    </FullScreen>
  )
}
export default PerformanceAndProductivity;