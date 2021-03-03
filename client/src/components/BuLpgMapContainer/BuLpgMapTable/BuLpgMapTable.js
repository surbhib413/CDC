import React, { useState, useEffect } from "react";
import styles from "./BuLpgMapTable.module.scss";
import environment from "../../../environment";

function BuRetailMapTable(props) {
  const [allData, setAllData] = useState([]);
  const [salesRevMarkData, setSalesRevMarkData] = useState([]);
  const [hsseData, setHsseData] = useState([]);
  const [plantData, setPlantData] = useState([]);
  const [supplyData, setSupplyData] = useState([]);

  const getData = () => {
    let url = "";
    setAllData([]);
    setSalesRevMarkData([]);
    setHsseData([]);
    setPlantData([]);
    setSupplyData([]);

    if (props.activeKpi === "all") {
      url = `${environment.BU_KPI_URL}/table_overall/data?data_type=ytm&level=country&business_unit=lpg`;
    } else {
      url = `${environment.BU_KPI_URL}/table_detail/data?data_type=ytm&level=country&kpi_name=${props.activeKpi}&business_unit=retail`;
    }
    fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(response => {
        if (props.activeKpi === "all") {
          setAllData(response.data);
        } else if ((props.activeKpi === "sales") || (props.activeKpi === "revenue") || (props.activeKpi === "market share")) {
          setSalesRevMarkData(response.data);
        } else if (props.activeKpi === "hsse") {
          setHsseData(response.data);
        } else if (props.activeKpi === "plant") {
          setPlantData(response.data);
        } else if (props.activeKpi === "supply") {
          setSupplyData(response.data);
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
            <div className={`${styles.headerCell}`}>Product Segment</div>
            <div className={`${styles.headerCell}`}>Sales (TMT)</div>
            <div className={`${styles.headerCell}`}>Revenue (Rs Cr)</div>
            <div className={`${styles.headerCell}`}>BPCL Market Share (%)</div>
          </div>
        }

        {
          salesRevMarkData.length > 0 &&
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell}`}>COM</div>
            <div className={`${styles.headerCell}`}>BPCL</div>
            <div className={`${styles.headerCell}`}>IOCL</div>
            <div className={`${styles.headerCell}`}>JPCL</div>
            <div className={`${styles.headerCell}`}>SHELL</div>
            <div className={`${styles.headerCell}`}>RIL</div>
            <div className={`${styles.headerCell}`}>NEL</div>
          </div>
        }

        {
          hsseData.length > 0 &&
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell} `}>Plant Name</div>
            <div className={`${styles.headerCell}`}>Lost Man Hours</div>
            <div className={`${styles.headerCell}`}>Incidents Reported</div>
          </div>
        }

        {
          plantData.length > 0 &&
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell}`}>Plant Name</div>
            <div className={`${styles.headerCell}`}>Total Bottling</div>
            <div className={`${styles.headerCell}`}>Loss/Gain (%)</div>
            <div className={`${styles.headerCell}`}>Bulk Inventory (DOS)</div>
            <div className={`${styles.headerCell}`}>Cylinder Inventory</div>
          </div>
        }
        {
          supplyData.length > 0 &&
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell}`}>Planr Name</div>
            <div className={`${styles.headerCell}`}>Incoming (MT)</div>
            <div className={`${styles.headerCell}`}>Planned Demand (MT)</div>
            <div className={`${styles.headerCell}`}>Actual Sales</div>
          </div>
        }
        <div className={` d-flex flex-column ${styles.tableDataRowContainer}`}>
          {
            allData &&
            allData.map((el, index) => (
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell}`}><span>{el.product_segment}</span></div>
                <div className={`${styles.dataCell}`}><span>{el.sales_actual}</span></div>
                <div className={`${styles.dataCell}`}><span>{el.revenue_actual}</span></div>
                <div className={`${styles.dataCell}`}><span>{el.bpcl_mkt_share_actual}</span></div>
              </div>
            ))
          }
          {
            salesRevMarkData &&
            salesRevMarkData.map((el, index) => (
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell} `} >
                  <span>{el.com}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.bpcl}</span>
                </div>
                <div className={`${styles.dataCell} `}  >
                  <span>{el.iocl}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.hpcl}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.shell}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.ril}</span>
                </div>
                <div className={`${styles.dataCell}`}>
                  <span>{el.nel}</span>
                </div>
              </div>
            ))
          }

          {
            hsseData &&
            hsseData.map((el, index) => (
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell} `} >
                  <span>{el.com}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.incidents}</span>
                </div>
                <div className={`${styles.dataCell}`}  >
                  <span>{el.lost_man_hours}</span>
                </div>
              </div>
            ))
          }

          {
            plantData &&
            plantData.map((el, index) => (
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell} `} >
                  <span>{el.plant_name}</span>
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
            ))
          }
          {
            supplyData &&
            supplyData.map((el, index) => (
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell} `} >
                  <span>{el.plant_name}</span>
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
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default BuRetailMapTable;