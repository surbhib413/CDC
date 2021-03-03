import React, { useState } from "react";
import styles from "./RefinaryLanding.module.scss";
import RefinaryGrm from "../../components/Refinery/RefinaryGrm/RefinaryGrm";
import RefinaryOperatingCost from "../../components/Refinery/RefinaryOperatingCost/RefinaryOperatingCost";
import RefinaryDistillateYield from "../../components/Refinery/RefinaryDistillateYield/RefinaryDistillateYield";
import RefinaryEnergyIndex from "../../components/Refinery/RefinaryEnerygyIndex/RefinaryEnergyIndex";
import RefinaryProduction from "../../components/Refinery/RefinaryProduction/RefinaryProduction";
import RefinaryInfographic from "../../components/Refinery/RefinaryInfographic/RefinaryInfographic";

function RefinaryLanding() {
  document.title = 'Refinery | BPCL';
  const [location, setLocation] = useState("mumbai");

  function switchLocation() {
    if (location === "mumbai") {
      setLocation("kochi");
    }
    if (location === "kochi") {
      setLocation("mumbai");
    }
  }

  return (
    <div className={`${styles.refinaryLandingContainer}`}>
      <div className={`d-flex align-items-center justify-content-center ${styles.refinaryHeading}`}>
        Refinery KPI
        <div onClick={() => switchLocation()} className={`d-flex align-items-center  ${styles.mumbaiKochiButton}`}>
          <div className={`d-flex justify-content-center align-items-center ${location === "mumbai" ? styles.mumbaiLeftEnabled : styles.mumbaiLeftDisabled}`}>
            Mumbai
          </div>
          <div className={`d-flex align-items-center justify-content-center ${location === "kochi" ? styles.kochiRightEnabled : styles.kochiRightDisabled}`} >
            Kochi
          </div>
        </div>
      </div>
      <div className={`d-flex ${styles.refinaryGraphs}`}>
        <RefinaryGrm location={location}></RefinaryGrm>
        <RefinaryOperatingCost location={location}></RefinaryOperatingCost>
        <RefinaryEnergyIndex location={location}></RefinaryEnergyIndex>
        <RefinaryDistillateYield location={location}></RefinaryDistillateYield>
        <RefinaryProduction location={location}></RefinaryProduction>
      </div>
      <RefinaryInfographic location={location}></RefinaryInfographic>
    </div>
  );
}
export default RefinaryLanding;
