import React, { useState, useEffect } from "react";
import ItrmWorlMap from "../../components/Itrm/ItrmWorldMap/ItrmWorldMap";
import ItrmPriceCurves from "../../components/Itrm/ItrmPriceCurves/ItrmPriceCurves";
import styles from "./ItrmLanding.module.scss";
import ItrmLandedCost from "../../components/Itrm/ItrmLandedCost/ItrmLandedCost";
import ItrmOceanLoss from "../../components/Itrm/ItrmOceanLoss/ItrmOceanLoss";
import ItrmDemurrage from "../../components/Itrm/ItrmDemurrage/ItrmDemurrage";
import ItrmCracksTable from "../../components/Itrm/ItrmCracksTable/ItrmCracksTable";
import ItrmCracksChart from "../../components/Itrm/ItrmCracksChart/ItrmCracksChart";
import environment from "../../environment";

function ITRMLanding() {
  const [location, setLocation] = useState("mumbai");
  const [oceanLossData, setOceanLossData] = useState([]);
  const [demurrageData, setDemurrageData] = useState([]);
  const [landedCostData, setLandedCostData] = useState([]);
  const [selectedRegionname, setSelectedRegionName] = useState("all regions");

  function switchLocation() {
    if (location === "mumbai") {
      setLocation("kochi");
    }
    if (location === "kochi") {
      setLocation("mumbai");
    }
  }

  const fetchRegionNameOnClick = (val) => {
    console.log("landing page", val);
    setSelectedRegionName(val);
  };

  useEffect(() => {
    document.title = 'ITRM | BPCL';
    function fetchItrmData() {
      let url = `${environment.ITRM_KPI_URL}/landed_cost?refinery=mumbai&data_type=ytm&region=${selectedRegionname}`;
      fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          if (response.data.length > 0) {
            let oceanLossArray = [];
            let demurrageArray = [];
            let landedCostArray = [];
            for (let i of response.data) {
              oceanLossArray.push(i.ocean_loss);
              demurrageArray.push({ lp: i.lp_in_hr, dp: i.dp_in_hr });
              landedCostArray.push({
                crude_cost_actual: i.crude_cost_actual,
                crude_cost_target: i.crude_cost_actual,
                freight_cost_actual: i.freight_cost_actual,
                freight_cost_target: i.freight_cost_target,
                taxes_actual: i.taxes_actual,
                taxes_target: i.taxes_target,
              });
            }
            setOceanLossData(oceanLossArray);
            setDemurrageData(demurrageArray);
            setLandedCostData(landedCostArray);
          }
          return false;
        })
        .catch((error) => console.log(error));
    }
    fetchItrmData();
  }, [selectedRegionname, location]);

  return (
    <div className={`${styles.itrmLandingContainer}`}>
      <div
        className={`d-flex align-items-center justify-content-center ${styles.itrmHeading}`}
      >
        International Trade and Risk Management
        <div
          onClick={() => switchLocation()}
          className={`d-flex align-items-center  ${styles.mumbaiKochiButton}`}
        >
          <div
            className={`d-flex justify-content-center align-items-center ${
              location === "mumbai"
                ? styles.mumbaiLeftEnabled
                : styles.mumbaiLeftDisabled
              }`}
          >
            Mumbai
          </div>
          <div
            className={`d-flex align-items-center justify-content-center ${
              location === "kochi"
                ? styles.kochiRightEnabled
                : styles.kochiRightDisabled
              }`}
          >
            Kochi
          </div>
        </div>
      </div>
      <div className={`d-flex ${styles.mapAndGraphContainer}`}>
        <ItrmWorlMap
          fetchRegionName={fetchRegionNameOnClick}
          location={location}
        ></ItrmWorlMap>
        <div className={`d-flex flex-column ${styles.rightGraphContainer}`}>
          <ItrmLandedCost
            landedCostData={landedCostData}
            location={location}
          ></ItrmLandedCost>
          <ItrmOceanLoss
            oceanLossData={oceanLossData}
            location={location}
          ></ItrmOceanLoss>
          <ItrmDemurrage
            demurrageData={demurrageData}
            location={location}
          ></ItrmDemurrage>
        </div>
      </div>
      <div className='d-flex'>
        <ItrmPriceCurves location={location}></ItrmPriceCurves>
        <ItrmCracksChart location={location}></ItrmCracksChart>
        <ItrmCracksTable location={location}></ItrmCracksTable>
      </div>
    </div>
  );
}

export default ITRMLanding;
