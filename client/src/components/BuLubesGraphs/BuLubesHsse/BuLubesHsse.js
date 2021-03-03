import React, { useEffect, useState } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuLubesHsse.module.scss";
import environment from "../../../environment";

function BuLubesHsse() {
  const [esaData, setEsaData] = useState([]);
  const [isaData, setIsaData] = useState([]);
  const [accidentData, setAccidentData] = useState([]);
  const [complianceData, setComplianceData] = useState([]);
  const [ltifrData, setLtifrData] = useState([]);
  const [incidentData, setIncidentData] = useState([]);

  const prepareData = () => {
    let url = `${environment.BU_KPI_URL}/others/data?level=country&data_type=ytm&business_unit=lubes&kpi_type=hsse`;
    fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(response => {
        response.data.forEach((item, index) => {
          if (item.kpi_name === "Pending Recommendation ESA") { setEsaData(item); }
          if (item.kpi_name === "Pending Recommendation ISA") { setIsaData(item); }
          if (item.kpi_name === "Accident Free Million Man Hours") { setAccidentData(item); }
          if (item.kpi_name === "CAPA Compliance") { setComplianceData(item); }
          if (item.kpi_name === "LTIFR") { setLtifrData(item); }
          if (item.kpi_name === "Incidents Reported") { setIncidentData(item); }
        });
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    prepareData();
  }, [])

  return (
    <div className={`${styles.BuLubesHsseContainer}`}>
      <div className={`d-flex align-items-center justify-content-between ${styles.headerContainer}`}>
        <div className={`${styles.headerLeft}`}>
          <div className={`${styles.heading}`}><span>HSSE</span></div>
        </div>
      </div>
      <div className={`${styles.contentContainer}`}>

        <div className={`d-flex ${styles.contentRow1}`}>
          <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
            <div className={`${styles.graphHeaderSectionTop}`}>
              <span className={`${styles.topLeft}`}>{esaData.actual}</span>
              <span style={{ color: `${Math.sign(esaData.growth) === 1 ? "#74ce12" : "#e13219"}` }} className={`${styles.topRight}`}>{esaData.growth}%</span>
            </div>
            <div className={`${styles.graphHeaderSectionBottom}`}><span>Pending recomm. ESA</span></div>
          </div>
          <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
            <div className={`${styles.graphHeaderSectionTop}`}>
              <span className={`${styles.topLeft}`}>{isaData.actual}</span>
              <span style={{ color: `${Math.sign(isaData.growth) === 1 ? "#74ce12" : "#e13219"}` }} className={`${styles.topRight}`}>{isaData.growth}%</span>
            </div>
            <div className={`${styles.graphHeaderSectionBottom}`}><span>Pending recomm.</span></div>
          </div>
          <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
            <div className={`${styles.graphHeaderSectionTop}`} >
              <span className={`${styles.topLeft}`}>{accidentData.actual}</span>
              <span style={{ color: `${Math.sign(accidentData.growth) === 1 ? "#74ce12" : "#e13219"}` }} className={`${styles.topRight}`}>{accidentData.growth}%</span>
            </div>
            <div className={`${styles.graphHeaderSectionBottom}`}><span>Acc. free  mil. man hrs</span></div>
          </div>
        </div>

        <div className={`d-flex ${styles.contentRow1}`}>
          <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
            <div className={`${styles.graphHeaderSectionTop}`}>
              <span className={`${styles.topLeft}`}>{complianceData.actual}%</span>
              <span style={{ color: `${Math.sign(complianceData.growth) === 1 ? "#74ce12" : "#e13219"}` }} className={`${styles.topRight}`}>{complianceData.growth}%</span>
            </div>
            <div className={`${styles.graphHeaderSectionBottom}`}><span>CAPA Compliance</span></div>
          </div>
          <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
            <div className={`${styles.graphHeaderSectionTop}`}>
              <span className={`${styles.topLeft}`}>{ltifrData.actual}</span>
              <span style={{ color: `${Math.sign(ltifrData.growth) === 1 ? "#74ce12" : "#e13219"}` }} className={`${styles.topRight}`}>{ltifrData.growth}%</span>
            </div>
            <div className={`${styles.graphHeaderSectionBottom}`}><span>LTIFR</span></div>
          </div>
        </div>

        <div className={`${styles.barContainer}`}>
          <div className={`d-flex justify-content-between align-items-center py-3 ${styles.barHeader}`}>
            <span className={`${styles.barHeaderTitle}`}>Incidents Reported</span>
            <div>
              <span className={`${styles.topLeft}`}>{incidentData.actual}</span>
              <span style={{ color: `${Math.sign(incidentData.growth) === 1 ? "#74ce12" : "#e13219"}` }} className={`${styles.topRight}`}>{incidentData.growth}%</span>

            </div>
          </div>
          <div className={`d-flex`} >
            <div className={`d-flex flex-column justify-content-center ${styles.progressBar}`} style={{ width: `${Math.ceil((incidentData.minor * 100) / incidentData.actual)}%` }}>
              <span className={`pl-3 ${styles.percentageBarGreen}`} >{incidentData.minor}</span>
              <span className="pl-3 pt-2">Minor</span>
            </div>
            <div className={`d-flex flex-column  ${styles.progressBar}`} style={{ width: `${Math.ceil((incidentData.minor * 100) / incidentData.actual)}%` }}>
              <span className={`pl-3 ${styles.percentageBarOrange}`}>{incidentData.serious}</span>
              <span className="pl-3 pt-2">Serious</span>
            </div>
            <div className={`d-flex flex-column ${styles.progressBar}`} style={{ width: `${Math.ceil((incidentData.major * 100) / incidentData.actual)}%` }}>
              <span className={`pl-3 ${styles.percentageBarRed}`} >{incidentData.major}</span>
              <span className="pl-3 pt-2">Major</span>
            </div>
          </div>
        </div>
      </div>
      <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
    </div>
  )
}
export default BuLubesHsse;