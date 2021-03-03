import React from "react";
import styles from "./OrgListAccordian.module.scss";

import { Accordion, Card } from "react-bootstrap";
import DeltaValuesOrg from "../DeltaValuesOrg/DeltaValuesOrg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const OrgListAccordian = () => {
  return (
    <Accordion className={`${styles.listContainer}`}>
      <Card className={`${styles.cardContainer}`}>
        <Accordion.Toggle as={Card.Header} eventKey="1" className={`d-flex align-items-center ${styles.CollapsedListItemContainer}`}>
          <div className={`${styles.kpiTitle}`}>Revenue from operations</div>
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
          <div className={`${styles.kpiTitle}`}>Operating Expenses</div>
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
          <div className={`${styles.kpiTitle}`}>Forex Fluctuation</div>
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
          <div className={`${styles.kpiTitle}`}>Profit Before Tax</div>
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
          <div className={`${styles.kpiTitle}`}>Profit After Tax</div>
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
          <div className={`${styles.kpiTitle}`}>Operating Profit Margin</div>
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
          <div className={`${styles.kpiTitle}`}>EBITDA</div>
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
          <div className={`${styles.kpiTitle}`}>Interest Expenditure</div>
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
          <div className={`${styles.kpiTitle}`}>Inventory Gain/Loss</div>
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
          <div className={`${styles.kpiTitle}`}>Earning Per Equity Share</div>
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
export default OrgListAccordian;
