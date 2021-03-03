import React, { useEffect, useState } from 'react'
import { Spinner } from "react-bootstrap";

import LineGraph from "../../../charts/LineGraph/LineGraph"
import styles from "./ExpandedKpi.module.scss"
import ExpandedKpiTable from "../ExpandedKpiTable/ExpandedKpiTable"
import ExpandedKpiRemarks from '../ExpandedKpiRemarks/ExpandedKpiRemarks'
import BarGraph from "../../../charts/BarGraph";
import { getColor } from '../../../utility/utility'
import environment from "../../../environment";

function ExpandedKpi(props) {
    const [expandedKpiData, setExpandedKpiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const defaultData = {
        //labels: ["1 Apr '19", "Q1", "Q2", "Q3", "Q4"],
        labels: fetchaLabels(),
        header: `<tr key={key}><td>Q1</td><td>Q2</td><td>Q3</td><td>Q4</td></tr>`,
        data: [],
        target: []
    }

    const [graphAndTableData, setgraphAndTableData] = useState(defaultData);
    const [kpiDetails, setKpiDetails] = useState([]);
    function fetchaLabels() {
        let labels = [];
        if (props.kpiListData.title.trim() === 'Mandatory Kpis') {
            labels = ["Q1", "Q2", "Q3", "Q4"];
        }
        if (props.kpiListData.title.trim() === 'Mandatory Kpis' && props.kpiTitle.kpi_chart_type === "bar") {
            labels.shift("Q1", "Q2", "Q3", "Q4");
        }
        if (props.kpiListData.title.trim() === 'Others') {
            labels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
        }
        return labels;
    }
    useEffect(() => {
        function fetchExpandedKpiData() {
            let url = "";
            if (props.kpiListData.title.trim() === 'Mandatory Kpis') {
                url = `${environment.PLANNING_KPI_URL}/mandatory/data/${encodeURIComponent(props.latestQuaterData.kpi_name)}`
            }
            if (props.kpiListData.title.trim() === 'Others') {
                url = `${environment.PLANNING_KPI_URL}/other/data/${encodeURIComponent(props.latestQuaterData.kpi_name)}`;
            }
            fetch(
                url,
                {
                    method: "GET"
                }
            )
                .then(res => res.json())
                .then(response => {
                    populateGraphData(response)
                    setExpandedKpiData(response);
                    setKpiDetails(response);
                    setLoading(false);
    
                })
                .catch(error => console.log("This is the error", error));
        }
        fetchExpandedKpiData();

        function populateGraphData(graphData) {
            graphData.forEach((value, index) => {
                if (props.kpiListData.title.trim() === 'Mandatory Kpis' && index === 0 && props.kpiTitle.kpi_chart_type === "bar") {
                }
                else {
                    if (value.actual) {
                        graphAndTableData.data.push(value.actual);
                    }
                    if (value.target) {
                        graphAndTableData.target.push(value.target);
                    }
                    setgraphAndTableData(graphAndTableData);
                }
            })
        }
    }, [props.kpiListData.title, props.latestQuaterData.kpi_name, graphAndTableData, props.kpiTitle.kpi_chart_type])

    return (
        <div className={`container p-0 ${styles.turnover}`}>
            <div className="row">
                <div className={`d-flex flex-column pt-3 col-8 ${styles.kpi_section_header_container}`}>
                    <span className={`${styles.span1}`} style={{ color: getColor(props.latestQuaterData.rating) }}>{props.latestQuaterData.currency ? props.latestQuaterData.currency : ""} {`${props.latestQuaterData.actual} ${props.latestQuaterData.unit}`}</span>
                    <span className={`${styles.span2}`}>{`Target: ${props.latestQuaterData.target} ${props.latestQuaterData.unit}`}</span>
                </div>
                <div className="col-2 pt-3" style={{ textAlign: "right" }}>
                    <span className={`${styles.span1}`}>All Data in {props.latestQuaterData.unit}</span>
                </div>
            </div>

            {
                loading
                    ?
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    :
                    <div className={`${styles.lineGraph}`}>

                        {
                            props.kpiTitle.kpi_chart_type === "line" ?
                                <LineGraph latestQuaterData={props.latestQuaterData} graphData={graphAndTableData} />
                                : <BarGraph latestQuaterData={props.latestQuaterData} graphData={graphAndTableData} kpiDetails={kpiDetails} kpiListData={props.kpiListData}></BarGraph>
                        }
                    </div>
            }

            {
                loading
                    ?
                    <div className={`d-flex justify-content-center`}>
                        <Spinner animation="grow" variant="light">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                    :
                    <>
                        <ExpandedKpiTable expandedKpiData={expandedKpiData} kpiData={props.latestQuaterData} graphData={graphAndTableData} currentData={props.kpiListData} ></ExpandedKpiTable>
                        {/* kpiData={props.latestQuaterData} */}
                    </>
            }
            <ExpandedKpiRemarks></ExpandedKpiRemarks>
        </div>
    )
}

export default ExpandedKpi