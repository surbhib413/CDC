import React from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuLpgProjects.module.scss";

function BuLpgProjects() {
  return (
    <div className={`${styles.BuOperatingCostContiner}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.headerContainer}`}>
        <div className={`${styles.headerLeft}`}>
          <div className={`${styles.heading}`}><span>Projects</span></div>
        </div>
      </div>
      <div className={`d-flex flex-column justify-content-between ${styles.graphContainer}`}>
        <div className={`${styles.header}`}>
          <span >Spot Prices</span>
        </div>

        <div className={`d-flex flex-column ${styles.BuRetailMapTableContainer}`}>
          <div className={`d-flex flex-column ${styles.tableHeaderRowContainer}`}>
            <div className={`${styles.tableHeaderRow}`}>
              <div className={`${styles.headerCell}`}>
                Product
              </div>
              <div className={`${styles.headerCell}`}>
                Price
              </div>
              <div className={`${styles.headerCell}`}>
                Delta
              </div>
            </div>

            <div className={` d-flex flex-column ${styles.tableDataRowContainer}`}>
              <div className={`d-flex ${styles.tableDataRow}`}>
                <div className={`${styles.dataCell}`}><span>Landed Brant</span></div>
                <div className={`${styles.dataCell}`}><span>59.28</span></div>
                <div className={`${styles.dataCell}`}><span style={{ color: "#74ce12" }}>+0.92</span></div>
              </div>
              <div className={`d-flex ${styles.tableDataRow}`}>
                <div className={`${styles.dataCell}`}><span>Landed Dubai</span></div>
                <div className={`${styles.dataCell}`}><span>59.28</span></div>
                <div className={`${styles.dataCell}`}><span style={{ color: "#e13219" }}>-3.65</span></div>
              </div>
              <div className={`d-flex ${styles.tableDataRow}`}>
                <div className={`${styles.dataCell}`}><span>NYMEX</span></div>
                <div className={`${styles.dataCell}`}><span>59.28</span></div>
                <div className={`${styles.dataCell}`}><span style={{ color: "#e13219" }}>-3.44</span></div>
              </div>
              <div className={`d-flex ${styles.tableDataRow}`}>
                <div className={`${styles.dataCell}`}><span>NYMEX</span></div>
                <div className={`${styles.dataCell}`}><span>59.28</span></div>
                <div className={`${styles.dataCell}`}><span style={{ color: "#e13219" }}>-3.44</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <img src={expandIcon} alt='Expand Icon'></img>
        </div>
      </div>
    </div>
  )
}
export default BuLpgProjects;