import React, { useEffect } from "react";
import styles from "./BuAtfGraphs.module.scss";
import BuAtfSalesRevenue from "./BuAtfSalesRevenue/BuAtfSalesRevenue";
import BuAtfMarketShare from "./BuAtfMarketShare/BuAtfMarketShare";
import BuAtfOperatingCost from "./BuAtfOperatingCost/BuAtfOperatingCost";
import BuAtfCustomerGrowth from "./BuAtfCustomerGrowth/BuAtfCustomerGrowth"
import BuAtfCcs from "./BuAtfCcs/BuAtfCcs"
import BuAtfTankInventory from "./BuAtfTankInventory/BuAtfTankInventory"
import BuAtfOthers from "./BuAtfOthers/BuAtfOthers";
import BuAtfHsse from "./BuAtfHsse/BuAtfHsse";
import BuAtfLossAndGain from "./BuAtfLossAndGain/BuAtfLossAndGain";
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
                <BuAtfSalesRevenue mapOf={props.mapOf}></BuAtfSalesRevenue>
                <BuAtfMarketShare></BuAtfMarketShare>
                <BuAtfOperatingCost></BuAtfOperatingCost>
            </div>
            <div className={`d-flex ${styles.BuGraphsRow2}`}>
                <BuAtfCustomerGrowth activeTab={props.activeTab}></BuAtfCustomerGrowth>
                <BuAtfCcs activeTab={props.activeTab}></BuAtfCcs>
                <BuAtfTankInventory activeTab={props.activeTab}></BuAtfTankInventory>
            </div>
            <div className={`d-flex ${styles.BuGraphsRow3}`}>
                <BuAtfHsse activeTab={props.activeTab}></BuAtfHsse>
                <BuAtfOthers activeTab={props.activeTab}></BuAtfOthers>
                <BuAtfLossAndGain activeTab={props.activeTab}></BuAtfLossAndGain>
            </div>
        </div>
    )
}
export default BuSections