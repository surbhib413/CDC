import React, { useEffect } from 'react';
import styles from "./InternationalBond.module.scss";
//import { Spinner } from "react-bootstrap";
import InternationalBondGraph from "./InternationalBondGraph";

function InternationalBond(props) {

    useEffect(() => {
    }, [props.oceanLossData]);

    return (
        <div className={`${styles.itrmOceanLossContainer}`}>
            <div className={`pt-2 ${styles.headerContainer}`}>
                <div className={`row`}>
                    <div className={`col-5`}>
                        <span>International Bond</span>
                    </div>
                    <div className={`col-7 mt-2 d-flex align-items-center ${styles.headerLabels}`}>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.HpclDot}`}></span>Bond 1: <span style={{color:'#fff',fontWeight : 'normal',marginLeft : '5px'}}> 350 Cr</span></div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.IoclDot}`}></span>Bond 2: <span style={{color:'#fff',fontWeight : 'normal',marginLeft : '5px'}}> 225 Cr</span></div>
                        <div className="d-flex mr-4 align-items-center "><span className={`mr-2 ${styles.ShellDot}`}></span>Bond 3: <span style={{color:'#fff',fontWeight : 'normal',marginLeft : '5px'}}> 150 Cr</span></div>
                    </div>
                </div>
            </div>
            <div className={`d-flex ${styles.graphContainer}`}>
                <InternationalBondGraph></InternationalBondGraph>
            </div>
        </div>
    )
}
export default InternationalBond;