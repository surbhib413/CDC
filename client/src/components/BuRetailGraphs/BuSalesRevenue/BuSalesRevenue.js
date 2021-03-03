import React, { useEffect, useState } from "react";
import styles from "./BuSalesRevenue.module.scss";
import expandIcon from "../../../assets/images/expandIcon.png";
import SalesRevenueGraph from "../../../charts/SalesRevenueGraph/SalesRevenueGraph";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function BuSalesRevenue(props) {
  const [salesGraphData, setSalesGraphData] = useState(null);
  const [revenueGraphData, setRevenueGraphData] = useState(null);
  const [salesLastItem, setSalesLastItem] = useState({});
  const [revenueLastItem, setRevenueLastItem] = useState({});

  
  useEffect(() => {
    function prepareGraphData(kpi_name) {
      let level = "";
      let appendRegion = "";
  
      if (props.mapOf.toLocaleLowerCase() === "north" || props.mapOf.toLocaleLowerCase() === "north" || props.mapOf.toLocaleLowerCase() === "north" || props.mapOf.toLocaleLowerCase() === "north") {
        level = "region";
        appendRegion = `&region=${props.mapOf}`;
      }
      else {
        level = "country";
      }
  
      let url = `${environment.BU_KPI_URL}/data?business_unit=retail&kpi_name=${kpi_name}&data_type=ytm&level=${level}&product=${props.product}${appendRegion}`;
      fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(response => {
          response.data.forEach((item, index) => {
            if (item.kpi_name === 'sales') {
              setSalesGraphData(response.data);
              setSalesLastItem(response.data[response.data.length - 1]);
            }
            else if (item.kpi_name === 'revenue') {
              setRevenueGraphData(response.data);
              setRevenueLastItem(response.data[response.data.length - 1]);
            }
          });
        })
        .catch(error => console.log(error));
    }
    prepareGraphData('sales');
    prepareGraphData('revenue');
  }, [props.product, props.mapOf])

  return (
    <div className={`${styles.salesRevenueContiner}`}>
      <div className={`pt-2 ${styles.headerContainer}`}>
        <div className={`row`}>
          <div className={`col-8`}>
            <span>Sales & Revenue</span>
          </div>
          <div className={`col-4 mt-2 ${styles.headerRight}`}>
            <span>Sales: {salesLastItem.actual} TLK</span>
            <span className={`ml-4`} style={{ color: `${Math.sign(salesLastItem.growth) === 1 ? "#74ce12" : "#e13219"}` }}>{salesLastItem.growth}%</span>
          </div>
        </div>
        <div className={`row pt-2`}>
          <div className={`col-8 d-flex align-items-center ${styles.headerLabels}`}>
            <div className="d-flex mr-2 align-items-center "><span className={`mr-2 ${styles.actualDot}`}></span>Actual</div>
            <div className="d-flex mr-2 align-items-center "><span className={`mr-2 ${styles.targetDot}`}></span>Target</div>
          </div>
          <div className={`col-4 ${styles.headerLabelsTarget}`}>
            <span>Revenue: {revenueLastItem.actual} INR</span>
            <span className={`ml-4`} style={{ color: `${Math.sign(revenueLastItem.growth) === 1 ? "#74ce12" : "#e13219"}` }} >{revenueLastItem.growth}%</span>
          </div>
        </div>
      </div>
      <div className={`row ${styles.salesRevenueGraph}`}>
        <div className={`col-5 p-0 ${styles.leftDiv}`}>
          {
            salesGraphData ?
              <SalesRevenueGraph graphData={salesGraphData}></SalesRevenueGraph>
              :
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
          }
        </div>
        <div className={`col-2 pl-0 pr-1 ${styles.centerDiv}`}>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>Apr</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>May</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>Jun</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>Jul</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>Aug</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>Sep</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>Oct</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>Nov</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>Dec</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>Jan</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>Feb</div>
          <div className={`d-flex align-items-center justify-content-center ${styles.layoutDiv}`}>Mar</div>
        </div>
        <div className={`col-5 p-0 ${styles.rightDiv}`}>
          {
            revenueGraphData ?
              <SalesRevenueGraph graphData={revenueGraphData}></SalesRevenueGraph>
              :
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
          }
        </div>
        <div className={`${styles.MsHsdContainer}`}>
          <div className={`${styles.HsdCircle}`}><span className={`${styles.Hsd}`}>{props.product.toLocaleUpperCase()}</span></div>
        </div>
      </div>

      <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
        <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
      </div>
    </div>
  )
}
export default BuSalesRevenue;