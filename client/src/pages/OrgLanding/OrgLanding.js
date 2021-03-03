import React from "react";
import styles from "./OrgLanding.module.scss";
import OrgFinance from "../../components/OrgFinance/OrgFinance";
import OrgHr from "../../components/OrgHr/OrgHr";
import OrgHsse from "../../components/OrgHsse/OrgHsse";
import OrgNews from "../../components/OrgNews/OrgNews";


const OrgLanding = () => {
  document.title = 'Organization KPIs | BPCL';
  return (
    <div className={`${styles.orgLandingContainer}`}>
      <div className={`d-flex align-items-center justify-content-center ${styles.orgLandingHeader}`}>Organization KPIs</div>
      <div className={`d-flex ${styles.orgLandingContentContainer}`}>
        <OrgFinance></OrgFinance>
        <OrgHr></OrgHr>
        <div className={`d-flex flex-column ${styles.hsseNewsContainer}`}>
          <OrgHsse></OrgHsse>
          <OrgNews></OrgNews>
        </div>
      </div>
    </div>
  )
}
export default OrgLanding;