import React, { useState, useEffect } from "react";
import styles from "./BuAtfMapTable.module.scss";
import environment from "../../../environment";

function BuRetailMapTable(props) {
  const [allData, setAllData] = useState([]);
  const [salesRevData, setSalesRevData] = useState([]);
  const [hsseData, setHsseData] = useState([]);
  const [mktData, setMktData] = useState([]);

  const getData = () => {
    let url = "";
    setAllData([]);
    setSalesRevData([]);
    setHsseData([]);
    setMktData([]);

    if (props.activeKpi === "all") {
      url = `${environment.BU_KPI_URL}/table_overall/data?data_type=ytm&level=country&business_unit=atf`;
    } else {
      url = `${environment.BU_KPI_URL}/table_detail/data?data_type=ytm&level=country&kpi_name=${props.activeKpi}&business_unit=atf`;
    }
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((response) => {
        if (props.activeKpi === "all") {
          setAllData(response.data);
        } else if (
          props.activeKpi === "sales" ||
          props.activeKpi === "revenue"
        ) {
          setSalesRevData(response.data);
        } else if (props.activeKpi === "market share") {
          //console.log(response.data)
          setMktData(response.data);
        } else if (props.activeKpi === "hsse") {
          setHsseData(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, [props.activeKpi]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`d-flex flex-column ${styles.BuRetailMapTableContainer}`}>
      <div className={`d-flex flex-column ${styles.tableHeaderRowContainer}`}>
        {allData.length > 0 && (
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell}`}>Customer Group</div>
            <div className={`${styles.headerCell}`}>Sales (TMT)</div>
            <div className={`${styles.headerCell}`}>Revenue (INR Cr)</div>
          </div>
        )}

        {salesRevData.length > 0 && (
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell}`}>COM</div>
            <div className={`${styles.headerCell}`}>BPCL</div>
            <div className={`${styles.headerCell}`}>IOCL</div>
            <div className={`${styles.headerCell}`}>JPCL</div>
            <div className={`${styles.headerCell}`}>SHELL</div>
            <div className={`${styles.headerCell}`}>RIL</div>
            <div className={`${styles.headerCell}`}>NEL</div>
          </div>
        )}
        {mktData.length > 0 && (
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell} `}>Customer Group</div>
            <div className={`${styles.headerCell}`}>BPCL</div>
            <div className={`${styles.headerCell}`}>IOCL</div>
            <div className={`${styles.headerCell}`}>HPCL</div>
            <div className={`${styles.headerCell}`}>SHELL</div>
            <div className={`${styles.headerCell}`}>RIL</div>
          </div>
        )}

        {hsseData.length > 0 && (
          <div className={`${styles.tableHeaderRow}`}>
            <div className={`${styles.headerCell} `}>Plant Name</div>
            <div className={`${styles.headerCell}`}>Lost Man Hours</div>
            <div className={`${styles.headerCell}`}>Incidents Reported</div>
            <div className={`${styles.headerCell}`}>
              Accident Free Hours (M)
            </div>
            <div className={`${styles.headerCell}`}>CPA</div>
          </div>
        )}
        <div className={` d-flex flex-column ${styles.tableDataRowContainer}`}>
          {allData &&
            allData.map((el, index) => (
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell}`}>
                  <span>{el.customer_group}</span>
                </div>
                <div className={`${styles.dataCell}`}>
                  <span>{el.sales_actual}</span>
                </div>
                <div className={`${styles.dataCell}`}>
                  <span>{el.revenue_actual}</span>
                </div>
              </div>
            ))}

          {salesRevData &&
            salesRevData.map((el, index) => (
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell} `}>
                  <span>{el.com}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.bpcl}</span>
                </div>
                <div className={`${styles.dataCell} `}>
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
            ))}
          {mktData &&
            mktData.map((el, index) => (
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell} `}>
                  <span>{el.customer_group}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.bpcl}</span>
                </div>
                <div className={`${styles.dataCell} `}>
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
              </div>
            ))}

          {hsseData &&
            hsseData.map((el, index) => (
              <div className={`d-flex ${styles.tableDataRow}`} key={index}>
                <div className={`${styles.dataCell} `}>
                  <span>{el.plant_name}</span>
                </div>
                <div className={`${styles.dataCell} `}>
                  <span>{el.lost_man_hours}</span>
                </div>
                <div className={`${styles.dataCell}`}>
                  <span>{el.incidents}</span>
                </div>
                <div className={`${styles.dataCell}`}>
                  <span>{el.accident_free_hrs}</span>
                </div>
                <div className={`${styles.dataCell}`}>
                  <span>{el.cpa}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default BuRetailMapTable;
