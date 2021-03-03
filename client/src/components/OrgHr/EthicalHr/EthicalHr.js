import React from "react";
import styles from "./EthicalHr.module.scss";
import ExpandIcon from "../../../assets/images/expandIcon.png"
import EthicalHrGraph from "./EthicalHrGraph";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const LearningDevelopment = () => {
  const handle = useFullScreenHandle();
  const fullScrn = () => {
    let getfsdiv = document.getElementById('fullSrnehr');
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
        <span>Ethical HR</span>
        <img src={ExpandIcon} alt="Expand Learning & Development" id="fullSrnehr" data-fs="handleenter" onClick={fullScrn}></img>
      </div>
      <div className={`d-flex align-items-center justify-content-between ${styles.LearningDevelopmentContentContainer}`}>

        <div className={`${styles.graphContainer}`}>
          <EthicalHrGraph></EthicalHrGraph>
        </div>

        <div className={`d-flex flex-column ${styles.legendsContainer}`}>
          <div className="d-flex justify-content-between my-1">
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`} style={{ backgroundColor: "#f097a0" }}></span> Minor:
            </div>
            <span>400</span>
          </div>
          <div className="d-flex justify-content-between my-1">
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`} style={{ backgroundColor: "#ff6271" }}></span> Cautious:
            </div>
            <span>100</span>
          </div>
          <div className="d-flex justify-content-between my-1">
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`} style={{ backgroundColor: "#b5424d" }}></span> Major:
            </div>
            <span>400</span>
          </div>
          <div className="d-flex justify-content-between my-1">
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`} style={{ backgroundColor: "#ab202d" }}></span> Advisory:
            </div>
            <span>400</span>
          </div>
          <div className="d-flex justify-content-between my-1">
            <div className="mr-4 d-flex align-items-center">
              <span className={`mr-2 ${styles.dot1}`} style={{ backgroundColor: "#7b0712" }}></span> Exoneration:
            </div>
            <span>100</span>
          </div>
        </div>

        <div className={`d-flex flex-column ${styles.rightContainer}`}>
          <div className={`d-flex align-items-center justify-content-between mb-3 ${styles.section}`}>
            <span>Closed Cases:</span>
            <span className={`${styles.sectionValue}`}>4.3</span>
          </div>
          <div className={`d-flex align-items-center justify-content-between ${styles.section}`}>
            <span>Resolution Time:</span>
            <span className={`${styles.sectionValue}`}>4.3</span>
          </div>
        </div>
      </div>
    </div>
    </FullScreen>
  )
}
export default LearningDevelopment;