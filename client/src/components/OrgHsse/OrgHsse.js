import React, {useState} from "react";
import styles from "./OrgHsse.module.scss";
import DeltaValuesWithTotalOrg from "../DeltaValuesWithTotalOrg/DeltaValuesWithTotalOrg";
import PendingRecGraph from "./PendingReccGraph";
import deltaTriangle from "../../assets/images/deltaTriangle.png";
import { Dropdown } from "react-bootstrap";
import dropdownArrows from "../../assets/images/dropdownArrows.png";

const OrgHsse = () => {
  const [ohsdropdown, setohsdropdown] = useState('YTM');
  return (
    <div className={`${styles.hsseContainer}`}>
      <div className={`d-flex align-items-center justify-content-center ${styles.hsseHeader}`}>HSSE
        <Dropdown className={`${styles.hsheaderDropdown}`}>
            <Dropdown.Toggle variant="none" id="dropdown-basic" className={`d-flex align-items-center ${styles.hsdropdownButton}`}>
              <span className={`${styles.hsdropdownName}`}>View as {ohsdropdown}</span>
              <div className={`d-flex align-items-center justify-content-center ${styles.hsdropdownIconContainer}`}>
                <img src={dropdownArrows} alt='All region dropdown'></img>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles.hsdropdownMenuContainer}`}>
              <Dropdown.Item className={`${styles.hsmenuItem}`} onClick={() => setohsdropdown('YTM')} >YTM</Dropdown.Item>
              <Dropdown.Item className={`${styles.hsmenuItem}`} onClick={() => setohsdropdown('MTD')} >MTD</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </div>
      <div className={`d-flex ${styles.hsseContentContainerTop}`}>
        <div className={`d-flex flex-column justify-content-between ${styles.pendingReccContainer}`}>
          <div className={`${styles.graphHeader}`}>
            <div className={`${styles.graphTitle}`}>Pending ESA & ISA Recomm. </div>
            <div className={`d-flex ${styles.graphLegendsContainer}`}>
              <div className="mr-4 d-flex align-items-center">
                <span className={`mr-2 ${styles.dot1}`} style={{ backgroundColor: "#00cea4" }}></span> Refinery
              </div>
              <div className="mr-4 d-flex align-items-center">
                <span className={`mr-2 ${styles.dot2}`} style={{ backgroundColor: "#00b2e7" }}></span>Marketing
              </div>
            </div>
          </div>
          <div className={`${styles.graphContainer}`}>
            <PendingRecGraph></PendingRecGraph>
          </div>
        </div>
        <div className={`d-flex flex-column justify-content-between ${styles.pendingReccContainer}`}>
          <div className={`${styles.graphHeader}`}>
            <div className={`${styles.graphTitle}`}>Incident Reported </div>
            <div className={`d-flex ${styles.graphLegendsContainer}`}>
              <div className="mr-4 d-flex align-items-center">
                <span className={`mr-2 ${styles.dot1}`} style={{ backgroundColor: "#f097a0" }}></span> Minor
              </div>
              <div className="mr-4 d-flex align-items-center">
                <span className={`mr-2 ${styles.dot2}`} style={{ backgroundColor: "#ff6271" }}></span>Serious
              </div>
              <div className="mr-4 d-flex align-items-center">
                <span className={`mr-2 ${styles.dot2}`} style={{ backgroundColor: "#b5424d" }}></span>Major
              </div>
            </div>
          </div>
          <div className={`${styles.graphContainer}`}>
            <div className={`${styles.barContainer}`}>
              <div className={`d-flex justify-content-between align-items-center ${styles.barHeader}`}>
                <div className={`d-flex`}>
                  <span className={`${styles.barHeaderTitle} mr-2`}>Refinery</span>
                  <span>354</span>
                </div>
                <div className={`d-flex  ${styles.deltaValuesContainer}`}>
                  <div className={`mr-4 ${styles.container}`}>
                    <span className={`${styles.title}`}>
                      <img className={`${styles.deltaIcon}`} src={deltaTriangle} alt="delta"></img>Q:
                      </span>
                    <span className={`${styles.value}`} style={{ color: "#ff5b4f" }}>+2.2%</span>
                  </div>
                </div>
              </div>
              <div className={`d-flex pt-2 `} >
                <div className={`d-flex flex-column justify-content-center ${styles.progressBar}`} style={{ width: "35%" }}>
                  <span className={`pl-3 ${styles.stack1}`} >35</span>
                </div>
                <div className={`d-flex flex-column  ${styles.progressBar}`} style={{ width: "40%" }}>
                  <span className={`pl-3 ${styles.stack2}`}>40</span>
                </div>
                <div className={`d-flex flex-column  ${styles.progressBar}`} style={{ width: "45%" }}>
                  <span className={`pl-3 ${styles.stack3}`}>45</span>
                </div>
              </div>
            </div>

            <div className={`${styles.barContainer} pt-5`}>
              <div className={`d-flex justify-content-between align-items-center ${styles.barHeader}`}>
                <div className={`d-flex`}>
                  <span className={`${styles.barHeaderTitle} mr-2`}>Marketing</span>
                  <span>354</span>
                </div>
                <div className={`d-flex ${styles.deltaValuesContainer}`}>
                  <div className={`mr-4 ${styles.container}`}>
                    <span className={`${styles.title}`}>
                      <img className={`${styles.deltaIcon}`} src={deltaTriangle} alt="delta"></img>Q:
                      </span>
                    <span className={`${styles.value}`} style={{ color: "#ff5b4f" }}>+2.2%</span>
                  </div>
                </div>
              </div>
              <div className={`d-flex pt-2 `} >
                <div className={`d-flex flex-column justify-content-center ${styles.progressBar}`} style={{ width: "35%" }}>
                  <span className={`pl-3 ${styles.stack1}`} >35</span>
                </div>
                <div className={`d-flex flex-column  ${styles.progressBar}`} style={{ width: "40%" }}>
                  <span className={`pl-3 ${styles.stack2}`}>40</span>
                </div>
                <div className={`d-flex flex-column  ${styles.progressBar}`} style={{ width: "45%" }}>
                  <span className={`pl-3 ${styles.stack3}`}>45</span>
                </div>
              </div>
            </div>
            <div className={`${styles.barContainer} pt-5`}>
              <div className={`d-flex`}>
                <div style={{width : '16.6666666667%'}}>
                  <span className={`${styles.indicatorprogress}`}>20</span>
                </div>
                <div style={{width : '16.6666666667%'}}>
                  <span className={`${styles.indicatorprogress}`}>40</span>
                </div>
                <div style={{width : '16.6666666667%'}}>
                  <span className={`${styles.indicatorprogress}`}>60</span>
                </div>
                <div style={{width : '16.6666666667%'}}>
                  <span className={`${styles.indicatorprogress}`}>80</span>
                </div>
                <div style={{width : '16.6666666667%'}}>
                  <span className={`${styles.indicatorprogress}`}>100</span>
                </div>
                <div style={{width : '16.6666666667%'}}>
                  <span className={`${styles.indicatorprogress}`}>120</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.hsseContentContainerBottom}`}>
        <div className="d-flex justify-content-end align-items-center">
          <div className={`d-flex justify-content-center ${styles.headingRefinery}`}>Refinery</div>
          <div className={`d-flex justify-content-center ${styles.headingMarketing}`}>Marketing</div>
        </div>
        <div className={`d-flex ${styles.listItemContainer}`}>
          <div className={`d-flex align-items-center ${styles.kpiTitle}`}>Environmental Incidents</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.refineryKpi}`}>
            <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
          </div>
          <div className={`d-flex align-items-center justify-content-center ${styles.marketingKpi}`}>
            <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
          </div>
        </div>
        <div className={`d-flex ${styles.listItemContainer}`}>
          <div className={`d-flex align-items-center ${styles.kpiTitle}`}>Accident Free Mill. Man hrs</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.refineryKpi}`}>
            <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
          </div>
          <div className={`d-flex align-items-center justify-content-center ${styles.marketingKpi}`}>
            <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
          </div>
        </div>
        <div className={`d-flex ${styles.listItemContainer}`}>
          <div className={`d-flex align-items-center ${styles.kpiTitle}`}>CAPA Compliance</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.refineryKpi}`}>
            <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
          </div>
          <div className={`d-flex align-items-center justify-content-center ${styles.marketingKpi}`}>
            <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
          </div>
        </div>
        <div className={`d-flex ${styles.listItemContainer}`}>
          <div className={`d-flex align-items-center ${styles.kpiTitle}`}>LIFTR</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.refineryKpi}`}>
            <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
          </div>
          <div className={`d-flex align-items-center justify-content-center ${styles.marketingKpi}`}>
            <DeltaValuesWithTotalOrg></DeltaValuesWithTotalOrg>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrgHsse;