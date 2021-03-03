import React, {useState} from "react";
import styles from "./OrgHr.module.scss";
import EmployeeDataAndRecruitment from "./EmployeeDataAndRecruitment/EmployeeDataAndRecruitment";
import EthicalHr from "./EthicalHr/EthicalHr";
import LearningDevelopment from "./LearningDevelopment/LearningDevelopment";
import PerformanceAndProductivity from "./PerformanceAndProductivity/PerformanceAndProductivity";
import { Dropdown } from "react-bootstrap";
import dropdownArrows from "../../assets/images/dropdownArrows.png";

const OrgHr = () => {
  const [ohrdropdown, setohrdropdown] = useState('YTM');
  return (
    <div className={`${styles.hrContainer}`}>
      <div className={`d-flex align-items-center justify-content-center ${styles.hrHeader}`}>HR
      <Dropdown className={`${styles.hrheaderDropdown}`}>
            <Dropdown.Toggle variant="none" id="dropdown-basic" className={`d-flex align-items-center ${styles.hrdropdownButton}`}>
              <span className={`${styles.hrdropdownName}`}>View as {ohrdropdown}</span>
              <div className={`d-flex align-items-center justify-content-center ${styles.hrdropdownIconContainer}`}>
                <img src={dropdownArrows} alt='All region dropdown'></img>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles.hrdropdownMenuContainer}`}>
              <Dropdown.Item className={`${styles.hrmenuItem}`} onClick={() => setohrdropdown('YTM')} >YTM</Dropdown.Item>
              <Dropdown.Item className={`${styles.hrmenuItem}`} onClick={() => setohrdropdown('MTD')}>MTD</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </div>
      <div className={`${styles.hrContentContainer}`}>
        <EmployeeDataAndRecruitment></EmployeeDataAndRecruitment>
        <EthicalHr></EthicalHr>
        <LearningDevelopment></LearningDevelopment>
        <PerformanceAndProductivity></PerformanceAndProductivity>
      </div>
    </div>
  )
}
export default OrgHr;