import React, { useState, useEffect } from "react";
import environment from "../../../environment";
import styles from "./RefinaryEnergyIndex.module.scss";
import PolarAreaGraph from "../../../charts/PolarAreaChart";
import { Spinner } from "react-bootstrap";

function RefinaryEnergyIndex(props) {
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);
  // console.log("**********");
  // console.log(props.location);

  useEffect(() => {
    function fetchData() {
      let url = `${environment.REFINERY_KPI_URL}/year/data?kpi_name=Energy intensity index&refinery=${props.location}`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setGraphData(response.data);
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
    fetchData();
  }, [props.location]);

  return (
    <div
      className={`d-flex flex-column justify-content-between ${styles.EnergyIndexContainer}`}
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
            <span>Energy Intensity Index - EII</span>
          </div>

          <PolarAreaGraph
            location={props.location}
            graphData={graphData}
          ></PolarAreaGraph>

          <div
            className={`d-flex align-items-center justify-content-end ${styles.refineryEnergyIndexFooter}`}
          >
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
export default RefinaryEnergyIndex;
