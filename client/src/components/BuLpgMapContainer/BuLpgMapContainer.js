import React, { useEffect } from "react";

import styles from "./BuLpgMap.module.scss";
import GoogleMap from "./BuLpgGoogleMap/index";
import dropdownArrows from "../../assets/images/dropdownArrows.png";
import { Dropdown } from "react-bootstrap";
import { toTitleCase } from "../../utility/utility";

function BuMap(props) {
  useEffect(() => {
    props.handleRegionDropdown("all regions",{ lat: 18, lng: 80 },5.65)
    // return () => {
    //   cleanup
    // }
  }, [props.activeTab]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={`d-flex flex-column ${styles.BuMapContainerr}`}>
      <div className={`d-flex ${styles.mapHeader}`}>
        <Dropdown className={`${styles.headerDropdown}`}>
          <Dropdown.Toggle variant="none" id="dropdown-basic" className={`d-flex align-items-center ${styles.dropdownButton}`}>
            <span className={`${styles.dropdownName}`}>{toTitleCase(props.mapOf)}</span>
            <div className={`d-flex align-items-center justify-content-center ${styles.dropdownIconContainer}`}>
              <img src={dropdownArrows} alt='All region dropdown'></img>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className={`${styles.dropdownMenuContainer}`}>
            <Dropdown.Item className={`${styles.menuItem}`} onClick={() => props.handleRegionDropdown("all regions", { lat: 18, lng: 80 }, 5.65)}>All Regions</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} onClick={() => props.handleRegionDropdown("north", { lat: 26.7, lng: 77.4 }, 6.2)}>North</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} onClick={() => props.handleRegionDropdown("south", { lat: 10.4, lng: 78.75 }, 6.2)}>South</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} onClick={() => props.handleRegionDropdown("east", { lat: 20.0, lng: 88.5 }, 6.2)}>East</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} onClick={() => props.handleRegionDropdown("west", { lat: 19.9, lng: 74.7 }, 6.2)}>West</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className={`${styles.headerDropdown}`}>
          <Dropdown.Toggle variant="none" id="dropdown-basic" className={`d-flex align-items-center ${styles.dropdownButton}`}>
            <span className={`${styles.dropdownName}`}>All States & UTs</span>
            <div className={`d-flex align-items-center justify-content-center ${styles.dropdownIconContainer}`}>
              <img src={dropdownArrows} alt='All region dropdown'></img>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className={`${styles.dropdownMenuContainer}`}>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className={`${styles.headerDropdown}`}>
          <Dropdown.Toggle variant="none" id="dropdown-basic" className={`d-flex align-items-center ${styles.dropdownButton}`}>
            <span className={`${styles.dropdownName}`}>All Territories</span>
            <div className={`d-flex align-items-center justify-content-center ${styles.dropdownIconContainer}`}>
              <img src={dropdownArrows} alt='All region dropdown'></img>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className={`${styles.dropdownMenuContainer}`}>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className={`${styles.headerDropdown}`}>
          <Dropdown.Toggle variant="none" id="dropdown-basic" className={`d-flex align-items-center ${styles.dropdownButton}`}>
            <span className={`${styles.dropdownName}`}>All Districts</span>
            <div className={`d-flex align-items-center justify-content-center ${styles.dropdownIconContainer}`}>
              <img src={dropdownArrows} alt='All region dropdown'></img>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className={`${styles.dropdownMenuContainer}`}>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className={`${styles.headerDropdown}`}>
          <Dropdown.Toggle variant="none" id="dropdown-basic" className={`d-flex align-items-center ${styles.dropdownButton}`}>
            <span className={`${styles.dropdownName}`}>All Sales Areas</span>
            <div className={`d-flex align-items-center justify-content-center ${styles.dropdownIconContainer}`}>
              <img src={dropdownArrows} alt='All region dropdown'></img>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className={`${styles.dropdownMenuContainer}`}>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item className={`${styles.menuItem}`} href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className={`${styles.indiaMap}`}>
        <GoogleMap
          handleRegionDropdown={props.handleRegionDropdown}
          mapOf={props.mapOf}
          mapCenter={props.mapCenter}
          mapZoom={props.mapZoom}
          activeTab={props.activeTab}
        >
        </GoogleMap>
      </div>
      
    </div>
  )
}
export default BuMap