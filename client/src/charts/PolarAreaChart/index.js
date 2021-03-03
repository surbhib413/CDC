import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js";
import styles from "./PolarAreaChart.module.scss";
import _ from "lodash";

Chart.defaults.global.defaultFontFamily = "Titillium Web";
Chart.defaults.global.defaultColor = "#dee5ef";

function PolarAreaChart(props) {
  const chartContainer = useRef("polararea");
  const [chartInstance, setChartInstance] = useState(null);
  const [lastItem, setLastItem] = useState({});

  useEffect(() => {
    let actualArray = [];
    let targetArray = [];
    let res = [];
    let dateArr = [];

    // console.log("POLAR AREA CHART PROPS", props);
    function prepareGraphData(polarAreaData) {
      // console.log("polarAreaData ", polarAreaData);

      let finalData = _.orderBy(polarAreaData, ["entry_date"], ["asc"]);

      let lastItem = polarAreaData[polarAreaData.length - 1];
      lastItem && setLastItem(lastItem);

      finalData.forEach((el, index) => {
        let dateForChart = String(new Date(el["entry_date"]));
        res.push(dateForChart.split(" ")[1]);
      });

      res.forEach((el, index) => {
        if (index !== 0) {
          dateArr.push("");
        }
        dateArr.push(el);
      });
      dateArr.push("");

      finalData.forEach((item, index) => {
        if (index !== 0) {
          actualArray.push(null);
          targetArray.push(null);
        }
        actualArray.push(item.actual);
        targetArray.push(item.target);
      });
      actualArray.push(null);
      targetArray.push(null);

      let lenActualArr = actualArray.length;
      let diff = 24 - lenActualArr;
      for (let i = 0; i < diff; i++) {
        actualArray.push(null);
        targetArray.push(null);
      }
    }
    if (chartInstance) {
      chartInstance.destroy();
    }
    const ctx = chartContainer.current.getContext("2d");
    let lineColorTarget = "";
    let lineColorActual = "";
    prepareGraphData(props.graphData);
    // const chartOptions = {
    //   startAngle: -Math.PI / 1.81,
    //   legend: {
    //     position: "left"
    //   },
    //   cutoutPercentage: 0,
    //   responsive: true,
    //   maintainAspectRatio: false,
    //   tooltips: {
    //     enabled: false
    //   },
    //   scale: {
    //     angleLines: {
    //       display: false,
    //       color: "#67758d",
    //       borderDash: [2]
    //     },
    //     gridLines: {
    //       display: true,
    //       circular: true,
    //       color: "#67758d"
    //     },

    //     ticks: {
    //       backdropColor: "#141923",
    //       display: false
    //     },
    //     pointLabels: {
    //       display: true,
    //       fontSize: 20,
    //       fontColor: "#dee5ef"
    //     }
    //   },
    //   legend: {
    //     display: false
    //   }
    // };
    ////SET COLORS ACCORDING TO LOCATION
    if (props.location === "mumbai") {
      lineColorTarget = "rgb(31, 71, 172, 0.5)";
      lineColorActual = "#0897c9";
    }
    if (props.location === "kochi") {
      lineColorTarget = "rgb(222, 172, 245, 0.5)";
      lineColorActual = "#b76df1";
    }

    const chartConfig = {
      data: {
        color: "dee5ef",
        borderColor: "#dee5ef",
        labels: [
          "Apr",
          "",
          "May",
          "",
          "Jun",
          "",
          "Jul",
          "",
          "Aug",
          "",
          "Sep",
          "",
          "Oct",
          "",
          "Nov",
          "",
          "Dec",
          "",
          "Jan",
          "",
          "Feb",
          "",
          "Mar",
          ""
        ],
        datasets: [
          {
            borderAlign: "inner",
            borderWidth: 0,
            backgroundColor: lineColorTarget,
            datalabels: {
              display: false,
              // anchor: "end",
              // offset: 0,
              // align: "end",
              // color: "#dee5ef",
              // font: {
              //   size: 16
              // }
            },
            data: targetArray
          },
          {
            borderAlign: "inner",
            borderWidth: 0,
            backgroundColor: lineColorActual,
            datalabels: {
              anchor: "end",
              align: "start",
              color: "#dee5ef",
              offset: 0,
              font: {
                size: 16
              }
            },
            data: actualArray
          }
        ]
      },
      type: "polarArea",
      options: {
        startAngle: -Math.PI / 1.81,
        cutoutPercentage: 20,
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false
        },
        scale: {
          angleLines: {
            display: true,
            color: "#67758d",
            borderDash: [2]
          },
          gridLines: {
            display: true,
            circular: true,
            color: "#67758d"
          },
          ticks: {
            backdropColor: "#141923",
            display: false
          },
          pointLabels: {
            display: true,
            fontSize: 20,
            fontColor: "#dee5ef"
          }
        },
        legend: {
          display: false
        }
      }
    };
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [props.graphData, props.location]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.polarAreaChartContainer}`}>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.legendsContainer}`}
      >
        <div className={`${styles.leftLegend}`}>
          <div className={`d-flex align-items-center mt-1 ${styles.actual}`}>
            <span
              className={`mr-2 ${
                props.location === "mumbai"
                  ? styles.actualMumbaiDot
                  : styles.actualKochiDot
                }`}
            ></span>
            Actual: {lastItem.actual}
          </div>
          <div className={`d-flex align-items-center mt-3 ${styles.target}`}>
            <span
              className={`mr-2 ${
                props.location === "mumbai"
                  ? styles.targetMumbaiDot
                  : styles.targetKochiDot
                }`}
            ></span>
            Target: {lastItem.target}
          </div>
        </div>
      </div>
      <div className={`${styles.polarAreaChartContainer}`}>
        <canvas ref={chartContainer} height='432' width='432' />
      </div>
    </div>
  );
}
export default PolarAreaChart;
