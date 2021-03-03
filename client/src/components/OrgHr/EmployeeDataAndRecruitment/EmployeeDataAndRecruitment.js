import React from "react";
import styles from "./EmployeeDataAndRecruitment.module.scss";
import ExpandIcon from "../../../assets/images/expandIcon.png"
import maleIcon from "../../../assets/images/male_icon.png"
import femaleIcon from "../../../assets/images/female_icon.png"
import EmployeeDemographicGraph from "./EmployeeDemographicGraph";
import CostCompositionGraph from "./CostCompositionGraph";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const EmployeeDataAndRecruitment = () => {
  const handle = useFullScreenHandle();
  const fullScrn = () => {
    let getfsdiv = document.getElementById('fullSrnedr');
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
    <div className={`${styles.EmployeeDataAndRecruitmentContainer}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.EmployeeDataAndRecruitmentHeader}`}>
        <span>Employee Data And Recruitment</span>
        <img src={ExpandIcon} alt="Expand Employee Data And Recruitment" id="fullSrnedr" data-fs="handleenter" onClick={fullScrn}></img>
      </div>
      <div className={`d-flex flex-column justify-content-between ${styles.ContentContainer}`}>
        <div className={`d-flex justify-content-between ${styles.Content}`}>
          <div className={`${styles.demographicsContainer}`}>
            <div className={`${styles.demographicsHeader}`}>Employee Demographics</div>
            <div className={`d-flex ${styles.graphLegendsContainer}`}>
              <div className="mr-4 d-flex align-items-center">
                <span className={`mr-2 ${styles.dot1}`}></span> Management
              </div>
              <div className="mr-4 d-flex align-items-center">
                <span className={`mr-2 ${styles.dot2}`}></span>Cadre 2
              </div>
              <div className="mr-4 d-flex align-items-center">
                <span className={`mr-2 ${styles.dot3}`}></span>Cadre 3
              </div>
            </div>
            <div className={`${styles.demographicsTotals}`}>
              Total Employees:
              <span className={`${styles.demographicsTotalsValue}`}> 769,000</span>
            </div>
            <div className={`d-flex ${styles.genderBreakupContainer}`}>
              <div className={`${styles.maleContainer}`}>
                <img src={maleIcon} alt="male icon" className={`${styles.maleIcon}`}></img>
                <span className={`${styles.maleValue}`}>7,00,000</span>
              </div>
              <div className={`${styles.femaleContainer}`}>
                <img src={femaleIcon} alt="male icon" className={`${styles.femaleIcon}`}></img>
                <span className={`${styles.femaleValue}`}>6,95,000</span>
              </div>
            </div>

            
            <div className={`${styles.EmployeeDemographicGraphContainer}`}>
              <EmployeeDemographicGraph></EmployeeDemographicGraph>
            </div>
          </div>
          <div className={`${styles.mfsection}`}>
            <h4>M:F</h4>
            <p>2:3</p>
            <p>2:3</p>
            <p>2:3</p>
            <p>2:3</p>
            <p>2:3</p>
            <p>2:3</p>
          </div>

          <div className={`${styles.costCompositionContainer}`}>
            <div className={`${styles.costsHeader}`}>Cost Composition</div>
            <div className={`${styles.costsTotals}`}>
              Total Employees:
              <span className={`${styles.totalsValue}`}> 769,000</span>
            </div>
            <CostCompositionGraph></CostCompositionGraph>
          </div>
        </div>
        <div className={`d-flex justify-content-between align-items-center ${styles.Footer}`}>
          <span className={`${styles.footerText}`}>Cost/Hire 35,450 INR</span>
          <span className={`${styles.footerText}`}>Infant Attrition 3.2 %</span>
        </div>
      </div>
    </div>
    </FullScreen>
  )
}
export default EmployeeDataAndRecruitment;