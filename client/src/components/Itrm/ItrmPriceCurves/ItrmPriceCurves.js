import React, { useEffect, useState } from 'react';
import styles from "./ItrmPriceCurves.module.scss";
import kochiArrow from "../../../assets/images/kochiArrow.png";
import mumbaiArrow from "../../../assets/images/mumbaiArrow.png";

function ItrmPriceCurves(props) {
  const [textColor, setTextColor] = useState("#06bee1");

  useEffect(() => {
    if (props.location === "mumbai") {
      setTextColor("#06bee1")
    } else if (props.location === "kochi") {
      setTextColor("#b76df1")
    }
  }, [props.location])

  return (
    <div className={`${styles.itrmPriceCurvesContainer}`}>
      <div className={`${styles.curvesHeader}`}>
        <h1>Price Curves ($/Barrel)</h1>
      </div>
      <div className={`${styles.itrmTableContainer}`}>
        <div style={{ margin: "0px 0px 10px 0px" }}>
          <span className={`${styles.header}`}>Spot Prices</span>
        </div>
        <div className={`${styles.Table}`} style={{ borderRadius: "20px" }}>
          <div className={`${styles.Heading}`}>
            <div className={`${styles.Cell} ${styles.col}`} style={{ color: `${textColor}`, backgroundColor: "rgb(28, 35, 47)" }}>
              <p>Product</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`} style={{ color: `${textColor}`, backgroundColor: "rgb(28, 35, 47)" }}>
              <p>Price</p>
            </div>
            <div className={`${styles.Cell}`} style={{ color: `${textColor}`, backgroundColor: "rgb(28, 35, 47)" }}>
              <p>Delta</p>
            </div>
          </div>
          <div className={`${styles.Row}`}>
            <div className={`${styles.Cell} ${styles.col}`} >
              <p>Landed Brent</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <p>59.28</p>
            </div>
            <div className={`${styles.Cell}`}  >
              <p style={{ color: "#74ce12" }}>+0.92</p>
            </div>
          </div>
          <div className={`${styles.Row}`}>
            <div className={`${styles.Cell} ${styles.col}`} >
              <p>Landed</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}  >
              <p>59.55</p>
            </div>
            <div className={`${styles.Cell}`} >
              <p style={{ color: "#e13219" }}>-3.65</p>
            </div>
          </div>
          <div className={`${styles.Row}`}>
            <div className={`${styles.Cell} ${styles.col}`}  >
              <p>NYMEX</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}  >
              <p>59.15</p>
            </div>
            <div className={`${styles.Cell}`}>
              <p style={{ color: "#e13219" }}>-3.44</p>
            </div>
          </div>
        </div>

        <div>
          <div className={`row`} style={{ margin: "40px 0px 10px 0px" }} >
            <div className={`col-8 pl-0`}>
              <span className={`${styles.header}`}>Future Prices</span>
            </div>
            <div className={`col-4 p-0`}>
              {
                (props.location === "mumbai") ?
                  <img style={{ float: "right" }} src={mumbaiArrow} alt='Legend for Landed Cost'></img> :
                  <img style={{ float: "right" }} src={kochiArrow} alt='Legend for Landed Cost'></img>
              }
            </div>
          </div>
          <div className={`${styles.Table}`}>
            <div className={`${styles.Heading}`}>
              <div className={`${styles.Cell} ${styles.col}`} style={{ color: `${textColor}`, backgroundColor: "rgb(28, 35, 47)" }}>
                <p>Product</p>
              </div>
              <div className={`${styles.Cell} ${styles.col}`} style={{ color: `${textColor}`, backgroundColor: "rgb(28, 35, 47)" }}>
                <p>Price</p>
              </div>
              <div className={`${styles.Cell}`} style={{ color: `${textColor}`, backgroundColor: "rgb(28, 35, 47)" }}>
                <p>Delta</p>
              </div>
            </div>
            <div className={`${styles.Row}`}>
              <div className={`${styles.Cell} ${styles.col}`}>
                <p>NYMEX WTI</p>
              </div>
              <div className={`${styles.Cell} ${styles.col}`}>
                <p>53.48</p>
              </div>
              <div className={`${styles.Cell}`}>
                <p style={{ color: "#e13219" }}>-0.34</p>
              </div>
            </div>
            <div className={`${styles.Row}`}>
              <div className={`${styles.Cell} ${styles.col}`}>
                <p>Landed</p>
              </div>
              <div className={`${styles.Cell} ${styles.col}`}>
                <p>59.55</p>
              </div>
              <div className={`${styles.Cell}`}>
                <p style={{ color: "#74ce12" }}>+0.19</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ItrmPriceCurves;