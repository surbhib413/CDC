import React, { useEffect, useState } from "react";
import styles from "./BuAtfLossAndGain.module.scss";
import expandIcon from "../../../assets/images/expandIcon.png";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";
import BuAtfLossAndGainGraph from "./BuAtfLossAndGainGraph";

function BuAtfLossAndGain(props) {
    const [graphData, setGraphData] = useState([]);

    
    useEffect(() => {
      const prepareGraphData = () => {
          let url = `${environment.BU_KPI_URL}/loss_gain/data?data_type=ytm&level=country&business_unit=atf`;
          fetch(url, { method: "GET" })
              .then(res => res.json())
              .then(response => {
                  setGraphData(response.data);
              })
              .catch(error => console.log(error));
      }
        prepareGraphData();
    }, [props.activeTab])

    return (
        <div className={`${styles.BuLubesLossGainAnalysisContiner}`}>
            <div className={`d-flex flex-column justify-content-center ${styles.BuCcsHeader}`}>
                <div className={`${styles.HeaderTop}`}>Loss & Gain Analysis</div>
            </div>
            <div className={`d-flex ${styles.graphContainer}`}>
                {
                    graphData ?
                        <BuAtfLossAndGainGraph graphData={graphData}></BuAtfLossAndGainGraph>
                        :
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                }
            </div>
            <div className={`d-flex justify-content-end`}>
                <img src={expandIcon} alt='Expand Icon'></img>
            </div>
        </div >
    )
}
export default BuAtfLossAndGain;