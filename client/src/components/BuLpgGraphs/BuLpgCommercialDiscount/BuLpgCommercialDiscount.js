import React, { useEffect, useState } from "react";
import styles from "./BuLpgCommercialDiscount.module.scss";
import expandIcon from "../../../assets/images/expandIcon.png";
import { Spinner } from "react-bootstrap";
import BuLpgCommercialDiscGraph from "./BuLpgCommercialDiscGraph";
import environment from "../../../environment";

function BuLpgCommercialDiscount(props) {
  const [graphData, setGraphData] = useState([]);
  // const [lastItem, setLastItem] = useState({});
  const [product, setProduct] = useState("all")

  
  useEffect(() => {
    function setProductOnTab() {
      if (props.activeTab === "all_tab") {
        setProduct("all")
      }
      if (props.activeTab === "bmcg_tab") {
        setProduct("bmcg")
      }
    }
  
    function prepareGraphData() {
      let url = `${environment.BU_KPI_URL}/data?data_type=ytm&level=country&business_unit=lpg&product=${product}&kpi_name=commercial discounts`
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          setGraphData(response.data);
          // setLastItem(response.data[response.data.length - 1]);
        })
        .catch(error => console.log(error));
    }
    prepareGraphData()
    setProductOnTab()
  }, [props.activeTab, product])


  return (
    <div className={`${styles.salesRevenueContiner}`}>
      <div className={`pt-2 ${styles.headerContainer}`}>
        <div className={`row`}>
          <div className={`col-8`}>
            <span>Commercial Discount</span>
          </div>
          <div className={`col-4 mt-2 ${styles.headerRight}`}>
            <span>Total: 330 INR</span>
            <span className={`ml-4`} style={{ color: "#e13219" }}>-10%</span>
          </div>
        </div>
        <div className={`row pt-2`}>
          <div className={`col-8 d-flex align-items-center ${styles.headerLabels}`}>
            <div className={`d-flex mr-2 align-items-center`}>--- Target</div>
          </div>
        </div>
      </div>
      <div className={`row ${styles.salesRevenueGraph}`}>
        {
          graphData ?
            <BuLpgCommercialDiscGraph graphData={graphData}></BuLpgCommercialDiscGraph>
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>

        }
      </div>
      <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div>
  )
}
export default BuLpgCommercialDiscount;