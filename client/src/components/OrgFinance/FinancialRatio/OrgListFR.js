import React from "react";
import styles from "../../OrgListAccordian/OrgListAccordian.module.scss";

import { Accordion, Card } from "react-bootstrap";
import DeltaValuesOrg from "../../DeltaValuesOrg/DeltaValuesOrg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const OrgListFR = () => {
  return (
    <Accordion className={`${styles.listContainer}`}>
      <Card className={`${styles.cardContainer}`}>
        <Accordion.Toggle as={Card.Header} eventKey="1" className={`d-flex align-items-center ${styles.CollapsedListItemContainer}`}>
          <div className={`${styles.kpiTitle}`}>Dept/Equity</div>
          <div className={`${styles.kpiValue}`}>35,450 Cr INR</div>
          <div className={`${styles.deltaComponent}`}>
            <DeltaValuesOrg></DeltaValuesOrg>
          </div>
          <FontAwesomeIcon className={`${styles.expandButton}`} icon={faChevronDown}></FontAwesomeIcon>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1" className={`${styles.ExpandedListItemContainer}`}>
          <span>Expanded State</span>
        </Accordion.Collapse>
        <Accordion.Toggle as={Card.Header} eventKey="1" className={`d-flex align-items-center ${styles.CollapsedListItemContainer}`}>
          <div className={`${styles.kpiTitle}`}>Current</div>
          <div className={`${styles.kpiValue}`}>35,450 Cr INR</div>
          <div className={`${styles.deltaComponent}`}>
            <DeltaValuesOrg></DeltaValuesOrg>
          </div>
          <FontAwesomeIcon className={`${styles.expandButton}`} icon={faChevronDown}></FontAwesomeIcon>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1" className={`${styles.ExpandedListItemContainer}`}>
          <span>Expanded State</span>
        </Accordion.Collapse>
        <Accordion.Toggle as={Card.Header} eventKey="1" className={`d-flex align-items-center ${styles.CollapsedListItemContainer}`}>
          <div className={`${styles.kpiTitle}`}>Interest Coverage</div>
          <div className={`${styles.kpiValue}`}>35,450 Cr INR</div>
          <div className={`${styles.deltaComponent}`}>
            <DeltaValuesOrg></DeltaValuesOrg>
          </div>
          <FontAwesomeIcon className={`${styles.expandButton}`} icon={faChevronDown}></FontAwesomeIcon>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1" className={`${styles.ExpandedListItemContainer}`}>
          <span>Expanded State</span>
        </Accordion.Collapse>
        <Accordion.Toggle as={Card.Header} eventKey="1" className={`d-flex align-items-center ${styles.CollapsedListItemContainer}`}>
          <div className={`${styles.kpiTitle}`}>Inventory Turnover</div>
          <div className={`${styles.kpiValue}`}>35,450 Cr INR</div>
          <div className={`${styles.deltaComponent}`}>
            <DeltaValuesOrg></DeltaValuesOrg>
          </div>
          <FontAwesomeIcon className={`${styles.expandButton}`} icon={faChevronDown}></FontAwesomeIcon>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1" className={`${styles.ExpandedListItemContainer}`}>
          <span>Expanded State</span>
        </Accordion.Collapse>
        <Accordion.Toggle as={Card.Header} eventKey="1" className={`d-flex align-items-center ${styles.CollapsedListItemContainer}`}>
          <div className={`${styles.kpiTitle}`}>Debtors Turnover</div>
          <div className={`${styles.kpiValue}`}>35,450 Cr INR</div>
          <div className={`${styles.deltaComponent}`}>
            <DeltaValuesOrg></DeltaValuesOrg>
          </div>
          <FontAwesomeIcon className={`${styles.expandButton}`} icon={faChevronDown}></FontAwesomeIcon>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1" className={`${styles.ExpandedListItemContainer}`}>
          <span>Expanded State</span>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}
export default OrgListFR;
