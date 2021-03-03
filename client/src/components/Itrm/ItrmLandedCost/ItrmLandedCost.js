import React, { useState, useEffect } from 'react';

import { library } from "@fortawesome/fontawesome-svg-core";
// import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import Checkbox from "../../Checkbox.js/Checkbox";
import styles from "./ItrmLandedCost.module.scss";
import LandedCostGraph from "./LandedCostGraph";
import landedCostLegend from "../../../assets/images/landedCostLegend.png";
import mumbaiLandedCost from "../../../assets/images/mumbaiLandedCost.png";
library.add(faCheckSquare, faSquare);

function ItrmLandedCost(props) {

  const [crudeBox, setCrudeBox] = useState(true);
  const [freightBox, setFreightBox] = useState(true);
  const [taxesBox, setTaxesBox] = useState(true);

  const onCheckStateChanged = (event) => {
    if (event.name === "crudeBox") {
      setCrudeBox(event.checkState);
    }
    if (event.name === "freightBox") {
      setFreightBox(event.checkState);
    }
    if (event.name === "taxesBox") {
      setTaxesBox(event.checkState);
    }
  }

  useEffect(() => {
  }, [props.landedCostData])

  return (
    <div className={`${styles.itrmLandedCostContainer}`}>
      <div className={`d-flex justify-content-between align-items-center ${styles.headerContainer}`}>
        <div className={`d-flex flex-column justify-content-between ${styles.headerLeft}`}>
          <div className={`${styles.heading}`}>
            <span>Landed Cost ($/Barrel)</span>
          </div>
          <div className={`d-flex ${styles.labels}`}>
            <div className="d-flex align-items-center mr-3">
              <span className={`mr-2 ${props.location === "mumbai" ? styles.mumbaiCrudeDot : styles.kochiCrudeDot}`}></span>Crude
            </div>
            <div className="d-flex align-items-center mx-3">
              <span className={`mr-2 ${props.location === "mumbai" ? styles.mumbaiFreightDot : styles.kochiFreightDot} `}></span>Freight
            </div>
            <div className="d-flex align-items-center mx-3">
              <span className={`mr-2 ${props.location === "mumbai" ? styles.mumbaiTaxesDot : styles.kochiTaxesDot}`}></span>Taxes
            </div>
            <div className="d-flex align-items-center mx-3">
              {
                props.location === "mumbai" ?
                  <img className={`mr-2 `} src={mumbaiLandedCost} alt='Legend for Landed Cost'></img> :
                  <img className={`mr-2 `} src={landedCostLegend} alt='Legend for Landed Cost'></img>
              }
              Landed Cost
            </div>
          </div>
        </div>
        <div className={`${styles.headerRight}`}>
          <span className={`${props.location === "mumbai" ? styles.mumbaiTheme : styles.kochiTheme}`}>--- YTM : $74/bbl</span>
        </div>
      </div>
      <div className={`d-flex ${styles.graphContainer}`}>
        <LandedCostGraph landedCostData={props.landedCostData} location={props.location} crudeBox={crudeBox} freightBox={freightBox} taxesBox={taxesBox} ></LandedCostGraph>
        <div className={`d-flex flex-column justify-content-center ${styles.graphFilters}`}>
          <Checkbox
            size="sm"
            name="crudeBox"
            label="Crude"
            checked={crudeBox}
            onChange={(e) => onCheckStateChanged(e)}
          ></Checkbox>
          <Checkbox
            size="sm"
            name="freightBox"
            label="Freight"
            checked={freightBox}
            onChange={(e) => onCheckStateChanged(e)}
          ></Checkbox>
          <Checkbox
            size="sm"
            name="taxesBox"
            label="Taxes"
            checked={taxesBox}
            onChange={(e) => onCheckStateChanged(e)}
          ></Checkbox>
        </div>
      </div>
    </div>
  )
}
export default ItrmLandedCost;