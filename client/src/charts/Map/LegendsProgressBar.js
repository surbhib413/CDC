import React from "react";
import styles from "./Map.module.scss";

const LegendsProgressBar = (props) => {
  return (
    <div className={`${styles.legendBox}`}>
      <div className={`${styles.progressbarTermArea}`}>
        <span className={`${styles.termTextProgressBar}`}>TERM</span>
        <span className={`${styles.hsTextProgressBar}`}>HS</span>
        <span className={`${styles.lsTextProgressBar}`}>LS</span>
        <div className={`${styles.progressbarTerm}`}>
          <div className={`${styles.progressbarData}`}></div>
        </div>
      </div>

      <div className={`${styles.progressbarSpotArea}`}>
        <span className={`${styles.spotTextProgressBar}`}>SPOT</span>
        <span className={`${styles.spotLsTextProgressBar}`}>LS</span>
        <span className={`${styles.spotHsTextProgressBar}`}>HS</span>
        <div className={`${styles.progressbarSpot}`}>
          <div className={`${styles.progressbarData}`}></div>
        </div>
      </div>

      <div className={`${styles.progressbarIndigenousArea}`}>
        <span className={`${styles.indTextProgressBar}`}>INDIGENOUS</span>
        <span className={`${styles.indLsTextProgressBar}`}>LS</span>
        <span className={`${styles.indHsTextProgressBar}`}>HS</span>
        <div className={`${styles.progressbarIndigenous}`}>
          <div className={`${styles.progressbarData}`}></div>
        </div>
      </div>
    </div>
  );
};

export default LegendsProgressBar;
