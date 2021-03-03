import React, { useEffect, useState } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuHsse.module.scss";
import environment from "../../../environment";

function BuHsse() {
    const [incidentData, setIncidentData] = useState([]);
    const [manHourData, setManHourData] = useState([]);

    const prepareData = (kpi_name) => {
        let url = `${environment.BU_KPI_URL}/others/data?business_unit=retail&kpi_name=${kpi_name}&data_type=ytm&level=country`;
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(response => {
                response.data.forEach((item, index) => {
                    if (item.kpi_name === "incidents reported") {
                        setIncidentData(response.data[0].actual);
                    }
                    else if (item.kpi_name === "lost man hours") {
                        setManHourData(response.data[0].actual);
                    }
                });
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        prepareData('incidents reported');
        prepareData('lost man hours');
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
                        <div className={`pl-5 ${styles.Cell} ${styles.col}`}>
                            <div className="d-flex align-items-center "><span>{incidentData ? incidentData : ""}</span></div>
                            <div className="d-flex align-items-center "><span>Incidents Reported</span></div>
                        </div>
                        <div className={`pl-5 ${styles.Cell}`} >
                            <div className="d-flex align-items-center "><span>{manHourData ? manHourData : ""}</span></div>
                            <div className="d-flex align-items-center "><span>Lost Man Hours</span></div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.MsHsdContainer}`}>
                    <div className={`${styles.HsdCircle}`}><span className={`${styles.Hsd}`}>HSD</span></div>
                    <div className={`${styles.MsCircle}`}><span className={`${styles.Ms}`}>MS</span></div>
                </div>
            </div>
            <div style={{ display: "block" }}>
                <img style={{ float: "right", marginRight: "5px", marginTop: "-35px" }} src={expandIcon} alt='Expand Icon'></img>
            </div>
        </div>
    )
}
export default BuHsse;