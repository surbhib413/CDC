import React from 'react';
import styles from './Nifty.module.scss';
import NiftGraph from './NiftyGraph';

const Nifty = (props) => {
return(
    <div className={`${styles.Niftysection}`}>
        <div className={`${styles.NiftyGraphSection}`}>
            <NiftGraph />
        </div>
        <div className={`${styles.NiftyContent}`}>
            <h4 className={`${styles.NiftyContenthead}`}>Nifty <span className={`${styles.NiftyContentheadspan}`}>&#x2B07;</span></h4>
            <p className={`${styles.NiftyContentp}`}>367.90 INR <span className={`${styles.NiftyContentpspan}`}>-7.80 (2.17%)</span></p>
        </div>
    </div>
);
}
export default Nifty;