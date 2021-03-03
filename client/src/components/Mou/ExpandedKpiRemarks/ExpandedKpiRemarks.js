import React from 'react'
import styles from './ExpandedKpiRemarks.module.scss'

function ExpandedKpiRemarks() {
    return (
        <div className={`d-flex flex-column ${styles.remarks_container}`}>
            {/* <div className={`col`}> */}
                <h3>Remarks</h3>
                <span><i>Evaluation based on audited results as on 30.12.2019</i></span>
                <span>1. Assumption :Crude: 65.75 $/bbl, USD :67.81 INR</span>
                <span>2. Actual :Crude: 67.81 $/bbl, USD :69.56 INR  </span>
                <span>3. Revised target: Rs240224 crores, 25% considered for Q1</span>
            {/* </div> */}

        </div>
    )
}
export default ExpandedKpiRemarks