import React, { useEffect, useState } from "react";

import styles from "./RefinaryDistillateYield.module.scss";
import DistillateYieldChart from "./DistillateYieldChart";
import environment from "../../../environment";
import { Spinner } from "react-bootstrap";

function RefinaryDistillateYield(props) {

  const [disYieldMumbaiMtdData, setDisYieldMumbaiMtdData] = useState([]);
  const [disYieldKochiMtdData, setDisYieldKochiMtdData] = useState([]);
  const [disYieldMumbaiYtmData, setDisYieldMumbaiYtmData] = useState([]);
  const [disYieldKochiYtmData, setDisYieldKochiYtmData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ytmGraphData, setYtmGraphData] = useState(null);
  const [mtdGraphData, setMtdGraphData] = useState(null);
  // const [monthGraphUnit, setShowingGraphUnit] = useState("MTD");
  // const [yearGraphUnit, setTargetGraphUnit] = useState("YTM");

  useEffect(() => {
    function switchLocation() {
      if (props.location === "mumbai") {
        setYtmGraphData(disYieldMumbaiYtmData);
        setMtdGraphData(disYieldMumbaiMtdData);
  
      }
      if (props.location === "kochi") {
        setYtmGraphData(disYieldKochiYtmData);
        setMtdGraphData(disYieldKochiMtdData);
      }
    }
    switchLocation();
  }, [props.location,disYieldMumbaiYtmData,disYieldMumbaiMtdData,disYieldKochiYtmData,disYieldKochiMtdData])


  useEffect(() => {
    function fetchMumbaiMtdData() {
      let url = `${environment.REFINERY_KPI_URL}/day/data?kpi_name=Distillate yield&refinery=Mumbai`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setDisYieldMumbaiMtdData(response.data);
          if (props.location === "mumbai") {
            setMtdGraphData(response.data);
          }
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
  
    function fetchMumbaiYtmData() {
      let url = `${environment.REFINERY_KPI_URL}/month/data?kpi_name=Distillate yield&refinery=Mumbai`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setDisYieldMumbaiYtmData(response.data);
          if (props.location === "mumbai") {
            setYtmGraphData(response.data);
          }
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
  
    function fetchKochiMtdData() {
      let url = `${environment.REFINERY_KPI_URL}/day/data?kpi_name=Distillate yield&refinery=Kochi`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setDisYieldKochiMtdData(response.data);
          if (props.location === "kochi") {
            setMtdGraphData(response.data);
          }
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
  
    function fetchKochiYtmData() {
      let url = `${environment.REFINERY_KPI_URL}/month/data?kpi_name=Distillate yield&refinery=Kochi`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setDisYieldKochiYtmData(response.data);
          if (props.location === "kochi") {
            setYtmGraphData(response.data);
          }
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
    fetchMumbaiMtdData();
    fetchMumbaiYtmData();
    fetchKochiMtdData();
    fetchKochiYtmData();
  }, [props.location])

  return (
    <div className={`d-flex flex-column justify-content-between ${styles.DistillateYieldContainer}`}>
      {
        loading
          ?
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>

          </div>
          :
          <>
            <div className={`d-flex align-items-center ${styles.graphTitle}`}>
              <span>Distillate Yield </span>
            </div>
            {ytmGraphData && mtdGraphData && <DistillateYieldChart location={props.location} ytmGraphData={ytmGraphData} mtdGraphData={mtdGraphData}></DistillateYieldChart>}
            <div className={`d-flex align-items-center justify-content-end ${styles.grmFooter}`}>
              <div className={`${styles.footerRight}`}><span>Last Updated on 31 <sup>st</sup>Jan'20</span></div>
            </div>
          </>
      }
    </div>
  );
}
export default RefinaryDistillateYield;
