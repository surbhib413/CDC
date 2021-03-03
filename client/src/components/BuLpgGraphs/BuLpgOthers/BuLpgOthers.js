import React, { useEffect, useState } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuLpgOthers.module.scss";
import environment from "../../../environment";

function BuLpgOthers() {
    const [backlogData, setBacklogData] = useState([]);
    const [onTimeData, setOnTimeData] = useState([]);
    const [digitalData, setDigitalData] = useState([]);
    const [bottlingData, setBottlingData] = useState([]);

    const prepareData = () => {
        let url = `${environment.BU_KPI_URL}/others/data?data_type=ytm&level=country&business_unit=lpg&kpi_type=others`;
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(response => {
                if (response.data) {
                    response.data.forEach((item, index) => {
                        if (item.kpi_name === "backlog") {
                            setBacklogData(item);
                        }
                        else if (item.kpi_name === "on time fill rate") {
                            setOnTimeData(item);
                        }
                        else if (item.kpi_name === "digital payments") {
                            setDigitalData(item);
                        }
                        else if (item.kpi_name === "total bottling") {
                            setBottlingData(item);
                        }
                    });
                }
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        prepareData();
    }, [])

    return (
        <div className={`${styles.BuTransportationContainer}`}>
            <div className={`d-flex align-items-center justify-content-between ${styles.headerContainer}`}>
                <div className={`${styles.headerLeft}`}>
                    <div className={`${styles.heading}`}><span>Others</span></div>
                </div>
            </div>
            <div className={`d-flex ${styles.graphContainer} `}>
                <div className={`${styles.Table}`} style={{ borderRadius: "20px", display: "block" }}>
                    <div className={`${styles.Heading}`}>
                        <div className={`pl-3 ${styles.Cell} ${styles.col}`} style={{ backgroundColor: "rgb(28, 35, 47)" }}>
                            <div className="d-flex mr-4 align-items-center "><span className={`mr-4`}>{digitalData.actual}</span><span style={{ color: `${Math.sign(digitalData.growth) === 1 ? "#74ce12" : "#e13219"}` }}>{digitalData.growth}%</span></div>
                            <div className={`d-flex align-items-center ${styles.subLabel}`}><span>Digital Payments</span></div>
                        </div>
                        <div className={`pl-3 ${styles.Cell} ${styles.col}`} style={{ backgroundColor: "rgb(28, 35, 47)" }}>
                            <div className="d-flex mr-4 align-items-center "><span className={`mr-4`}>{onTimeData.actual}</span><span style={{ color: `${Math.sign(onTimeData.growth) === 1 ? "#74ce12" : "#e13219"}` }}>{onTimeData.growth}%</span></div>
                            <div className={`d-flex align-items-center ${styles.subLabel}`}><span>On time fill Rate</span></div>
                        </div>
                        <div className={`pl-3 ${styles.Cell} ${styles.col}`} style={{ backgroundColor: "rgb(28, 35, 47)" }}>
                            <div className="d-flex mr-4 align-items-center "><span className={`mr-4`}>{backlogData.actual}</span><span style={{ color: `${Math.sign(backlogData.growth) === 1 ? "#74ce12" : "#e13219"}` }}>{backlogData.growth}%</span></div>
                            <div className={`d-flex align-items-center ${styles.subLabel}`}><span>Backlog</span></div>
                        </div>
                        <div className={`pl-3 ${styles.Cell}`} style={{ backgroundColor: "rgb(28, 35, 47)" }}>
                            <div className="d-flex mr-4 align-items-center "><span className={`mr-4`}>{bottlingData.actual}</span><span style={{ color: `${Math.sign(bottlingData.growth) === 1 ? "#74ce12" : "#e13219"}` }}>{bottlingData.growth}%</span></div>
                            <div className={`d-flex align-items-center ${styles.subLabel}`}><span>Total Blotting</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: "block" }}>
                <img style={{ float: "right", marginRight: "5px", marginTop: "-35px" }} src={expandIcon} alt='Expand Icon'></img>
            </div>
        </div>
    )
}
export default BuLpgOthers;