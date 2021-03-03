import React, { useEffect } from "react";
import styles from "./BuGraphs.module.scss";
import BuLubesSalesRevenue from "./BuLubesSalesRevenue/BuLubesSalesRevenue";
import BuLubesMarketShare from "./BuLubesMarketShare/BuLubesMarketShare";
import BuLubesOperatingCost from "./BuLubesOperatingCost/BuLubesOperatingCost";
import BuLubesOthers from "./BuLubesOthers/BuLubesOthers";
import BuLubesHsse from "./BuLubesHsse/BuLubesHsse";
import BuLubesLossGainAnalysis from "./BuLubesLossGainAnalysis/BuLubesLossGainAnalysis"
import BuLubesInventoryByProduct from "./BuLubesInventoryByProduct/BuLubesInventoryByProduct"
import BuLubesDiscountVsSalesGrowth from "./BuLubesDiscountVsSalesGrowth/BuLubesDiscountVsSalesGrowth"
import BuLubesDemandIndex from "./BuLubesDemandIndex/BuLubesDemandIndex"
import { Dropdown } from "react-bootstrap";
import dropdownArrows from "../../assets/images/dropdownArrows.png";

function BuSections(props) {
  useEffect(() => {
  }, [props.mapOf])

  return (
    <div className={`${styles.BuGraphsContainer}`}>
      <div className={`d-flex justify-content-end ${styles.BuGraphsHeader}`}>
        <div className={`d-flex ${styles.mapHeader}`}>
          <Dropdown className={`${styles.headerDropdown}`}>
            <Dropdown.Toggle variant="none" id="dropdown-basic" className={`d-flex align-items-center ${styles.dropdownButton}`}>
              <span className={`${styles.dropdownName}`}>YTM</span>
              <div className={`d-flex align-items-center justify-content-center ${styles.dropdownIconContainer}`}>
                <img src={dropdownArrows} alt='All region dropdown'></img>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles.dropdownMenuContainer}`}>
              <Dropdown.Item className={`${styles.menuItem}`} >YTM</Dropdown.Item>
              <Dropdown.Item className={`${styles.menuItem}`} >MTD</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className={`d-flex ${styles.BuGraphsRow1}`}>
        <BuLubesSalesRevenue mapOf={props.mapOf}></BuLubesSalesRevenue>
        <BuLubesMarketShare></BuLubesMarketShare>
        <BuLubesOperatingCost></BuLubesOperatingCost>
      </div>
      <div className={`d-flex ${styles.BuGraphsRow2}`}>
        {/* <BuLubesDemandIndex></BuLubesDemandIndex>*/}
        <BuLubesDiscountVsSalesGrowth activeTab={props.activeTab}></BuLubesDiscountVsSalesGrowth>
        <BuLubesDemandIndex activeTab={props.activeTab}></BuLubesDemandIndex>
       
        <BuLubesInventoryByProduct></BuLubesInventoryByProduct>

      </div>
      <div className={`d-flex ${styles.BuGraphsRow3}`}>
        <BuLubesHsse activeTab={props.activeTab}></BuLubesHsse>
        <BuLubesOthers activeTab={props.activeTab}></BuLubesOthers>
        <BuLubesLossGainAnalysis activeTab={props.activeTab}></BuLubesLossGainAnalysis> 
      </div>
    </div>
  )
}
export default BuSections