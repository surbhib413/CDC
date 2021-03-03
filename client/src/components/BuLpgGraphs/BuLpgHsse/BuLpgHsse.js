import React, { useEffect, useState } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuLpgHsse.module.scss";
import environment from "../../../environment";

function BuLpgHsse() {
    const [incidentData, setIncidentData] = useState([]);
    const [lostManHourData, setlostManHourData] = useState([]);

    const prepareData = () => {
        let url = `${environment.BU_KPI_URL}/others/data?data_type=ytm&level=country&business_unit=lpg&kpi_type=hsse`;
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(response => {
                if (response.data) {
                    response.data.forEach((item, index) => {
                        if (item.kpi_name === "lost man hours") {
                            setlostManHourData(item);
                        }
                        else if (item.kpi_name === "incidents reported") {
                            setIncidentData(item);
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
                    <div className={`${styles.heading}`}><span>HSSE</span></div>
                </div>
            </div>
            <div className={`d-flex ${styles.graphContainer} `}>
                <div className={`${styles.Table}`} style={{ borderRadius: "20px", display: "block" }}>
                    <div className={`${styles.Heading}`}>
                        <div className={`pl-5 ${styles.Cell} ${styles.col}`} style={{ backgroundColor: "rgb(28, 35, 47)" }}>
                            <div className="d-flex mr-4 align-items-center "><span className={`mr-4`}>{incidentData.actual}</span><span style={{ color: `${Math.sign(incidentData.growth) === 1 ? "#74ce12" : "#e13219"}` }}>{incidentData.growth}%</span></div>
                            <div className="d-flex align-items-center "><span>Incidents Reported</span></div>
                        </div>
                        <div className={`pl-5 ${styles.Cell}`} style={{ backgroundColor: "rgb(28, 35, 47)" }}>
                            <div className="d-flex mr-4 align-items-center "><span className={`mr-4`}>{lostManHourData.actual}</span><span style={{ color: `${Math.sign(lostManHourData.growth) === 1 ? "#74ce12" : "#e13219"}` }}>{lostManHourData.growth}%</span></div>
                            <div className="d-flex align-items-center "><span>Lost Man Hours</span></div>
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
export default BuLpgHsse;