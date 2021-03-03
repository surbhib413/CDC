import React, { useEffect } from 'react';
import CracksGraph from "./CracksGraph";
import styles from "./ItrmCracksChart.module.scss";
import kochiArrow from "../../../assets/images/cracksKochiArrow.png";
import mumbaiArrow from "../../../assets/images/cracksMumbaiArrow.png";

function ItrmCracksChart(props) {

  //const [textColor, setTextColor] = useState("#06bee1");

  useEffect(() => {
  }, [props.location])

  return (

    <div className={`${styles.itrmPriceCurvesContainer}`}>
      <div className={`${styles.curvesHeader}`}>
        <h1>Forward ($/Barrel)</h1>
       
      </div>
      <div className={`${styles.itrmTableContainer}`}>
        <div className={`row`} style={{ margin: "0px 0px 10px 0px" }}>
          <div className={`col-8 pl-0`}>
            <span className={`${styles.header}`}>Forward Curves ($/Barrel)</span>
          </div>
          <div className={`col-4 p-0`}>
            {
              (props.location === "mumbai") ?
                <img style={{ float: "right" }} src={mumbaiArrow} alt='Legend for Landed Cost'></img> :
                <img style={{ float: "right" }} src={kochiArrow} alt='Legend for Landed Cost'></img>
            }
          </div>
        </div>

        <div className={`row`} style={{ margin: "0px 0px 10px 0px" }}>
          <div className={`col-12 pl-0`}>
            <span className={`${styles.header} ${props.location === "mumbai" ? styles.mumbaiTheme : styles.kochiTheme}`} >- NYMEX WTI</span>
            <span className={`pl-5 ${styles.header} ${props.location === "mumbai" ? styles.mumbaiIceBrentTheme : styles.kochiIceBrentTheme}`}>-- ICE BRENT</span>
          </div>
        </div>
        

        <div className={`row`} style={{ margin: "40px 0px 10px 0px" }} >
          <CracksGraph location={props.location}></CracksGraph>
        </div>
      </div>
    </div>
  )
}
export default ItrmCracksChart;