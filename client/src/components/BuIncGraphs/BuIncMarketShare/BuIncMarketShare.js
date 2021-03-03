import React, { useEffect, useState } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import BuIncMarketShareGraph from "./BuIncMarketShareGraph";
import styles from "./BuIncMarketShare.module.scss";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";
import axios from 'axios';

function BuIncMarketShare(props) {
    const [graphData, setGraphData] = useState([]);
    const [lastItem, setLastItem] = useState({});

    
    useEffect(() => {
      const prepareGraphData = () => {
          let url = `${environment.BU_KPI_URL}/market/data?data_type=ytm&level=country&business_unit=inc`;
          axios.get(url)
              .then(response => {
                  if (response.data.success) {
                      setGraphData(response.data.data);
                      setLastItem(response.data.data[response.data.data.length - 1]);
                  }
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
                        <span>Market Share</span>
                    </div>
                    {
                        lastItem ?
                            <div className={`col-3 mt-2 ${styles.headerRight}`}>
                                <span>Total: 52%</span>
                                <span className={`ml-4`} style={{ color: `${Math.sign(lastItem.percentage_growth) === 1 ? "#74ce12" : "#e13219"}` }}>{lastItem.percentage_growth}%</span>
                            </div>
                            : ""
                    }

                </div>
                <div className={`row pt-2`}>
                    <div className={`col-9 d-flex align-items-center ${styles.headerLabels}`}>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.BpclDot}`}></span>BPCL</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.HpclDot}`}></span>HPCL</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.IoclDot}`}></span>IOCL</div>
                        <div className="d-flex mr-4 align-items-center "><span>---- BPCL Target</span></div>
                    </div>
                    {/* <div className={`col-3 ${styles.headerLabelsTarget}`}>
                        <span>---- BPCL Target</span>
                    </div> */}
                </div>
            </div>
            <div className={`d-flex  ${styles.graphContainer}`}>
                {
                    graphData ?
                        <BuIncMarketShareGraph graphData={graphData}></BuIncMarketShareGraph>
                        :
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                }
            </div>
            <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
                <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
            </div>
        </div>
    )
}
export default BuIncMarketShare;