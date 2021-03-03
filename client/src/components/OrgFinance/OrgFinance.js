import React, {useState} from "react";
import styles from "./OrgFinance.module.scss";
import FinanceGrowth from "./FinanceGrowth/FinanceGrowth";
import FinanceMarket from "./FinanceMarket/FinanceMarket";
import FinanceTreasurey from "./FinanceTreasurey/FinanceTreasurey";
import ProfitLoss from "./ProfitLoss/ProfitLoss";
import TotalCapex from "./TotalCapex/TotalCapex";
import BalanceSheets from "./BalanceSheets/BalanceSheets";
import FinancialRation from "./FinancialRatio/FinancialRatio";
import { Dropdown } from "react-bootstrap";
import dropdownArrows from "../../assets/images/dropdownArrows.png";

const OrgFinance = () => {
  const [ofdropdown, setofdropdown] = useState('YTM');
  return (
    <div className={`${styles.financeContainer}`}>
      <div className={`d-flex align-items-center justify-content-center ${styles.financeHeader}`}>Finance
          <Dropdown className={`${styles.gheaderDropdown}`}>
            <Dropdown.Toggle variant="none" id="dropdown-basic" className={`d-flex align-items-center ${styles.gdropdownButton}`}>
              <span className={`${styles.gdropdownName}`}>View as {ofdropdown}</span>
              <div className={`d-flex align-items-center justify-content-center ${styles.gdropdownIconContainer}`}>
                <img src={dropdownArrows} alt='All region dropdown'></img>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles.gdropdownMenuContainer}`}>
              <Dropdown.Item className={`${styles.gmenuItem}`} onClick={() => setofdropdown('YTM')}>YTM</Dropdown.Item>
              <Dropdown.Item className={`${styles.gmenuItem}`} onClick={() => setofdropdown('MTD')}>MTD</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </div>
      <div className={`d-flex flex-column ${styles.financeContentContainer}`}>
        <div className={`d-flex ${styles.growthAndMarketContainer}`}>
          <FinanceGrowth></FinanceGrowth>
          <FinanceMarket></FinanceMarket>
        </div>
        <div className={`d-flex ${styles.restOfFinanceContainer}`}>
          <div className={`d-flex flex-column justify-content-between ${styles.column1}`}>
            <ProfitLoss></ProfitLoss>
            <TotalCapex></TotalCapex>
          </div>
          <FinanceTreasurey></FinanceTreasurey>
          <div className={`d-flex flex-column justify-content-between ${styles.column3}`}>
            <FinancialRation></FinancialRation>
            <BalanceSheets></BalanceSheets>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrgFinance;