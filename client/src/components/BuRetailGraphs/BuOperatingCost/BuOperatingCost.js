import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import BuOperatingCostBarGraph from "./BuOperatingCostBarGraph"
import styles from "./BuOperatingCost.module.scss";
import Checkbox from "../../../components/Checkbox.js/Checkbox";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuOperatingCost(props) {
  const [staffCostVar, setStaffCostStatus] = useState(true);
  const [rmVar, setRmStatus] = useState(true);
  const [rentalVar, setRentalStatus] = useState(true);
  const [thirdPartyVar, setThirdPartyStatus] = useState(true);
  const [salesProVar, setSalesProStatus] = useState(true);
  const [othersVar, setOthersStatus] = useState(true);
  const [graphData, setGraphData] = useState([]);

  
  useEffect(() => {
    function prepareGraphData() {
      let url = `${environment.BU_KPI_URL}/operating/data?business_unit=retail&kpi_name=operating cost&data_type=ytm&level=country&product=${props.product}`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setGraphData(response.data);
        })
        .catch(error => console.log(error));
    }
    prepareGraphData();
  }, [props.product])

  const onCheckStateChanged = (event) => {
    if (event.name === "all") {
      if (event.checkState) {
        setStaffCostStatus(true);
        setRmStatus(true);
        setRentalStatus(true);
        setThirdPartyStatus(true);
        setSalesProStatus(true);
        setOthersStatus(true);
      }
      else {
        setStaffCostStatus(false);
        setRmStatus(false);
        setRentalStatus(false);
        setThirdPartyStatus(false);
        setSalesProStatus(false);
        setOthersStatus(false);
      }
    }
    if (event.name === "staffCost") {
      setStaffCostStatus(event.checkState);
    }
    if (event.name === "rm") {
      setRmStatus(event.checkState);
    }
    if (event.name === "rental") {
      setRentalStatus(event.checkState);
    }
    if (event.name === "thirdParty") {
      setThirdPartyStatus(event.checkState);
    }
    if (event.name === "salesPro") {
      setSalesProStatus(event.checkState);
    }
    if (event.name === "others") {
      setOthersStatus(event.checkState);
    }
  }
  return (
    <div className={`${styles.BuOperatingCostContiner}`}>
      <div className={`pt-2 ${styles.headerContainer}`}>
        <div className={`row`}>
          <div className={`col-8`}>
            <span>Operating Cost</span>
          </div>
          <div className={`col-4 mt-2 ${styles.headerRight}`}>
            <span>Total: 330 INR</span>
            <span className={`ml-4`} style={{ color: "#e13219" }}>-10%</span>
          </div>
        </div>
        <div className={`row pt-2`}>
          <div className={`col-9 d-flex align-items-center ${styles.headerLabels}`}>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.staffCostDot}`}></span>Staff Cost</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.rmDot}`}></span>R&M</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.rentalDot}`}></span>Rental</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.thirdPartyDot}`}></span>3rd Party</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.salesProDot}`}></span>Sales Pro.</div>
            <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.othersDot}`}></span>Others</div>
          </div>
          <div className={`col-3 ${styles.headerLabelsTarget}`}>
            <span>---- Target</span>
          </div>
        </div>
      </div>
      <div className={`d-flex ${styles.graphContainer}`}>
        {
          graphData ?
            <BuOperatingCostBarGraph graphData={graphData}
              staffCostVar={staffCostVar}
              rmVar={rmVar}
              rentalVar={rentalVar}
              thirdPartyVar={thirdPartyVar}
              salesProVar={salesProVar}
              othersVar={othersVar}
            ></BuOperatingCostBarGraph>
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
        }
        <div>
          <div className={`${styles.MsHsdContainer}`}>
            <div className={`${styles.HsdCircle}`}><span className={`${styles.Hsd}`}>{props.product.toLocaleUpperCase()}</span></div>
            {/* <div className={`${styles.MsCircle}`}><span className={`${styles.Ms}`}>MS</span></div> */}
          </div>
          <div className={`d-flex flex-column justify-content-center pt-4 ${styles.graphFilters}`}>
            <Checkbox
              size="sm"
              name="all"
              label="All"
              checked={staffCostVar && rmVar && rentalVar && thirdPartyVar && salesProVar && othersVar}
              onChange={(e) => onCheckStateChanged(e)}
            ></Checkbox>
            <Checkbox
              size="sm"
              name="staffCost"
              label="Staff Cost"
              checked={staffCostVar}
              onChange={(e) => onCheckStateChanged(e)}
            ></Checkbox>
            <Checkbox
              size="sm"
              name="rm"
              label="R&M"
              checked={rmVar}
              onChange={(e) => onCheckStateChanged(e)}
            ></Checkbox>
            <Checkbox
              size="sm"
              name="rental"
              label="Rental"
              checked={rentalVar}
              onChange={(e) => onCheckStateChanged(e)}
            ></Checkbox>
            <Checkbox
              size="sm"
              name="thirdParty"
              label="3rd Party"
              checked={thirdPartyVar}
              onChange={(e) => onCheckStateChanged(e)}
            ></Checkbox>
            <Checkbox
              size="sm"
              name="salesPro"
              label="Sales Pro."
              checked={salesProVar}
              onChange={(e) => onCheckStateChanged(e)}
            ></Checkbox>
            <Checkbox
              size="sm"
              name="others"
              label="Others"
              checked={othersVar}
              onChange={(e) => onCheckStateChanged(e)}
            ></Checkbox>
          </div>
        </div>
      </div>
      <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div>
  )
}
export default BuOperatingCost;