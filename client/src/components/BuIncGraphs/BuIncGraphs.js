import React, { useEffect } from "react";
import styles from "./BuIncGraphs.module.scss";
import BuIncSalesRevenue from "./BuIncSalesRevenue/BuIncSalesRevenue";
import BuIncMarketShare from "./BuIncMarketShare/BuIncMarketShare";
import BuIncProfitAnalysis from "./BuIncProfitAnalysis/BuIncProfitAnalysis";
import BuIncIndendationRatio from "./BuIncIndendationRatio/BuIncIndendationRatio"
import BuIncInventory from "./BuIncInventory/BuIncInventory";
import BuIncCcs from "./BuIncCcs/BuIncCcs"
import BuIncHsse from "./BuIncHsse/BuIncHsse";
import BuIncOutstanding from "./BuIncOutstanding/BuIncOutstanding";
import BuIncOutstandingTerritory from "./BuIncOutstandingTerritory/BuIncOutstandingTerritory";
import { Dropdown } from "react-bootstrap";
import dropdownArrows from "../../assets/images/dropdownArrows.png";

function BuSections(props) {
    useEffect(() => {
    }, [props.activeTab])

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
                <BuIncSalesRevenue mapOf={props.mapOf}></BuIncSalesRevenue>
                <BuIncMarketShare></BuIncMarketShare>
                <BuIncProfitAnalysis></BuIncProfitAnalysis>
            </div>
            <div className={`d-flex ${styles.BuGraphsRow2}`}>
                <BuIncIndendationRatio activeTab={props.activeTab}></BuIncIndendationRatio>
                <BuIncInventory activeTab={props.activeTab}></BuIncInventory>
                <BuIncCcs activeTab={props.activeTab}></BuIncCcs>
            </div>
            <div className={`d-flex ${styles.BuGraphsRow3}`}>
                <BuIncHsse activeTab={props.activeTab}></BuIncHsse>
                <BuIncOutstanding activeTab={props.activeTab}></BuIncOutstanding>
                <BuIncOutstandingTerritory activeTab={props.activeTab}></BuIncOutstandingTerritory>
            </div>
        </div>
    )
}
export default BuSections