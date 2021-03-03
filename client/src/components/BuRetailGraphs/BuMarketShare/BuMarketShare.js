import React, { useEffect, useState } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import BuMarketShareGraph from "./BuMarketShareGraph";
import styles from "./BuMarketShare.module.scss";
import Checkbox from "../../../components/Checkbox.js/Checkbox";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuMarketShare(props) {
  const [publicVar, setPublicStatus] = useState(true);
  const [privateVar, setPrivateStatus] = useState(true);
  const [graphData, setGraphData] = useState([]);
  const [lastItem, setLastItem] = useState({});

  const onCheckStateChanged = (event) => {
    if (event.name === "public") {
      setPublicStatus(event.checkState);
    }
    if (event.name === "private") {
      setPrivateStatus(event.checkState);
    }

    if (event.name === "both") {
      if (event.checkState) {
        setPrivateStatus(true);
        setPublicStatus(true);
      }
      else {
        setPrivateStatus(false);
        setPublicStatus(false);
      }
    }
  }

  
  useEffect(() => {
    function prepareGraphData() {
      let url = `${environment.BU_KPI_URL}/market/data?business_unit=retail&data_type=ytm&level=country&product=${props.product}`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setGraphData(response.data);
          setLastItem(response.data[response.data.length - 1]);
        })
        .catch(error => console.log(error));
    }
    prepareGraphData()
  }, [props.product])

  return (
    <div className={`${styles.BuMarketShareContainer}`}>
      <div className={`pt-2 ${styles.headerContainer}`}>
        <div className={`row`}>
          <div className={`col-9`}>
            <span>Market Share </span>
          </div>
          <div className={`col-3 mt-2 ${styles.headerRight}`}>
            <span>Total: 52%</span>
            <span className={`ml-4`} style={{ color: `${Math.sign(lastItem.percentage_growth) === 1 ? "#74ce12" : "#e13219"}` }}>{lastItem.percentage_growth}%</span>
          </div>
        </div>
        <div className={`row pt-2`}>
          <div className={`col-9 d-flex align-items-center ${styles.headerLabels}`}>
            <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.BpclDot}`}></span>BPCL</div>
            <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.HpclDot}`}></span>HPCL</div>
            <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.IoclDot}`}></span>IOCL</div>
            <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.ShellDot}`}></span>SHELL</div>
            <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.targetDot}`}></span></div>
            <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.targetDot}`}></span></div>
          </div>
          <div className={`col-3 ${styles.headerLabelsTarget}`}>
            <span>---- BPCL Target</span>
          </div>
        </div>
      </div>
      <div className={`d-flex  ${styles.graphContainer}`}>
        {
          graphData ?
            <BuMarketShareGraph graphData={graphData} publicVar={publicVar} privateVar={privateVar}></BuMarketShareGraph>
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>

        }

        <div className={`d-flex flex-column justify-content-center ${styles.graphFilters}`}>
          <Checkbox
            size="sm"
            name="public"
            label="Public"
            checked={publicVar}
            onChange={(e) => onCheckStateChanged(e)}
          ></Checkbox>
          <Checkbox
            size="sm"
            name="private"
            label="Private"
            checked={privateVar}
            onChange={(e) => onCheckStateChanged(e)}
          ></Checkbox>
          <Checkbox
            size="sm"
            name="both"
            label="Both"
            checked={publicVar && privateVar}
            onChange={(e) => onCheckStateChanged(e)}
          ></Checkbox>
        </div>
        <div className={`${styles.MsHsdContainer}`}>
          <div className={`${styles.HsdCircle}`}><span className={`${styles.Hsd}`}>{props.product.toLocaleUpperCase()}</span></div>
          {/* <div className={`${styles.MsCircle}`}><span className={`${styles.Ms}`}>MS</span></div> */}
        </div>
      </div>
      <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div>
  )
}
export default BuMarketShare;