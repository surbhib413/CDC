import React, { Component } from 'react'
import styles from "./ExpandedKpiTable.module.scss"
import { Table} from "react-bootstrap"

class ExpandedKpiTable extends Component {

    makeHeader() {
        if (this.props.currentData.title === 'Others') {
            return (
                <>
                    <td>Apr</td>
                    <td>May</td>
                    <td>Jun</td>
                    <td>Jul</td>
                    <td>Aug</td>
                    <td>Sep</td>
                    <td>Oct</td>
                    <td>Nov</td>
                    <td>Dec</td>
                    <td>Jan</td>
                    <td>Feb</td>
                    <td>Mar</td>
                </>
            )
        } else {
            return (
                <>
                    <td>Q1</td>
                    <td>Q2</td>
                    <td>Q3</td>
                    <td>Q4</td>
                </>
            )
        }
    }

    render() {
        return (
            <div className={`row m-0 d-flex flex-row justify-content-between align-items-stretch ${styles.table_container}`}>
                <div className={`col-2 px-0 pt-5`}>
                    <Table className={`table ${styles.table_left_container_style}`}>
                        <tbody>
                            <tr>
                                <td style={{ border: "none" }}>Target ({this.props.kpiData.unit})</td>
                            </tr>
                            <tr>
                                <td style={{ border: "none" }}>Actual ({this.props.kpiData.unit})</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className={`col-10`}>
                    <table className={`table table-bordered ${styles.table_container_style}`}>
                        <tbody>
                            <React.Fragment>
                                <tr>
                                    {this.makeHeader()}
                                </tr>
                                <tr>
                                    {
                                        this.props.expandedKpiData.map((kpiTitle, index) => {
                                            
                                                var value = (kpiTitle.year === 2019 && kpiTitle.quater === 4) ?
                                                    <td key={index} style={{ display: "none" }}></td>
                                                    : <td key={index}><span>{kpiTitle.target ? kpiTitle.target : "-"}</span></td>;
                                            
                                            return (value);
                                        })
                                    }
                                </tr>
                                <tr>
                                    {
                                        this.props.expandedKpiData.map((kpiTitle, index) => {
                                            
                                                var value = (kpiTitle.year === 2019 && kpiTitle.quater === 4) ?
                                                    <td key={index} style={{ display: "none" }}></td>
                                                    : <td key={index}><span>{kpiTitle.actual ? kpiTitle.actual : "-"}</span></td>;
                                            
                                            return (value);
                                        })
                                    }
                                </tr>
                            </React.Fragment>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ExpandedKpiTable