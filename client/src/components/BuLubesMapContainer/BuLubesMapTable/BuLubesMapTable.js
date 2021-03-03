import React, { useState, useEffect } from "react";
import styles from "./BuLubesMapTable.module.scss";
import environment from "../../../environment";

function BuRetailMapTable(props) {
  const [allData, setAllData] = useState([]);
  const [salesRevMarkData, setSalesRevMarkData] = useState([]);
  const [hsseData, setHsseData] = useState([]);
  const [depotData, setDepotData] = useState([]);

  const getData = () => {
    let url = "";
    setAllData([]);
    setSalesRevMarkData([]);
    setHsseData([]);
    setDepotData([]);

    if (props.activeKpi === "all") {
      url = `${environment.BU_KPI_URL}/table_overall/data?level=country&data_type=ytm&business_unit=lubes`;
    } else {
      url = `${environment.BU_KPI_URL}/table_detail/data?data_type=ytm&business_unit=lubes&level=country&kpi_name=${props.activeKpi}`;
    }
    fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(response => {
        if (props.activeKpi === "all") {
          setAllData(response.data);
        }
        else if ((props.activeKpi === "sales") || (props.activeKpi === "revenue") || (props.activeKpi === "market share")) {
          console.log("salesTevMarkData........", response.data);
          setSalesRevMarkData(response.data);
        }
        else if (props.activeKpi === "hsse") {
          setHsseData(response.data);
        }
        else if (props.activeKpi === "depot") {
          setDepotData(response.data);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getData();
  }, [props.activeKpi]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`d-flex flex-column ${styles.BuRetailMapTableContainer}`}>
      <div className={`d-flex flex-column ${styles.tableHeaderRowContainer}`}>
        {
          allData.length > 0 &&
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell}`}>
              Product Group
              </div>
            <div className={`${styles.headerCell}`}>
              Sales (TKL)
              </div>
            <div className={`${styles.headerCell}`}>
              Revenue (Rs Cr)
            </div>
          </div>
        }

        {
          salesRevMarkData.length > 0 &&
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell}`}>Product Segment</div>
            <div className={`${styles.headerCell}`}>Avn Intl/Export</div>
            <div className={`${styles.headerCell}`}>Channel-E</div>
            <div className={`${styles.headerCell}`}>Direct</div>
            <div className={`${styles.headerCell}`}>Institutional Sales</div>
            <div className={`${styles.headerCell}`}>Retail</div>
          </div>
        }

        {
          hsseData.length > 0 &&
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell} `}>Plant Name</div>
            <div className={`${styles.headerCell}`}>No. Of Incidents</div>
            <div className={`${styles.headerCell}`}>Lost Man Hours</div>
          </div>
        }

        {
          depotData.length > 0 &&
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell}`}>Depot Name</div>
            <div className={`${styles.headerCell}`}>Target Dos (Days)</div>
            <div className={`${styles.headerCell}`}>Actual Dos (Days)</div>
            <div className={`${styles.headerCell}`}>Monthly Supply Plan(KL)</div>
            <div className={`${styles.headerCell}`}>Actual Supply (KL)</div>
          </div>
        }

        <div className={` d-flex flex-column ${styles.tableDataRowContainer}`}>
          {
            allData &&
            allData.map((el, index) => 
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell}`}><span>{el.product}</span></div>
                <div className={`${styles.dataCell}`}><span>{el.sales_actual}</span></div>
                <div className={`${styles.dataCell}`}><span>{el.revenue_actual}</span></div>
              </div>
            )
          }

          {
            salesRevMarkData &&
            salesRevMarkData.map((el, index) => 
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell} `} >
                  <span>{el.product_segment}</span>
                </div>
                <div className={`${styles.dataCell} `}  >
                  <span>{el.export.actual}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.channel.actual}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.direct.actual}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.institutional.actual}</span>
                </div>
                <div className={`${styles.dataCell}`}>
                  <span>{el.retail.actual}</span>
                </div>
              </div>
            )
          }
          {
            hsseData &&
            hsseData.map((el, index) => 
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell} `} >
                  <span>{el.plant_name}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.incidents}</span>
                </div>
                <div className={`${styles.dataCell}`}  >
                  <span>{el.lost_man_hours}</span>
                </div>
              </div>
            )
          }
        </div>





        {
          depotData &&
          depotData.map((el, index) => 
            <div className={`d-flex ${styles.tableDataRow}`} key={index}>
              <div className={`${styles.dataCell} `} >
                <span>{el.depot_name}</span>
              </div>
              <div className={`${styles.dataCell} `}>
                <span>{el.supply_days.target}</span>
              </div>
              <div className={`${styles.dataCell} `}  >
                <span style={{ color: `${Math.sign(el.supply_days.actual - el.supply_days.target) === 1 ? "#74ce12" : "#e13219"}` }}>{el.supply_days.actual}</span>
              </div>
              <div className={`${styles.dataCell} `}>
                <span>{el.supply.target}</span>
              </div>
              <div className={`${styles.dataCell}`}>
                <span style={{ color: `${Math.sign(el.supply.actual - el.supply.target) === 1 ? "#74ce12" : "#e13219"}` }}>{el.supply.actual}</span>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
export default BuRetailMapTable;