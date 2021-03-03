import React, { useState } from "react";
import styles from "./BuLanding.module.scss";
import BuRetailMapContainer from "../../components/BuRetailMapContainer/BuRetailMapContainer";
import BuLubesMapContainer from "../../components/BuLubesMapContainer/BuLubesMapContainer";
import BuLpgMapContainer from "../../components/BuLpgMapContainer/BuLpgMapContainer";
import BuGraphs from "../../components/BuRetailGraphs/BuGraphs";
import BuLpgGraphs from "../../components/BuLpgGraphs/BuLpgGraphs";
import BuLubesGraphs from "../../components/BuLubesGraphs/BuLubesGraphs";
import BuAtfGraphs from "../../components/BuAtfGraphs/BuAtfGraphs";
import BuAtfMapContainer from "../../components/BuAtfMapContainer/BuAtfMapContainer";
import BuIncGraphs from "../../components/BuIncGraphs/BuIncGraphs";
import BuIncMapContainer from "../../components/BuIncMapContainer/BuIncMapContainer"
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";

function BuLanding(props) {
  document.title = 'Business Unit | BPCL';
  const [mapOf, setMapOf] = useState("all regions");
  const [mapCenter, setMapCenter] = useState({ lat: 18, lng: 80 });
  const [mapZoom, setMapZoom] = useState(5.65);
  const [activeTab, setActiveTab] = useState("retail_tab");

  function handleRegionDropdown(mapRegion, mapCenter, mapZoom) {
    setMapOf(mapRegion);
    setMapCenter(mapCenter);
    setMapZoom(mapZoom);
  }

  function activateTab(tabId) {
    setActiveTab(tabId)
  }

  return (
    <div className={`${styles.BuContainer}`}>
      <div className={`d-flex align-items-center justify-content-center ${styles.BuHeading}`}>Business Units</div>
      <Tabs
        defaultTab="retail_tab"
        className={`d-flex ${styles.BuContent}`}
        onChange={(tabId) => activateTab(tabId)}
      >
        <TabList className={`${styles.BuSectionsContainer}`}>
          <div className={`d-flex align-items-center justify-content-around p-2 ${styles.tabLabelsContainer}`}>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.poorDot}`}></span>Poor</div>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.fairDot}`}></span>Fair</div>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.goodDot}`}></span>Good</div>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.excellentDot}`}></span>Excellent</div>
          </div>
          <Tab tabFor="overal_tab" className={`${activeTab === "overal_tab" && styles.tabOverallActive} ${styles.tabOverall}`}>
            <div className={`d-flex align-items-center ${activeTab === "overal_tab" && styles.overallHeaderActive} ${styles.overallHeader}`}>OVERALL</div>
            <div className={`${styles.overallContent} ${activeTab === "overal_tab" && styles.overallContentActive} `}>
              <div className={`${styles.tabKpi}`}>Sales</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarRed}`}>
                  <span style={{ width: "30%" }}></span>
                </div>
                <span className={`ml-4`}>330 TKL</span>
              </div>

              <div className={`${styles.tabKpi}`}>Revenue</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarYellow}`}>
                  <span style={{ width: "80%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>INR 330 Cr</span>
              </div>

              <div className={`${styles.tabKpi}`}>Market Share</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarGreen}`}>
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>53%</span>
              </div>

              <div className={`${styles.tabKpi}`}>HSSE (Incidents)</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarOrange}`}>
                  <span style={{ width: "60%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>800</span>
              </div>
            </div>
          </Tab>
          <Tab tabFor="retail_tab" className={`${activeTab === "retail_tab" && styles.tabOverallActive} ${styles.tabOverall}`}>
            <div className={`d-flex align-items-center ${activeTab === "retail_tab" && styles.overallHeaderActive} ${styles.overallHeader}`}>RETAIL</div>
            <div className={`${styles.overallContent} ${activeTab === "retail_tab" && styles.overallContentActive} `}>
              <div className={`${styles.tabKpi}`}>Sales</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarRed}`}>
                  <span style={{ width: "30%" }}></span>
                </div>
                <span className={`ml-4`}>330 TKL</span>
              </div>

              <div className={`${styles.tabKpi}`}>Revenue</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarYellow}`}>
                  <span style={{ width: "80%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>INR 330 Cr</span>
              </div>

              <div className={`${styles.tabKpi}`}>Market Share</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarGreen}`}>
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>53%</span>
              </div>

              <div className={`${styles.tabKpi}`}>HSSE (Incidents)</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarOrange}`}>
                  <span style={{ width: "60%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>800</span>
              </div>
            </div>
          </Tab>
          <Tab tabFor="lpg_tab" className={`${activeTab === "lpg_tab" && styles.tabOverallActive} ${styles.tabOverall}`}>
            <div className={`d-flex align-items-center ${activeTab === "lpg_tab" && styles.overallHeaderActive} ${styles.overallHeader}`}>LPG</div>
            <div className={`${styles.overallContent} ${activeTab === "lpg_tab" && styles.overallContentActive} `}>
              <div className={`${styles.tabKpi}`}>Sales</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarRed}`}>
                  <span style={{ width: "30%" }}></span>
                </div>
                <span className={`ml-4`}>330 TKL</span>
              </div>

              <div className={`${styles.tabKpi}`}>Revenue</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarYellow}`}>
                  <span style={{ width: "80%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>INR 330 Cr</span>
              </div>

              <div className={`${styles.tabKpi}`}>Market Share</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarGreen}`}>
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>53%</span>
              </div>

              <div className={`${styles.tabKpi}`}>HSSE (Incidents)</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarOrange}`}>
                  <span style={{ width: "60%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>800</span>
              </div>
            </div>
          </Tab>
          <Tab tabFor="lubes_tab" className={`${activeTab === "lubes_tab" && styles.tabOverallActive} ${styles.tabOverall}`}>
            <div className={`d-flex align-items-center ${activeTab === "lubes_tab" && styles.overallHeaderActive} ${styles.overallHeader}`}>LUBES</div>
            <div className={`${styles.overallContent} ${activeTab === "lubes_tab" && styles.overallContentActive} `}>
              <div className={`${styles.tabKpi}`}>Sales</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarRed}`}>
                  <span style={{ width: "30%" }}></span>
                </div>
                <span className={`ml-4`}>330 TKL</span>
              </div>

              <div className={`${styles.tabKpi}`}>Revenue</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarYellow}`}>
                  <span style={{ width: "80%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>INR 330 Cr</span>
              </div>

              <div className={`${styles.tabKpi}`}>Market Share</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarGreen}`}>
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>53%</span>
              </div>

              <div className={`${styles.tabKpi}`}>HSSE (Incidents)</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarOrange}`}>
                  <span style={{ width: "60%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>800</span>
              </div>
            </div>
          </Tab>
          <Tab tabFor="inc_tab" className={`${activeTab === "inc_tab" && styles.tabOverallActive} ${styles.tabOverall}`}>
            <div className={`d-flex align-items-center ${activeTab === "inc_tab" && styles.overallHeaderActive} ${styles.overallHeader}`}>INC</div>
            <div className={`${styles.overallContent} ${activeTab === "inc_tab" && styles.overallContentActive}`}>
              <div className={`${styles.tabKpi}`}>Sales</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarRed}`}>
                  <span style={{ width: "30%" }}></span>
                </div>
                <span className={`ml-4`}>330 TKL</span>
              </div>

              <div className={`${styles.tabKpi}`}>Revenue</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarYellow}`}>
                  <span style={{ width: "80%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>INR 330 Cr</span>
              </div>

              <div className={`${styles.tabKpi}`}>Market Share</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarGreen}`}>
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>53%</span>
              </div>

              <div className={`${styles.tabKpi}`}>HSSE (Incidents)</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarOrange}`}>
                  <span style={{ width: "60%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>800</span>
              </div>
            </div>
          </Tab>
          <Tab tabFor="atf_tab" className={`${activeTab === "atf_tab" && styles.tabOverallActive} ${styles.tabOverall}`}>
            <div className={`d-flex align-items-center ${activeTab === "atf_tab" && styles.overallHeaderActive}  ${styles.overallHeader} `}>ATF</div>
            <div className={`${styles.overallContent} ${activeTab === "atf_tab" && styles.overallContentActive}`}>
              <div className={`${styles.tabKpi}`}>Sales</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarRed}`}>
                  <span style={{ width: "30%" }}></span>
                </div>
                <span className={`ml-4`}>330 TKL</span>
              </div>

              <div className={`${styles.tabKpi}`}>Revenue</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarYellow}`}>
                  <span style={{ width: "80%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>INR 330 Cr</span>
              </div>

              <div className={`${styles.tabKpi}`}>Market Share</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarGreen}`}>
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>53%</span>
              </div>

              <div className={`${styles.tabKpi}`}>HSSE (Incidents)</div>
              <div className={`d-flex align-items-center ${styles.barAndValue}`}>
                <div className={`${styles.progressBarOrange}`}>
                  <span style={{ width: "60%" }}></span>
                </div>
                <span className={`ml-4 ${styles.tabKpiValue}`}>800</span>
              </div>
            </div>
          </Tab>
        </TabList>
        <TabPanel tabId="retail_tab">
          <div className={`d-flex align-items-center`}>
            <BuRetailMapContainer
              handleRegionDropdown={handleRegionDropdown}
              mapOf={mapOf}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              activeTab={activeTab}
            ></BuRetailMapContainer>
            <BuGraphs
              handleRegionDropdown={handleRegionDropdown}
              mapOf={mapOf}
              activeTab={activeTab}
            ></BuGraphs>
          </div>
        </TabPanel>
        <TabPanel tabId="lpg_tab" >
          <div className={`d-flex`}>
            <BuLpgMapContainer
              handleRegionDropdown={handleRegionDropdown}
              mapOf={mapOf}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              activeTab={activeTab}
            ></BuLpgMapContainer>
            <BuLpgGraphs
              handleRegionDropdown={handleRegionDropdown}
              mapOf={mapOf}
              activeTab={activeTab}
            ></BuLpgGraphs>
          </div>
        </TabPanel>
        <TabPanel tabId="lubes_tab">
          <div className={`d-flex align-items-center`}>
            <BuLubesMapContainer
              handleRegionDropdown={handleRegionDropdown}
              mapOf={mapOf}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              activeTab={activeTab}
            ></BuLubesMapContainer>
            <BuLubesGraphs
              handleRegionDropdown={handleRegionDropdown}
              mapOf={mapOf}
              activeTab={activeTab}
            ></BuLubesGraphs>
          </div>
        </TabPanel>
        <TabPanel tabId="atf_tab">
          <div className={`d-flex align-items-center`}>
            <BuAtfMapContainer
              handleRegionDropdown={handleRegionDropdown}
              mapOf={mapOf}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              activeTab={activeTab}
            ></BuAtfMapContainer>
            <BuAtfGraphs
              handleRegionDropdown={handleRegionDropdown}
              mapOf={mapOf}
              activeTab={activeTab}
            ></BuAtfGraphs>
          </div>
        </TabPanel>
        <TabPanel tabId="inc_tab">
          <div className={`d-flex align-items-center`}>
            <BuIncMapContainer 
              handleRegionDropdown={handleRegionDropdown}
              mapOf={mapOf}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              activeTab={activeTab}
            ></BuIncMapContainer>
            <BuIncGraphs
              handleRegionDropdown={handleRegionDropdown}
              mapOf={mapOf}
              activeTab={activeTab}
            ></BuIncGraphs>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )

}
export default BuLanding;