import React, { useEffect, useState } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import BuRetailOutletGraph from "./BuRetailOutletGraph";
import styles from "./BuRetailOutlet.module.scss";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuRetailOutlet() {

  const [graphData, setGraphData] = useState([]);

  
  useEffect(() => {
    function prepareGraphData() {
      let url = `${environment.BU_KPI_URL}/retail_outlet/data?data_type=ytm&level=country`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setGraphData(response.data);
        })
        .catch(error => console.log(error));
    }
    prepareGraphData();
  }, [])
  return (
    <div className={`${styles.BuTransportationContainer}`}>
      <div className={`pt-2 ${styles.headerContainer}`}>
        <div className={`row`}>
          <div className={`col-8`}>
            <span>Retail Outlets</span>
          </div>
        </div>
        <div className={`row pt-2`}>
          <div className={`col-8 d-flex align-items-center ${styles.headerLabels}`}>
            <div className="d-flex mr-4 align-items-center ">
              <span className={`${styles.actualDot1}`}></span>
              <span className={`mr-2 ${styles.targetDot1}`}></span>
              NRO
            </div>
            <div className="d-flex ml-4 align-items-center ">
              <span className={`${styles.actualDot2}`}></span>
              <span className={`mr-2 ${styles.targetDot2}`}></span>
              Loyalty Sales
            </div>

          </div>
        </div>
      </div>
      <div className={`d-flex ${styles.tableAndGraphContainer}`}>
        {
          graphData ?
            graphData.map((el, index) => (
              <div key={index} className={`${styles.graphContainer}`}>
                <div className={`d-flex ${styles.graphHeaderContainer}`}>
                  <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
                    <div className={`${styles.graphHeaderSectionTop}`}><span>{el.ro_automated}</span></div>
                    <div className={`${styles.graphHeaderSectionBottom}`}><span>RO's Automated</span></div>
                  </div>
                  <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
                    <div className={`${styles.graphHeaderSectionTop}`}><span>{el.nro_commissioned}</span></div>
                    <div className={`${styles.graphHeaderSectionBottom}`}><span>NRO Commissioned</span></div>
                  </div>
                  <div className={`d-flex flex-column justify-content-center ${styles.graphHeaderSection}`}>
                    <div className={`${styles.graphHeaderSectionTop}`} ><span>{el.digital_transactions}%</span></div>
                    <div className={`${styles.graphHeaderSectionBottom}`}><span>Digital Transactions</span></div>
                  </div>
                </div>

                <div className={`d-flex justify-content-between ${styles.graphAndValueContainer}`}>
                  {
                    graphData ?
                      <BuRetailOutletGraph graphData={graphData}></BuRetailOutletGraph>
                      :
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                  }
                  <div className={`d-flex flex-column justify-content-around ${styles.valueContainer}`}>
                    <div className={`d-flex flex-column ${styles.valueContainerTop}`}>
                      <span>{el.nro_sales_contribution}% NRO Sales Contr.</span>
                      <span style={{ color: `${Math.sign(el.nro_volume_growth) === 1 ? "#74ce12" : "#e13219"}` }} >{el.nro_volume_growth}% Vol. Growth</span>
                    </div>
                    <div className={`d-flex flex-column ${styles.valueContainerBpttom}`}>
                      <span>{el.loyalty_sales_contribution}% Loyality Sales Contr.</span>
                      <span style={{ color: `${Math.sign(el.loyalty_volume_growth) === 1 ? "#74ce12" : "#e13219"}` }}>{el.loyalty_volume_growth}% Vol. Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            )) :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
        }
        <div className={`${styles.MsHsdContainer}`}>
          <div className={`${styles.HsdCircle}`}><span className={`${styles.Hsd}`}>HSD</span></div>
          <div className={`${styles.MsCircle}`}><span className={`${styles.Ms}`}>MS</span></div>
        </div>
      </div>
      <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>

    </div>
  )
}
export default BuRetailOutlet