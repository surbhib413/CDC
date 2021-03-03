import React from "react";
import styles from "./LearningDevelopment2.module.scss";
import ExpandIcon from "../../../assets/images/expandIcon.png"
import LearningDevelopmentGraph from "./LearningDevelopmentGraph";
import { FullScreen, useFullScreenHandle } from "react-full-screen";


const LearningDevelopment = () => {
  const handle = useFullScreenHandle();
  const fullScrn = () => {
    let getfsdiv = document.getElementById('fullSrnld');
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
    <div className={`${styles.LearningDevelopmentContainer}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.LearningDevelopmentHeader}`}>
        <span>Learning &Development</span>
        <img src={ExpandIcon} alt="Expand Learning & Development" id="fullSrnld" data-fs="handleenter" onClick={fullScrn}></img>
      </div>
      <div className={`d-flex align-items-center justify-content-between ${styles.LearningDevelopmentContentContainer}`}>

        <div className={`${styles.graphContainer}`}>
          <LearningDevelopmentGraph></LearningDevelopmentGraph>
        </div>

        <div className={`d-flex flex-column ${styles.legendsContainer}`}>
          <div className="d-flex justify-content-between my-1">
            <div className="d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`} style={{ backgroundColor: "#17d0b8" }}></span> Leadership Development
            </div>
          </div>
          <div className="d-flex justify-content-between my-1">
            <div className="d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`} style={{ backgroundColor: "#2281e8" }}></span> Executive Development
            </div>
          </div>
        </div>

        <div className={`d-flex flex-column ${styles.rightContainer}`}>
          <div className={`d-flex align-items-center justify-content-between mb-3 ${styles.section}`}>
            <span>Training Mandays/Employee::</span>
            <span className={`${styles.sectionValue}`}>4.3</span>
          </div>
          <div className={`d-flex align-items-center justify-content-between ${styles.section}`}>
            <span>Training Investment/Net Profit ::</span>
            <span className={`${styles.sectionValue}`}>4.3</span>
          </div>
        </div>
      </div>
    </div>
    </FullScreen>
  )
}
export default LearningDevelopment;