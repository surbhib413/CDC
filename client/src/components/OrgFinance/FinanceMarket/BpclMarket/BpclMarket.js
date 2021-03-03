import React from 'react';
import styles from './BpclMarket.module.scss';
import BpclMarketGraph from './BpclMarketGraph';

const BpclMarket = (props) => {
return(
    <div className={`${styles.BpclMarketsection}`}>
        <div className={`${styles.BpclGraphSection}`}>
            <BpclMarketGraph />
        </div>
        <div className={`${styles.BpclContent}`}>
            <h4 className={`${styles.BpclContenthead}`}>BPCL <span className={`${styles.BpclContentheadspan}`}>&#x2B06;</span></h4>
            <p className={`${styles.BpclContentp}`}>400.54 INR <span className={`${styles.BpclContentpspan}`}>+5.40 (2.17%)</span></p>
        </div>
    </div>
);
}
export default BpclMarket;