import React from 'react';
import styles from './Sensex.module.scss';
import SensexGraph from './SensexGraph';

const Sensex = (props) => {
return(
    <div className={`${styles.Sensexsection}`}>
        <div className={`${styles.SensexGraphSection}`}>
            <SensexGraph />
        </div>
        <div className={`${styles.SensexContent}`}>
            <h4 className={`${styles.SensexContenthead}`}>Sensex <span className={`${styles.SensexContentheadspan}`}>&#x2B06;</span></h4>
            <p className={`${styles.SensexContentp}`}>367.90 INR <span className={`${styles.SensexContentpspan}`}>+7.80 (2.17%)</span></p>
        </div>
    </div>
);
}
export default Sensex;