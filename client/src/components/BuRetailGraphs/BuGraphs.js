import React, { useState, useEffect } from "react";
import styles from "./BuGraphs.module.scss";
import BuSalesRevenue from "./BuSalesRevenue/BuSalesRevenue";
import BuMarketShare from "./BuMarketShare/BuMarketShare";
import BuOperatingCost from "./BuOperatingCost/BuOperatingCost";
import BuCcs from "./BuCcs/BuCcs";
import BuDepotInventory from "./BuDepotInventory/BuDepotInventory";
import BuTransportation from "./BuTransportation/BuTransportation";
import BuProjects from "./BuProjects/BuProjects";
import BuHsse from "./BuHsse/BuHsse";
import BuRetailOutlet from "./BuRetailOutlet/BuRetailOutlet";
import BuEthanolBlending from "./BuEthanolBlending/BuEthanolBlending";
import { Dropdown } from "react-bootstrap";
import dropdownArrows from "../../assets/images/dropdownArrows.png";

function BuSections(props) {
  const [product, setProduct] = useState("ms");

  useEffect(() => {
  }, [props.mapOf])

  return (
    <div className={`${styles.BuGraphsContainer}`}>
      <div className={`d-flex justify-content-end ${styles.BuGraphsHeader}`}>
        <div className={`d-flex ${styles.mapHeader}`}>
          <Dropdown className={`${styles.headerDropdown}`}>
            <Dropdown.Toggle variant="none" id="dropdown-basic" className={`d-flex align-items-center ${styles.dropdownButton}`}>
              <span className={`${styles.dropdownName}`}>{product.toLocaleUpperCase()}</span>
              <div className={`d-flex align-items-center justify-content-center ${styles.dropdownIconContainer}`}>
                <img src={dropdownArrows} alt='All region dropdown'></img>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles.dropdownMenuContainer}`}>
              <Dropdown.Item className={`${styles.menuItem}`} onClick={() => setProduct("ms")} >MS</Dropdown.Item>
              <Dropdown.Item className={`${styles.menuItem}`} onClick={() => setProduct("hsd")} >HSD</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
        <BuSalesRevenue mapOf={props.mapOf} product={product}></BuSalesRevenue>
        <BuMarketShare product={product}></BuMarketShare>
        <BuOperatingCost product={product}></BuOperatingCost>
      </div>
      <div className={`d-flex ${styles.BuGraphsRow2}`}>
        <BuRetailOutlet></BuRetailOutlet>
        <BuCcs></BuCcs>
        <BuDepotInventory></BuDepotInventory>
      </div>
      <div className={`d-flex ${styles.BuGraphsRow3}`}>
        <div className={`d-flex flex-column justify-content-between ${styles.salesRevenueContiner}`}>
          <div className={`d-flex ${styles.BuGraphsRow4}`}>
            <BuHsse></BuHsse>
          </div>
          <div className={`d-flex mt-3 ${styles.BuGraphsRow4}`}>
            <BuEthanolBlending product={product}></BuEthanolBlending>
          </div>
        </div>
        <BuTransportation></BuTransportation>
        <BuProjects></BuProjects>
      </div>
    </div>
  )
}
export default BuSections