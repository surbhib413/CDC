import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";


import styles from "./RefinaryProduction.module.scss";
import RefinaryProductionChart from "./RefinaryProductionChart";
import environment from "../../../environment";

function RefinaryProduction(props) {

  const [productionMumbaiYtmData, setProductionMumbaiYtmData] = useState([]);
  const [productionMumbaiMtdData, setProductionMumbaiMtdData] = useState([]);
  const [productionKochiYtmData, setProductionKochiYtmData] = useState([]);
  const [productionKochiMtdData, setProductionKochiMtdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState(null);
  const [showingGraphUnit, setShowingGraphUnit] = useState("YTM");
  const [targetGraphUnit, setTargetGraphUnit] = useState("MTD");

  useEffect(() => {
    function fetchKochiYtmData() {
      let url = `${environment.REFINERY_KPI_URL}/month/data?kpi_name=Production&refinery=Kochi`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setProductionKochiYtmData(response.data);
          if (props.location === 'kochi') {
            setGraphData(response.data);
          }
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
    function fetchKochiMtdData() {
      let url = `${environment.REFINERY_KPI_URL}/day/data?kpi_name=Production&refinery=Kochi`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setProductionKochiMtdData(response.data);
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
  
    function fetchMumbaiYtmData() {
      let url = `${environment.REFINERY_KPI_URL}/month/data?kpi_name=Production&refinery=Mumbai`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setProductionMumbaiYtmData(response.data);
          if (props.location === "mumbai") {
            setGraphData(response.data)
          }
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
  
    function fetchMumbaiMtdData() {
      let url = `${environment.REFINERY_KPI_URL}/day/data?kpi_name=Production&refinery=Mumbai`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setProductionMumbaiMtdData(response.data);
          setLoading(false);
        })
        .catch(error => console.log(error));
    }

    fetchMumbaiYtmData()
    fetchKochiYtmData()
    fetchMumbaiMtdData()
    fetchKochiMtdData()
  }, [props.location])

  useEffect(() => {
    function switchForLocationButton() {
      if (props.location === "mumbai") {
        setGraphData(productionMumbaiYtmData);
        setShowingGraphUnit("YTM")
        setTargetGraphUnit("MTD");
      }
      if (props.location === "kochi") {
        setGraphData(productionKochiYtmData);
        setShowingGraphUnit("YTM")
        setTargetGraphUnit("MTD");
      }
    }
    switchForLocationButton();
  }, [props.location, productionMumbaiYtmData, productionKochiYtmData])

  function switchUnits(location) {
    if (location === "mumbai") {
      if (targetGraphUnit === "MTD") {
        // console.log("Switch YTM to MTD");
        // console.log("Production-Mumbai-MTD -- ", productionMumbaiMtdData);
        setGraphData(productionMumbaiMtdData);
        setShowingGraphUnit("MTD")
        setTargetGraphUnit("YTM");
      }
      if (targetGraphUnit === "YTM") {
        // console.log("Switch MTD to YTM");
        // console.log("Production-Mumbai-YTM -- ", productionMumbaiYtmData);
        setGraphData(productionMumbaiYtmData);
        setShowingGraphUnit("YTM")
        setTargetGraphUnit("MTD");
      }
    }
    if (location === "kochi") {
      if (targetGraphUnit === "MTD") {
        // console.log("Switch YTM to MTD");
        // console.log("Production-Kochi-MTD -- ", productionKochiMtdData);
        setGraphData(productionKochiMtdData);
        setShowingGraphUnit("MTD")
        setTargetGraphUnit("YTM");
      }
      if (targetGraphUnit === "YTM") {
        // console.log("Switch MTD to YTM");
        // console.log("Production-Kochi-YTM -- ", productionKochiYtmData);
        setGraphData(productionKochiYtmData);
        setShowingGraphUnit("YTM")
        setTargetGraphUnit("MTD");
      }
    }
  }

  return (
    <div className={`d-flex flex-column justify-content-between ${styles.RefinaryProductionContainer}`}>
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
              <span>Production for {showingGraphUnit}</span>
            </div>

            {graphData && <RefinaryProductionChart location={props.location} graphData={graphData}></RefinaryProductionChart>}
            <div className={`d-flex align-items-center justify-content-between ${styles.grmFooter}`}>
              <div onClick={() => switchUnits(props.location)} className={`${styles.footerLeft}`}><span>View data for {targetGraphUnit}</span></div>
              <div className={`${styles.footerRight}`}><span>Last Updated on 31<sup>st</sup>Jan'20</span></div>
            </div>
          </>
      }
    </div>
  );
}
export default RefinaryProduction;