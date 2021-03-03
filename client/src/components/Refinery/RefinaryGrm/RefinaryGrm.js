import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

import styles from "./RefinaryGrm.module.scss";
import GrmGraph from "./GrmGraph";
import environment from "../../../environment";

function RefinaryGrm(props) {
  const [grmMumbaiUsdData, setGrmMumbaiUsdData] = useState([]);
  const [grmMumbaiInrData, setGrmMumbaiInrData] = useState([]);
  const [grmKochiUsdData, setGrmKochiUsdData] = useState([]);
  const [grmKochiInrData, setGrmKochiInrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);
  const [showingGraphUnit, setShowingGraphUnit] = useState("USD/Barrel");
  const [targetGraphUnit, setTargetGraphUnit] = useState("INR(Crore)");

  useEffect(() => {
    function fetchKochiUsdData() {
      let url = `${environment.REFINERY_KPI_URL}/year/data?kpi_name=GRM&refinery=Kochi&unit=USD/barrel`;
      fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          setGrmKochiUsdData(response.data);
          if (props.location === "kochi") {
            setGraphData(response.data);
          }
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
    function fetchKochiInrData() {
      let url = `${environment.REFINERY_KPI_URL}/year/data?kpi_name=GRM&refinery=Kochi&unit=INR Crore`;
      fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          setGrmKochiInrData(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  
    function fetchMumbaiUsdData() {
      let url = `${environment.REFINERY_KPI_URL}/year/data?kpi_name=GRM&refinery=Mumbai&unit=USD/barrel`;
      fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          setGrmMumbaiUsdData(response.data);
          if (props.location === "mumbai") {
            setGraphData(response.data);
          }
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  
    function fetchMumbaiInrData() {
      let url = `${environment.REFINERY_KPI_URL}/year/data?kpi_name=GRM&refinery=Mumbai&unit=INR Crore`;
      fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((response) => {
          setGrmMumbaiInrData(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
    fetchMumbaiUsdData();
    fetchKochiUsdData();
    fetchMumbaiInrData();
    fetchKochiInrData();
  }, [props.location]);

  useEffect(() => {
    function switchForLocationButton() {
      if (props.location === "mumbai") {
        setGraphData(grmMumbaiUsdData);
        setShowingGraphUnit("USD/Barrel");
        setTargetGraphUnit("INR(Crore)");
      }
      if (props.location === "kochi") {
        setGraphData(grmKochiUsdData);
        setShowingGraphUnit("USD/Barrel");
        setTargetGraphUnit("INR(Crore)");
      }
    }
    switchForLocationButton();
    
  }, [props.location, grmMumbaiUsdData, grmKochiUsdData]);
  
  function switchUnits() {
    if (props.location === "mumbai") {
      if (targetGraphUnit === "INR(Crore)") {
        //console.log("Switch USD to INR");
        //console.log("GRM-Mumbai-INR -- ", grmMumbaiInrData);
        setGraphData(grmMumbaiInrData);
        setShowingGraphUnit("INR(Crore)");
        setTargetGraphUnit("USD/Barrel");
      }
      if (targetGraphUnit === "USD/Barrel") {
        //console.log("Switch INR to USD");
        //console.log("GRM-Mumbai-USD -- ", grmMumbaiUsdData);
        setGraphData(grmMumbaiUsdData);
        setShowingGraphUnit("USD/Barrel");
        setTargetGraphUnit("INR(Crore)");
      }
    }
    if (props.location === "kochi") {
      if (targetGraphUnit === "INR(Crore)") {
        //console.log("Switch USD to INR");
        //console.log("GRM-Kochi-INR -- ", grmKochiInrData);
        setGraphData(grmKochiInrData);
        setShowingGraphUnit("INR(Crore)");
        setTargetGraphUnit("USD/Barrel");
      }
      if (targetGraphUnit === "USD/Barrel") {
        //console.log("Switch INR to USD");
        //console.log("GRM-Kochi-USD -- ", grmKochiUsdData);
        setGraphData(grmKochiUsdData);
        setShowingGraphUnit("USD/Barrel");
        setTargetGraphUnit("INR(Crore)");
      }
    }
  }

  return (
    <div
      className={`d-flex flex-column justify-content-between ${styles.GrmContainer}`}
    >
      {loading ? (
        <div className='d-flex justify-content-center align-items-center'>
          <Spinner animation='border' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className={`d-flex align-items-center ${styles.graphTitle}`}>
            <span>GRM in {showingGraphUnit}</span>
          </div>
          {graphData && (
            <GrmGraph
              location={props.location}
              graphData={graphData}
            ></GrmGraph>
          )}
          <div
            className={`d-flex align-items-center justify-content-between ${styles.grmFooter}`}
          >
            <div
              onClick={() => switchUnits()}
              className={`${styles.footerLeft}`}
            >
              <span>View in {targetGraphUnit}</span>
            </div>
            <div className={`${styles.footerRight}`}>
              <span>
                Last Updated on 31<sup>st</sup>Jan'20
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default RefinaryGrm;
