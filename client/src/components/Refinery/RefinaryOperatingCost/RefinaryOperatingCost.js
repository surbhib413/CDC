import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./RefinaryOperatingCost.module.scss";
import RefinaryOperatingCostGraph from "./RefinaryOperatingCostGraph";
import environment from "../../../environment";

function RefinaryOperatingCost(props) {

  const [operCostMumbaiUsdData, setOperCostMumbaiUsdData] = useState([]);
  const [operCostMumbaiInrData, setOperCostMumbaiInrData] = useState([]);
  const [operCostKochiUsdData, setOperCostKochiUsdData] = useState([]);
  const [operCostKochiInrData, setOperCostKochiInrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState(null);
  const [showingGraphUnit, setShowingGraphUnit] = useState("USD/Barrel");
  const [targetGraphUnit, setTargetGraphUnit] = useState("INR(Crore)");

  useEffect(() => {
    function fetchKochiUsdData() {
      let url = `${environment.REFINERY_KPI_URL}/year/data?kpi_name=operating cost&refinery=Kochi&unit=USD/barrel`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setOperCostKochiUsdData(response.data);
          if (props.location === 'kochi') {
            setGraphData(response.data);
          }
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
    function fetchKochiInrData() {
      let url = `${environment.REFINERY_KPI_URL}/year/data?kpi_name=operating cost&refinery=Kochi&unit=INR Crore`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setOperCostKochiInrData(response.data);
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
  
    function fetchMumbaiUsdData() {
      let url = `${environment.REFINERY_KPI_URL}/year/data?kpi_name=operating cost&refinery=Mumbai&unit=USD/barrel`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setOperCostMumbaiUsdData(response.data);
          if (props.location === "mumbai") {
            setGraphData(response.data)
          }
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
  
    function fetchMumbaiInrData() {
      let url = `${environment.REFINERY_KPI_URL}/year/data?kpi_name=operating cost&refinery=Mumbai&unit=INR Crore`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setOperCostMumbaiInrData(response.data);
          setLoading(false);
        })
        .catch(error => console.log(error));
    }

    fetchMumbaiUsdData()
    fetchKochiUsdData()
    fetchMumbaiInrData()
    fetchKochiInrData()
  }, [props.location])

  useEffect(() => {
    function switchForLocationButton() {
      if (props.location === "mumbai") {
        setGraphData(operCostMumbaiUsdData);
        setShowingGraphUnit("USD/Barrel")
        setTargetGraphUnit("INR(Crore)");
      }
      if (props.location === "kochi") {
        setGraphData(operCostKochiUsdData);
        setShowingGraphUnit("USD/Barrel")
        setTargetGraphUnit("INR(Crore)");
      }
    }
    switchForLocationButton();
    },  [props.location, operCostMumbaiUsdData, operCostKochiUsdData])

  function switchUnits(location) {
    if (location === "mumbai") {
      if (targetGraphUnit === "INR(Crore)") {
        // console.log("Switch USD to INR");
        // console.log("GRM-Mumbai-INR -- ", operCostMumbaiInrData);
        setGraphData(operCostMumbaiInrData);
        setShowingGraphUnit("INR(Crore)")
        setTargetGraphUnit("USD/Barrel");
      }
      if (targetGraphUnit === "USD/Barrel") {
        // console.log("Switch INR to USD");
        // console.log("GRM-Mumbai-USD -- ", operCostMumbaiUsdData);
        setGraphData(operCostMumbaiUsdData);
        setShowingGraphUnit("USD/Barrel")
        setTargetGraphUnit("INR(Crore)");
      }
    }
    if (location === "kochi") {
      if (targetGraphUnit === "INR(Crore)") {
        // console.log("Switch USD to INR");
        // console.log("GRM-Kochi-INR -- ", operCostKochiInrData);
        setGraphData(operCostKochiInrData);
        setShowingGraphUnit("INR(Crore)")
        setTargetGraphUnit("USD/Barrel");
      }
      if (targetGraphUnit === "USD/Barrel") {
        // console.log("Switch INR to USD");
        // console.log("GRM-Kochi-USD -- ", operCostKochiUsdData);
        setGraphData(operCostKochiUsdData);
        setShowingGraphUnit("USD/Barrel")
        setTargetGraphUnit("INR(Crore)");
      }
    }
  }

  return (
    <div className={`d-flex flex-column justify-content-between ${styles.operatingCostContainer}`}>
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
              <span>Operating Cost in {showingGraphUnit}</span>
            </div>
            {graphData && <RefinaryOperatingCostGraph location={props.location} graphData={graphData}></RefinaryOperatingCostGraph>}
            <div className={`d-flex align-items-center justify-content-between ${styles.OperatingCostFooter}`}>
              <div onClick={() => switchUnits(props.location)} className={`${styles.footerLeft}`}><span>View in {targetGraphUnit}</span></div>
              <div className={`${styles.footerRight}`}><span>Last Updated on 31<sup>st</sup>Jan'20</span></div>
            </div>
          </>
      }
    </div>

  );
}
export default RefinaryOperatingCost;