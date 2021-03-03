import React, { useEffect, useState } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuIncInventory.module.scss";
import environment from "../../../environment";

function BuIncInventory(props) {
    const [setGraphData] = useState([]);
    const [setLastItem] = useState({});

    
    useEffect(() => {
      function prepareGraphData() {
          let url = `${environment.BU_KPI_URL}/complaints/data?data_type=ytm&level=country&business_unit=atf&kpi_name=ccs`;
          fetch(url, { method: "GET" })
              .then(res => res.json())
              .then(response => {
                  setGraphData(response.data);
                  setLastItem(response.data[response.data.length - 1]);
              })
              .catch(error => console.log(error));
      }
        prepareGraphData();
    }, [props.activeTab, setGraphData, setLastItem])

    return (
        <div className={`${styles.BuMarketShareContainer}`}>
            <div className={`pt-2 ${styles.headerContainer}`}>
                <div className={`row`}>
                    <div className={`col-9`}>
                        <span>Inventory</span>
                    </div>
                    {/* <div className={`col-3 mt-2 ${styles.headerRight}`}>
                        <span>Total: 52%</span>
                        <span className={`ml-4`} style={{ color: `${Math.sign(lastItem.percentage_growth) === 1 ? "#74ce12" : "#e13219"}` }}>{lastItem.percentage_growth}%</span>
                    </div> */}
                </div>
                <div className={`row pt-2`}>
                    <div className={`col-9 d-flex align-items-center ${styles.headerLabels}`}>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.BpclDot}`}></span>BPCL</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.HpclDot}`}></span>HPCL</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.IoclDot}`}></span>IOCL</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.ShellDot}`}></span>SHELL</div>
                    </div>
                    {/* <div className={`col-3 ${styles.headerLabelsTarget}`}>
                        <span>---- BPCL Target</span>
                    </div> */}
                </div>
            </div>
            <div className={`d-flex align-items-center justify-content-around  ${styles.graphContainer}`}>
                <div className="d-flex flex-column align-items-center">
                    {/* {
                        graphData ?
                            <BuAtfCcsPieChart graphData={graphData}></BuAtfCcsPieChart>
                            :
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                    } */}
                </div>
                <div className={`d-flex flex-column ${styles.contentRow1}`}>
                    <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
                        <div className={`${styles.graphHeaderSectionTop}`}>
                            <span className={`${styles.topLeft}`}>330</span>
                            <span style={{ color: "#e13219" }} className={`${styles.topRight}`}>+2%</span>
                        </div>
                        <div className={`${styles.graphHeaderSectionBottom}`}><span>Complaints Resolved</span></div>
                    </div>
                    <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
                        <div className={`${styles.graphHeaderSectionTop}`}>
                            <span className={`${styles.topLeft}`}>330</span>
                            <span style={{ color: "#e13219" }} className={`${styles.topRight}`}>+0.003%</span>
                        </div>
                        <div className={`${styles.graphHeaderSectionBottom}`}><span>Complaints Received</span></div>
                    </div>
                    <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
                        <div className={`${styles.graphHeaderSectionTop}`} >
                            <span className={`${styles.topLeft}`}>30%</span>
                            <span style={{ color: "#74ce12" }} className={`${styles.topRight}`}>+0.2%</span>
                        </div>
                        <div className={`${styles.graphHeaderSectionBottom}`}><span>Customer Satisfaction</span></div>
                    </div>
                </div>
            </div>
            <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
                <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
            </div>
        </div>
    )
}
export default BuIncInventory;