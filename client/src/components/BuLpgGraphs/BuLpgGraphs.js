import React, { useState, useEffect } from 'react';
import styles from "./BuLpgGraphs.module.scss";
import { Dropdown } from "react-bootstrap";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import dropdownArrows from "../../assets/images/dropdownArrows.png";
import BuLpgSalesRevenue from "./BuLpgSalesRevenue/BuLpgSalesRevenue";
import BuLpgCommercialDiscount from "./BuLpgCommercialDiscount/BuLpgCommercialDiscount";
import BuLpgCustomerPopulation from "./BuLpgCustomerPopulation/BuLpgCustomerPopulation";
import BuLpgCcs from "./BuLpgCcs/BuLpgCcs";
import BuLpgDepotInventory from "./BuLpgDepotInventory/BuLpgDepotInventory";
import BuLpgOperatingCost from "./BuLpgOperatingCost/BuLpgOperatingCost";
import BuLpgMarketShare from "./BuLpgMarketShare/BuLpgMarketShare";
import BuLpgProjects from "./BuLpgProjects/BuLpgProjects";
import BuLpgOthers from './BuLpgOthers/BuLpgOthers';
import BuLpgHsse from './BuLpgHsse/BuLpgHsse';

function BuLpgGraphs(props) {
  const [activeTab, setActiveTab] = useState("all_tab");

  function activateTab(tabId) {
    setActiveTab(tabId)
  }

  useEffect(() => {
  }, [props.activeTab])

  return (
    <div className={`${styles.BuLpgGraphsContainer}`}>
      <Tabs
        defaultTab="all_tab"
        onChange={(tabId) => activateTab(tabId)}
      >
        <div className={`d-flex justify-content-between  ${styles.BuGraphsHeader}`}>
          <TabList className={`d-flex ${styles.tabHeader}`}>
            <Tab tabFor="all_tab" className={`${activeTab === "all_tab" && styles.tabButtonActive} ${styles.tabButton}`}>All</Tab>
            <Tab tabFor="bmcg_tab" className={`${activeTab === "bmcg_tab" && styles.tabButtonActive} ${styles.tabButton}`}>BMCG</Tab>
            <Tab tabFor="bulk_tab" className={`${activeTab === "bulk_tab" && styles.tabButtonActive} ${styles.tabButton}`}>Bulk</Tab>
            <Tab tabFor="commercial_tab" className={`${activeTab === "commercial_tab" && styles.tabButtonActive} ${styles.tabButton}`}>Commercial</Tab>
            <Tab tabFor="domestic_tab" className={`${activeTab === "domestic_tab" && styles.tabButtonActive} ${styles.tabButton}`}>Domestic</Tab>
            <Tab tabFor="ftl_tab" className={`${activeTab === "ftl_tab" && styles.tabButtonActive} ${styles.tabButton}`}>FTL</Tab>
          </TabList>
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
        <div className={`d-flex`}>
          <TabPanel tabId={activeTab}>
            <BuLpgSalesRevenue activeTab={activeTab}></BuLpgSalesRevenue>
            <BuLpgMarketShare activeTab={activeTab}></BuLpgMarketShare>
            <BuLpgCommercialDiscount activeTab={activeTab}></BuLpgCommercialDiscount>
          </TabPanel>
          <div className={``}>
            <BuLpgOperatingCost></BuLpgOperatingCost>
            <BuLpgCcs activeTab={props.activeTab}></BuLpgCcs>
            <div className={`d-flex flex-column justify-content-between ${styles.salesRevenueContiner}`}>
              <div className={`${styles.BuGraphsRow4}`}>
                <BuLpgOthers></BuLpgOthers>
              </div>
              <div className={`mt-3 ${styles.BuGraphsRow4}`}>
                <BuLpgHsse></BuLpgHsse>
              </div>
            </div>
          </div>

          <div className={``}>
            <BuLpgCustomerPopulation className={`${styles.BuGraphsRow1}`}></BuLpgCustomerPopulation>
            <BuLpgDepotInventory activeTab={props.activeTab} className={`${styles.BuGraphsRow1}`} ></BuLpgDepotInventory>
            <BuLpgProjects className={`${styles.BuGraphsRow1}`}></BuLpgProjects>
          </div>

        </div>

      </Tabs>

    </div>
  )
}

export default BuLpgGraphs;