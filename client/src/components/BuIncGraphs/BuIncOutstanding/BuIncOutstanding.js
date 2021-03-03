import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuIncOutstanding.module.scss";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";
import BuIncOutstandingPieChart from "./BuIncOutstandingPieChart";
import axios from 'axios';

function BuIncOutstanding(props) {
    const [graphData, setGraphData] = useState([]);
    const [lastItem, setLastItem] = useState([]);

    const prepareGraphData = () => {
        let url = `${environment.BU_KPI_URL}/payment/data?data_type=ytm&level=country&business_unit=inc&kpi_name=outstanding payment`;
        axios.get(url)
            .then(response => {
                if (response.data.success) {
                    var dataArray = [];
                    var total = 0;
                    setGraphData(response.data.data);
                    response.data.data.forEach((item, index) => {
                        total += item.not_due;
                        total += item.zero_to_three_months;
                        total += item.three_to_six_months;
                        total += item.six_to_twelve_months;
                        total += item.twelve_to_thirty_six_months;
                        total += item.legal;
                        dataArray.push(total);
                        dataArray.push(item.growth);
                    });
                    setLastItem(dataArray);
                }
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        prepareGraphData();
    }, [props.activeTab])

    return (
        <div className={`${styles.BuLubesOthersContainer}`}>
            <div className={`pt-2 ${styles.headerContainer}`}>
                <div className={`row`}>
                    <div className={`col-8`}>
                        <span>Outstanding</span>
                    </div>
                    {
                        lastItem ?
                            <div className={`col-4 mt-2 ${styles.headerRight}`}>
                                <span>Outstanding : {lastItem[0]} Cr </span>
                                <span className={`ml-4`} style={{ color: `${Math.sign(lastItem[1]) === 1 ? "#74ce12" : "#e13219"}` }} >{lastItem[1]}</span>
                            </div> : ""
                    }

                </div>
                <div className={`row`}>
                    <div className={`col-9 mt-2 d-flex align-items-center ${styles.headerLabels}`}>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot1}`}></span>Not Due</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot2}`}></span>0-3 m</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot3}`}></span>3-6 m</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot4}`}></span>6-12 m</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot5}`}></span>12-36 m</div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.dot6}`}></span>Legal</div>
                    </div>
                </div>
            </div>
            <div className={`d-flex align-items-center justify-content-around ${styles.graphContainer}`}>
                <div className="d-flex flex-column align-items-center">
                    {graphData
                        ?
                        <BuIncOutstandingPieChart graphData={graphData}></BuIncOutstandingPieChart>
                        :
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                </div>
            </div>
            <div className={`d-flex justify-content-end`}>
                <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
            </div>
        </div>
    )
}
export default BuIncOutstanding;