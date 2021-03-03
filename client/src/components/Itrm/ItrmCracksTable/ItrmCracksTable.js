import React, { useEffect, useState } from 'react';
import styles from "./ItrmCracksTable.module.scss";

function ItrmCracksTable(props) {

  const [textColor, setTextColor] = useState("#06bee1");
  useEffect(() => {
    if (props.location === "mumbai") {
      setTextColor("#06bee1")
    } else if (props.location === "kochi") {
      setTextColor("#b76df1")
    }
  }, [props.location])

  return (
    <div className={`${styles.itrmCracksTableContainer}`}>
      <div className={`${styles.curvesHeader}`}>
        <h1>Cracks ($/Barrel)</h1>
      </div>
      <div className={`${styles.curvesTableContainer}`}>
        <div className={`${styles.Table}`}>
          <div className={`${styles.Heading}`} >
            <div className={`${styles.Cell} ${styles.col}`} style={{ color: `${textColor}`, backgroundColor: "rgb(28, 35, 47)" }}>
              <p className={`${styles.header}`}>Product</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`} style={{ color: `${textColor}`, backgroundColor: "rgb(28, 35, 47)" }}>
              <p className={`${styles.header}`}>Daily</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`} style={{ color: `${textColor}`, backgroundColor: "rgb(28, 35, 47)" }}>
              <p className={`${styles.header}`}>Monthly</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`} style={{ color: `${textColor}`, backgroundColor: "rgb(28, 35, 47)" }}>
              <p className={`${styles.header}`}>Quarter</p>
            </div>
            <div className={`${styles.Cell}`} style={{ color: `${textColor}`, backgroundColor: "rgb(28, 35, 47)" }}>
              <p className={`${styles.header}`}>Yearly</p>
            </div>
          </div>
          <div className={`${styles.Row}`}>
            <div className={`${styles.Cell} ${styles.col}`}>
              <p>Naptha</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>-3.30</p></div>
              <div><p className={`${styles.rightDiv}`} >+0.44</p></div>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>-3.30</p></div>
              <div><p className={`${styles.rightDiv}`}>+0.44</p></div>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>-3.30</p></div>
              <div><p className={`${styles.rightDiv}`}>+0.44</p></div>
            </div>
            <div className={`${styles.Cell}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>-3.30</p></div>
              <div><p className={`${styles.rightDiv}`}>+0.44</p></div>
            </div>
          </div>


          <div className={`${styles.Row}`}>
            <div className={`${styles.Cell} ${styles.col}`}>
              <p>Gasoline</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>3.47</p></div>
              <div><p className={`${styles.rightDiv}`}>+0.44</p></div>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>3.47</p></div>
              <div><p className={`${styles.rightDiv}`}>+0.44</p></div>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>3.47</p></div>
              <div><p className={`${styles.rightDiv}`}>+0.44</p></div>
            </div>
            <div className={`${styles.Cell}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>3.47</p></div>
              <div><p className={`${styles.rightDiv}`}>+0.44</p></div>
            </div>
          </div>
         


          <div className={`${styles.Row}`}>
            <div className={`${styles.Cell} ${styles.col}`}>
              <p>Jet/Kero</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>8.91</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#e13219" }}>-1.57</p></div>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>8.91</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#e13219" }} >-1.57</p></div>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>8.91</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#e13219" }}>-1.57</p></div>
            </div>
            <div className={`${styles.Cell}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>8.91</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#e13219" }}>-1.57</p></div>
            </div>
          </div>



          <div className={`${styles.Row}`}>
            <div className={`${styles.Cell} ${styles.col}`}>
              <p>Gas Oil</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>9.80</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#e13219" }}>-1.92</p></div>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>9.80</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#e13219" }}>-1.92</p></div>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>9.80</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#e13219" }}>-1.92</p></div>
            </div>
            <div className={`${styles.Cell}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>9.80</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#e13219" }}>-1.92</p></div>
            </div>
          </div>


          <div className={`${styles.Row}`}>
            <div className={`${styles.Cell} ${styles.col}`}>
              <p>FO 180</p>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>-11.66</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#FF0000" }}>+0.44</p></div>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>-11.66</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#FF0000" }}>+0.44</p></div>
            </div>
            <div className={`${styles.Cell} ${styles.col}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>-11.66</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#FF0000" }}>+0.44</p></div>
            </div>
            <div className={`${styles.Cell}`}>
              <div className={`${styles.divStyle}`}><p className={`${styles.leftDiv}`}>-11.66</p></div>
              <div><p className={`${styles.rightDiv}`} style={{ color: "#FF0000" }}>+0.44</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ItrmCracksTable;