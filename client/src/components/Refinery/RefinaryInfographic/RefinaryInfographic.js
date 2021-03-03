import React, {useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./RefinaryInfographic.module.scss";
//import mumbaiInfographic from "../../../assets/images/mumbaiInfographic.png";
//import kochiInfographic from "../../../assets/images/kochiInfographic.png";
import InfographicKpi1 from "../InfographicKpi1/InfographicKpi1";
import InfographicKpi2 from "../InfographicKpi2/InfographicKpi2";
//import InfographicKpi3 from "../InfographicKpi3/InfographicKpi3";
import InfographicKpi4 from "../InfographicKpi4/InfographicKpi4";
import InfographicKpiRound from "../InfographicKpiRound/InfographicKpiRound";
import environment from "../../../environment";
import mumbaiVideo from "../../../assets/images/Mumbai Refinery_final.mp4"
import kochiVideo from "../../../assets/images/Kochin Refinery_final.mp4"

function RefinaryInfographic(props) {
  const [utilData, setUtilData] = useState({});
  const [inventoryData, setInventoryData] = useState({});
  const [crudeProcYtmData, setCrudeProcYtmData] = useState({});
  const [crudeProcMtdData, setCrudeProcMtdData] = useState({});
  //const [crudeProcYtmDelta, setCrudeProcYtmDelta] = useState({});
  //const [crudeProcMtdDelta, setCrudeProcMtdDelta] = useState({});
  const [textColor, setTextColor] = useState("#06bee1");

  useEffect(() => {
    function crudeProcessedMumbaiMtd() {
      fetch(
        `${environment.REFINERY_KPI_URL}/day/data?kpi_name=Crude processed&refinery=Mumbai`,
        { method: "GET" }
      )
        .then(res => res.json())
        .then(response => {
          // console.log("crudeProcessedMumbaiMtd => ", response.data);
          if (props.location === "mumbai") {
            setTextColor("#06bee1");
            let dictionary = {};
            for (let i of response.data) {
              if (!dictionary[i.product]) {
                dictionary[i.product] = i.actual;
                dictionary["deltaMtd" + i.product] = i.delta;
  
              }
            }
            setCrudeProcMtdData(dictionary);
          }
        })
        .catch(error => console.log(error));
    }
  
    function crudeProcessedMumbaiYtm() {
      fetch(
        `${environment.REFINERY_KPI_URL}/month/data?kpi_name=Crude processed&refinery=Mumbai`,
        { method: "GET" }
      )
        .then(res => res.json())
        .then(response => {
          // console.log("crudeProcessedMumbaiYtm => ", response.data);
          if (props.location === "mumbai") {
            setTextColor("#06bee1");
            let dictionary = {};
            for (let i of response.data) {
              if (!dictionary[i.product]) {
                dictionary[i.product] = i.actual;
                dictionary["deltaYtm" + i.product] = i.delta;
                // console.log("DICTIONARY", dictionary);
              }
            }
            setCrudeProcYtmData(dictionary);
          }
        })
        .catch(error => console.log(error));
    }
  
    function crudeProcessedKochiMtd() {
      fetch(
        `${environment.REFINERY_KPI_URL}/day/data?kpi_name=Crude processed&refinery=Kochi`,
        { method: "GET" }
      )
        .then(res => res.json())
        .then(response => {
          // console.log("crudeProcessedKochiMtd => ", response.data);
          if (props.location === "Kochi") {
            setTextColor("#b76df1");
            let dictionary = {};
            for (let i of response.data) {
              if (!dictionary[i.product]) {
                dictionary[i.product] = i.actual;
                dictionary["deltaMtd" + i.product] = i.delta;
              }
            }
            setCrudeProcMtdData(dictionary);
          }
        })
        .catch(error => console.log(error));
    }
  
    function crudeProcessedKochiYtm() {
      fetch(
        `${environment.REFINERY_KPI_URL}/month/data?kpi_name=Crude processed&refinery=Kochi`,
        { method: "GET" }
      )
        .then(res => res.json())
        .then(response => {
          // console.log("crudeProcessedKochiYtm => ", response.data);
          if (props.location === "kochi") {
            setTextColor("#b76df1");
            let dictionary = {};
            for (let i of response.data) {
              if (!dictionary[i.product]) {
                dictionary[i.product] = i.actual;
                dictionary["deltaYtm" + i.product] = i.delta;
              }
            }
            setCrudeProcYtmData(dictionary);
          }
        })
        .catch(error => console.log(error));
    }
  
    function mumbaiUnitWiseUtilData() {
      fetch(
        `${environment.REFINERY_KPI_URL}/day/data?kpi_name=Unit wise utilization&refinery=Mumbai`,
        { method: "GET" }
      )
        .then(res => res.json())
        .then(response => {
          // console.log("mumbaiUnitWiseUtilData => ", response.data);
          if (props.location === "mumbai") {
            setTextColor("#06bee1");
            let dictionary = {};
            for (let i of response.data) {
              if (!dictionary[i.product]) {
                dictionary[i.product] = i.actual;
              }
            }
            setUtilData(dictionary);
          }
        })
        .catch(error => console.log(error));
    }
  
    function kochiUnitWiseUtilData() {
      fetch(
        `${environment.REFINERY_KPI_URL}/day/data?kpi_name=Unit wise utilization&refinery=Kochi`,
        { method: "GET" }
      )
        .then(res => res.json())
        .then(response => {
          // console.log("kochiUnitWiseUtilData => ", response.data);
          if (props.location === "kochi") {
            setTextColor("#b76df1");
            let dictionary = {};
            for (let i of response.data) {
              if (!dictionary[i.product]) {
                dictionary[i.product] = i.actual;
              }
            }
            setUtilData(dictionary);
          }
        })
        .catch(error => console.log(error));
    }
  
    function mumbaiProductInvData() {
      fetch(
        `${environment.REFINERY_KPI_URL}/day/data?kpi_name=Product inventory&refinery=Mumbai`,
        { method: "GET" }
      )
        .then(res => res.json())
        .then(response => {
          // console.log("mumbaiProductInvData => ", response.data);
          if (props.location === "mumbai") {
            setTextColor("#06bee1");
            let dictionary = {};
            for (let i of response.data) {
              if (!dictionary[i.product]) {
                dictionary[i.product] = i.actual;
              }
            }
            setInventoryData(dictionary);
          }
        })
        .catch(error => console.log(error));
    }
  
    function kochiProductInvData() {
      fetch(
        `${environment.REFINERY_KPI_URL}/day/data?kpi_name=Product inventory&refinery=Kochi`,
        { method: "GET" }
      )
        .then(res => res.json())
        .then(response => {
          // console.log("kochiProductInvData => ", response.data);
          if (props.location === "kochi") {
            setTextColor("#b76df1");
            let dictionary = {};
            for (let i of response.data) {
              if (!dictionary[i.product]) {
                dictionary[i.product] = i.actual;
              }
            }
            setInventoryData(dictionary);
          }
        })
        .catch(error => console.log(error));
    }
  
    mumbaiUnitWiseUtilData();
    kochiUnitWiseUtilData();
    mumbaiProductInvData();
    kochiProductInvData();
    crudeProcessedKochiMtd();
    crudeProcessedMumbaiMtd();
    crudeProcessedMumbaiYtm();
    crudeProcessedKochiYtm();
  }, [props.location]);

  return (
    <div className={`${styles.InfographicContainer}`}>
      {/* <img src={mumbaiInfographic} alt='Refinery Diagram'></img> */}
      {props.location === "mumbai" ? (
        <video
          style={{
            position: "relative",
            left: "-35px",
            bottom: "-15px"
          }}
          autoPlay
          loop
          src={mumbaiVideo}
        >
        </video>
      ) : (
          <video
            style={{
              position: "relative",
              left: "-35px",
              bottom: "-15px"
            }}
            autoPlay
            loop
            src={kochiVideo}
          >
          </video>
        )}

      {!utilData && !inventoryData ? (
        <div className='d-flex justify-content-center align-items-center'>
          <Spinner animation='border' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </div>
      ) :
        <>
          <InfographicKpiRound
            top='146px'
            right='1244px'
            bottom=''
            left=''
            kpiName='ARU'
            textColor={textColor}
            kpiValue={utilData["ARU"]}
          ></InfographicKpiRound>

          <InfographicKpi1
            top='46px'
            right=''
            bottom=''
            left='956px'
            kpiName='CDU'
            textColor={textColor}
            kpiValue={utilData["CDU"]}
          ></InfographicKpi1>
          <InfographicKpi1
            top='46px'
            right=''
            bottom=''
            left='1165px'
            kpiName='CDU'
            textColor={textColor}
            kpiValue={utilData["CDU"]}
          ></InfographicKpi1>

          {
            props.location === "mumbai" && (
              <InfographicKpi2
                top='238px'
                right=''
                bottom=''
                left='1040px'
                kpiName='NHT'
                textColor={textColor}
                kpiValue={utilData["NHT"]}
              ></InfographicKpi2>
            )
          }
          {
            props.location === "mumbai" && (
              <InfographicKpi2
                top='313px'
                right=''
                bottom=''
                left='1040px'
                kpiName='NHT'
                textColor={textColor}
                kpiValue={utilData["NHT"]}
              ></InfographicKpi2>
            )
          }

          <InfographicKpi2
            top='231px'
            right=''
            bottom=''
            left='1448px'
            kpiName='CCR'
            textColor={textColor}
            kpiValue={utilData["CCR"]}
          ></InfographicKpi2>
          {
            props.location === "mumbai" ? (
              <InfographicKpi2
                top='312px'
                right=''
                bottom=''
                left='1448px'
                kpiName='ISOM'
                textColor={textColor}
                kpiValue={utilData["ISOM"]}
              ></InfographicKpi2>
            ) : (
                <InfographicKpi2
                  top='231px'
                  right=''
                  bottom=''
                  left='1244px'
                  kpiName='ISOM'
                  textColor={textColor}
                  kpiValue={utilData["ISOM"]}
                ></InfographicKpi2>
              )
          }
          <InfographicKpi2
            top='386px'
            right='1050px'
            bottom=''
            left=''
            kpiName='KMU'
            textColor={textColor}
            kpiValue={utilData["KMU"]}
          ></InfographicKpi2>
          {
            props.location === "kochi" && (
              <InfographicKpi2
                top='386px'
                right='846px'
                bottom=''
                left=''
                kpiName='KHDS'
                textColor={textColor}
                kpiValue={utilData["KHDS"]}
              ></InfographicKpi2>
            )
          }

          <InfographicKpi2
            top='548px'
            right=''
            bottom=''
            left='1217px'
            kpiName='DHDS'
            textColor={textColor}
            kpiValue={utilData["DHDS"]}
          ></InfographicKpi2>
          <InfographicKpi2
            top='548px'
            right=''
            bottom=''
            left='1417px'
            kpiName='DHT'
            textColor={textColor}
            kpiValue={utilData["DHT"]}
          ></InfographicKpi2>
          {
            props.location === "mumbai" && (
              <InfographicKpi2
                top=''
                right=''
                bottom='465px'
                left='1496px'
                kpiName='HCU'
                textColor={textColor}
                kpiValue={utilData["HCU"]}
              ></InfographicKpi2>
            )
          }


          <InfographicKpi1 top="146px" right="210px" bottom="" left="" kpiName="LPG" textColor={textColor} kpiValue={inventoryData["LPG"]}></InfographicKpi1>
          <InfographicKpi1 top="266px" right="210px" bottom="" left="" kpiName="MS" textColor={textColor} kpiValue={inventoryData["MS"]}></InfographicKpi1>
          <InfographicKpi1 top="376px" right="210px" bottom="" left="" kpiName="ATF" textColor={textColor} kpiValue={inventoryData["ATF"]}></InfographicKpi1>
          <InfographicKpi1 top="600px" right="210px" bottom="" left="" kpiName="Diesel" textColor={textColor} kpiValue={inventoryData["Diesel"]}></InfographicKpi1>
          <InfographicKpi1 top="796px" right="210px" bottom="" left="" kpiName="Propylene" textColor={textColor} kpiValue={inventoryData["Propylene"]}></InfographicKpi1>
          {
            inventoryData["Lobs"] && <InfographicKpi1 top="964px" right="210px" bottom="" left="" textColor={textColor} kpiName="Lobs" kpiValue={inventoryData["Lobs"]}></InfographicKpi1>
          }
          <InfographicKpi1 top="" right="" bottom="315px" left="790px" kpiName="VDU 3" textColor={textColor} kpiValue={utilData["VDU 3"]}></InfographicKpi1>
          <InfographicKpi1 top="" right="" bottom="250px" left="790px" kpiName="VDU 4" textColor={textColor} kpiValue={utilData["VDU 4"]}></InfographicKpi1>
        </>
      }
      <InfographicKpi4 top="450px" right="" bottom="" left="198px" textColor={textColor} crudeProcYtmColor={Math.sign(crudeProcYtmData["deltaYtmLS"]) === 1 ? "#74ce12" : "#e13219"} crudeProcMtdColor={Math.sign(crudeProcMtdData["deltaMtdLS"]) === 1 ? "#74ce12" : "#e13219"} crudeProcYtmData={crudeProcYtmData["LS"]} crudeProcMtdData={crudeProcMtdData["LS"]} crudeProcYtmDelta={crudeProcYtmData["deltaYtmLS"]} crudeProcMtdDelta={crudeProcMtdData["deltaMtdLS"]} ></InfographicKpi4>
      <InfographicKpi4 top="657px" right="" bottom="" left="53px" textColor={textColor} crudeProcYtmColor={Math.sign(crudeProcYtmData["deltaYtmHS"]) === 1 ? "#74ce12" : "#e13219"} crudeProcMtdColor={Math.sign(crudeProcMtdData["deltaMtdHS"]) === 1 ? "#74ce12" : "#e13219"} crudeProcYtmData={crudeProcYtmData["HS"]} crudeProcMtdData={crudeProcMtdData["HS"]} crudeProcYtmDelta={crudeProcYtmData["deltaYtmHS"]} crudeProcMtdDelta={crudeProcMtdData["deltaMtdHS"]} ></InfographicKpi4>
      <InfographicKpi4 top="657px" right="" bottom="" left="387px" textColor={textColor} crudeProcYtmColor={Math.sign(crudeProcYtmData["deltaYtmMH"]) === 1 ? "#74ce12" : "#e13219"} crudeProcMtdColor={Math.sign(crudeProcMtdData["deltaMtdMH"]) === 1 ? "#74ce12" : "#e13219"} crudeProcYtmData={crudeProcYtmData["MH"]} crudeProcMtdData={crudeProcMtdData["MH"]} crudeProcYtmDelta={crudeProcYtmData["deltaYtmMH"]} crudeProcMtdDelta={crudeProcMtdData["deltaMtdMH"]}  ></InfographicKpi4>

      <div className={`d-flex justify-content-center align-items-center ${styles.ytdMtd}`}>
        <div className={`d-flex justify-content-center align-items-center ${styles.ytd}`}>
          <span className={`${styles.value}`} style={{ color: textColor }}>{crudeProcYtmData["Total Crude"]}</span>
          <span className={`${styles.percentage}`} style={{ color: `${Math.sign(crudeProcYtmData["deltaYtmTotal Crude"]) === 1 ? "#74ce12" : "#e13219"}` }}>{crudeProcYtmData["deltaYtmTotal Crude"]}%</span>
        </div>
        <div className={`d-flex justify-content-center align-items-center ${styles.mtd}`}>
          <span className={`${styles.value}`} style={{ color: textColor }}>{crudeProcMtdData["Total Crude"]}</span>
          <span className={`${styles.percentage}`} style={{ color: `${Math.sign(crudeProcMtdData["deltaMtdTotal Crude"]) === 1 ? "#74ce12" : "#e13219"}` }} >{crudeProcMtdData["deltaMtdTotal Crude"]}%</span>
        </div>
      </div>
    </div >
  );
}
export default RefinaryInfographic;
