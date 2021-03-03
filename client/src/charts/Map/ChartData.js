import React, { useState, useEffect } from "react";
import styles from "./Map.module.scss";

const ChartData = (props) => {
  const [loading, setLoading] = useState(false);

  const { chartData } = props;
  //console.log(chartData.length);
  const renderProgressBar = (regionCode, term, spot, ind) => {
    //console.log(document.getElementById("progressBarSet"));
    // console.log(regionCode);
    if (
      document.querySelector(`#progressbarDataForTerm${regionCode}`) !== null
    ) {
      document.querySelector(
        `#progressbarDataForTerm${regionCode}`
      ).style.width = `${term / 10}%`;

      document.querySelector(
        `#progressbarDataForTerm${regionCode}`
      ).innerHTML = `<span id="hsTerm${regionCode}" style="font-size:16px;float:left; font-style: italic;">${term}</span><span id="lsTerm${regionCode}" style="font-size:16px;float:right; font-style: italic;left:150px;position:absolute">${
        1000 - term
      }</span>`;
    }
    if (
      document.querySelector(`#progressbarDataForSpot${regionCode}`) !== null
    ) {
      document.querySelector(
        `#progressbarDataForSpot${regionCode}`
      ).style.width = `${spot / 10}%`;
      document.querySelector(
        `#progressbarDataForSpot${regionCode}`
      ).innerHTML = `<span id="hsSpot${regionCode}" style="font-size:16px;float:left; font-style: italic;">${spot}</span><span id="lsSpot${regionCode}" style="font-size:16px;float:right; font-style: italic;left:150px;position:absolute">${
        1000 - spot
      }</span>`;
    }

    if (
      document.querySelector(`#progressbarDataForIndigenous${regionCode}`) !==
      null
    ) {
      document.querySelector(
        `#progressbarDataForIndigenous${regionCode}`
      ).style.width = `${ind / 10}%`;
      document.querySelector(
        `#progressbarDataForIndigenous${regionCode}`
      ).innerHTML = `<span id="hsIndigenous${regionCode}" style="font-size:16px;float:left; font-style: italic;">${ind}</span><span id="lsIndigenous${regionCode}" style="font-size:16px;float:right; font-style: italic;left:150px;position:absolute">${
        1000 - ind
      }</span>`;
    }
  };

  useEffect(() => {
    setLoading(true);
  }, [props.chartData]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className={`${styles.refineryLocale}`}>
        <span>{props.location.toUpperCase()}</span>
        <div className={`${styles.progressbarTerm}`}>
          <div className={`${styles.progressbarData}`}></div>{" "}
        </div>
      </div>
      {loading && chartData.length > 0 ? (
        chartData.map((data, index) => {
          // console.log(data);
          let regionStyle = data.region.replace(/\s/g, "").toLowerCase();
          // console.log(regionStyle);
          setTimeout(function () {
            renderProgressBar(
              data.regionCode,
              data.term_hs,
              data.spot_hs,
              data.indigenous_hs
            );
          }, 300);
          if (styles[regionStyle]) {
            return (
              <div
                key={index}
                className={`${styles[regionStyle]}`}
                id='progressBarSet'
              >
                <div className={`${styles.chartDataFont}`}>
                  {data ? data.overall_percentage + "%" : 0}
                </div>
                <div style={{ fontSize: "24px" }}>
                  {data ? data.region : ""}{" "}
                </div>

                <div
                  className={`${styles.progressbarTerm}`}
                  id={`termText${data.regionCode}`}
                >
                  <div
                    className={`${styles.progressbarData}`}
                    id={`progressbarDataForTerm${data.regionCode}`}
                  ></div>{" "}
                </div>

                <div
                  className={`${styles.progressbarSpot}`}
                  id={`spotText${data.regionCode}`}
                >
                  <div
                    className={`${styles.progressbarData}`}
                    id={`progressbarDataForSpot${data.regionCode}`}
                  ></div>
                </div>
                <div
                  className={`${styles.progressbarIndigenous}`}
                  id={`indText${data.regionCode}`}
                >
                  <div
                    className={`${styles.progressbarData}`}
                    id={`progressbarDataForIndigenous${data.regionCode}`}
                  ></div>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default ChartData;
