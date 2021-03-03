import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./RefinaryOperatingCostGraph.module.scss";
import {inrFormat, usdFormat} from "../../../utility/utility"


Chart.defaults.global.defaultFontFamily = "Titillium Web";

function RefinaryOperatingCostGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  const [lastItem, setLastItem] = useState({});
  
  useEffect(() => {
    let actualArray = []
    let targetArray = []
  
    const xLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
    let xTicks = [];
  
  
    function prepareGraphData(apiGraphData) {
      apiGraphData.forEach((item, index) => {
        actualArray.push(item.actual);
        targetArray.push(item.target);
      })
      xTicks = xLabels.slice(0, apiGraphData.length)
      let lastItem = apiGraphData[apiGraphData.length - 1]
      lastItem && setLastItem(lastItem);
    }
    if (chartInstance) {
      chartInstance.destroy()
    }
    prepareGraphData(props.graphData);

    const ctx = chartContainer.current.getContext("2d");

    let lineColorTarget = ""
    let lineColorActual = ""
    ////SET COLORS ACCORDING TO LOCATION
    if (props.location === "mumbai") {
      lineColorTarget = "rgba(90, 195, 243, 0.5)";
      lineColorActual = "rgb(0, 190, 225)";
    }
    if (props.location === "kochi") {
      lineColorTarget = "rgb(222, 172, 245, 0.5)"
      lineColorActual = "#b76df1";

    }

    const chartConfig = {
      type: "line",
      data: {
        fill: false,
        labels: xTicks,
        datasets: [
          {
            label: "Target",
            data: targetArray,
            pointBorderWidth: 4,
            pointBackgroundColor: lineColorTarget,
            pointBorderColor: lineColorTarget,
            borderColor: lineColorTarget,
            borderWidth: 4,
            borderDash: [4],
            datalabels: {
              display: false,
              // align: 'bottom',
              // color: "rgb(161, 173, 187)",
              // font: {
              //   size: 20
              // }
            },
          },
          {
            label: "Actual",
            data: actualArray,
            pointBorderWidth: 4,
            pointBackgroundColor: lineColorActual,
            pointBorderColor: lineColorActual,
            borderColor: lineColorActual,
            borderWidth: 3,
            datalabels: {
              align: 'top',
              color: "#dee5ef",
              font: {
                size: 20
              }
            },
          },
        ]
      },
      options: {
        elements: {
          line: {
            tension: 0.4
          }
        },
        layout: {
          padding: {
            top: 30,
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'category',
              gridLines: {
                color: "#67758d",
                offsetGidLines: true,
                tickMarkLength: 0,
                zeroLineBorderDash: [3],
                zeroLineColor: "#67758d",
                zeroLineWidth: 1,
                borderDash: [3],
              },
              ticks: {
                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "22",
              },
            },
          ],

          yAxes: [{
            ticks: {
              display: false,
              padding: 20,
              fontColor: "#dee5ef",
              fontSize: "20",
            },
            gridLines: {
              tickMarkLength: 0,
              color: "transparent",
              zeroLineColor: "#67758d",
              zeroLineWidth: 2
            }
          },
          ]

        },
        legend: {
          display: false
        }
      }
    }
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [props.graphData, props.location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`flex-grow-1 ${styles.graphContainer}`}>
      <div className={`d-flex justify-content-between align-items-center ${styles.legendsContainer}`}>
        <div className={`${styles.leftLegend}`}>
          <div className={`d-flex align-items-center mt-1 ${styles.actual}`}>
            <span className={`mr-2 ${props.location === "mumbai" ? styles.actualMumbaiDot : styles.actualKochiDot}`} ></span>
            {/* Actual: {` ${lastItem.unit === "USD/barrel" ? usdFormat(lastItem.actual) : inrFormat(lastItem.actual)} / bbl`} */}
            Actual: {` ${lastItem.unit === "USD/barrel" ? usdFormat(lastItem.actual) : inrFormat(lastItem.actual)}`} {lastItem.unit === "USD/barrel"? " per bbl" : "Cr"}

          </div>
          <div className={`d-flex align-items-center mt-3 ${styles.target}`}>
            <span className={`mr-2 ${props.location === "mumbai" ? styles.targetMumbaiDot : styles.targetKochiDot}`} ></span>
            {/* Target: {` ${lastItem.unit === "USD/barrel" ? usdFormat(lastItem.target) : inrFormat(lastItem.target)} / bbl`} */}
            Target: {` ${lastItem.unit === "USD/barrel" ? usdFormat(lastItem.target) : inrFormat(lastItem.target)}`} {lastItem.unit === "USD/barrel"? " per bbl" : "Cr"}

          </div>
        </div>
      </div>

      <div className={`${styles.OperatingCostGraph}`}>
        <canvas
          ref={chartContainer}
        />
      </div>
    </div>
  )
}
export default RefinaryOperatingCostGraph;