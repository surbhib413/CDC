import React, { useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import styles from "./KpisList.module.scss";
import SmallPercentageDoughnut from "../../../charts/SmallPercentageDoughnut";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ExpandedKpi from "../ExpandedKpi/ExpandedKpi"
import { getColor, toTitleCase } from "../../../utility/utility";
import environment from "../../../environment";
import { Spinner } from "react-bootstrap";

function KpisList(props) {
  const [fetchedKpiData, setFetchedKpiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchKpis() {
      let url = "";
      if (props.kpiListData.title === "Mandatory Kpis") {
        url = `${environment.PLANNING_KPI_URL}/mandatory`
      }
      if (props.kpiListData.title === "Others") {
        url = `${environment.PLANNING_KPI_URL}/other`
      }
  
      fetch(
        url,
        {
          method: "GET"
        }
      )
        .then(res => res.json())
        .then(response => {
          setFetchedKpiData(response);
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
    fetchKpis()
  }, [props.kpiListData.title])

  return (
    <div className={styles.kpis_container}>
      <div className={`d-flex align-items-center pl-4 ${styles.kpis_header}`}><span>{props.kpiListData.title.toUpperCase()}</span></div>
      <Accordion className={`bg-dark ${styles.kpis_list_container}`}>
        {loading
          ?
          <div className={`d-flex justify-content-center`}>
            <Spinner animation="grow" variant="light">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
          :
          props.kpiListData.kpiList.map((kpiTitle, index) => {
            let currentItem = fetchedKpiData.find((item) => {
              return item.kpi_name.toLowerCase() === kpiTitle.kpi_name.toLowerCase()
            })
            return (currentItem &&
              <Card key={index} className={`${styles.card_container}`}>
                <Accordion.Toggle as={Card.Header} eventKey={index} className={`d-flex flex-row justify-content-between align-items-stretch ${styles.kpis_list_item}`}>
                  <div className={`d-flex align-items-center ${styles.kpi_item_progress_circle}`}>
                    <SmallPercentageDoughnut percentage={Math.round(currentItem.raw_score)} />
                  </div>
                  <div className={` d-flex flex-column justify-content-center flex-grow-1 ${styles.kpi_item_title}`}>
                    <div className={`d-flex align-items-center justify-content-between pr-5 ${styles.kpi_item_score}`}>
                      <span>{kpiTitle.kpi_name}</span>
                      {`${Math.round((currentItem.score * 10)) / 10}/${currentItem.total_marks}`}
                    </div>
                    <span className={styles.kpi_value} style={{ color: getColor(currentItem.rating) }}>{toTitleCase(currentItem.rating)}</span>
                  </div>
                  <span className="d-flex align-items-center pr-5 mb-4 "><FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index} className={styles.collapse_chart}>
                  <ExpandedKpi kpiTitle={kpiTitle} latestQuaterData={currentItem} kpiListData={props.kpiListData} />
                </Accordion.Collapse>
              </Card>
            )
          })
        }
      </Accordion>
      <div className={`d-flex flex-row justify-content-between align-items-center pl-4 pr-4 ${styles.kpis_footer}`}>
        <div className={styles.kpis_footer_left}>Last Updated on: 29<sup>th</sup> Feb 20</div>
        <div className={styles.kpis_footer_right}>Showing Data for : Apr 19 - Feb 20</div>
      </div>
    </div>

  )
}
export default KpisList;