import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./GrmGraph.module.scss";
import { inrFormat, usdFormat } from "../../../utility/utility"

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function GrmGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  const [lastItem, setLastItem] = useState({});
  
  useEffect(() => {
    let actualArray = [];
    let targetArray = [];
    let targetLabelArray = [];
  
    const xLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
    let xTicks = [];
  
    function prepareGraphData(apiGraphData) {
      // console.log("CURRENT API DATA",apiGraphData)
      apiGraphData.forEach((item, index) => {
        actualArray.push(item.actual);
        targetArray.push(item.target);
        // targetArray.push(((item.target - item.actual) < 0) ? 0 : (item.target - item.actual));
        targetLabelArray.push(item.target)
      })
      xTicks = xLabels.slice(0, apiGraphData.length)
      let lastItem = apiGraphData[apiGraphData.length - 1]
      lastItem && setLastItem(lastItem);
    }

    prepareGraphData(props.graphData);

    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");
    let gradientMumbai = ctx.createLinearGradient(0, 0, 0, 500);
    gradientMumbai.addColorStop(1, '#1f47ac');
    gradientMumbai.addColorStop(0, '#0897c9');

    let gradientKochi = ctx.createLinearGradient(0, 0, 0, 500);
    gradientKochi.addColorStop(0, '#9150c8');
    gradientKochi.addColorStop(1, '#28104e');

    let gradientGrm = ""
    let targetBackgroundColor = "";

    ////SET COLORS ACCORDING TO LOCATION
    if (props.location === "mumbai") {
      gradientGrm = gradientMumbai;
      targetBackgroundColor = "rgb(13, 105, 172, 0.4)";
    }
    if (props.location === "kochi") {
      gradientGrm = gradientKochi
      targetBackgroundColor = "rgb(98, 55, 160, 0.4)";
    }

    const chartConfig = {
      type: "bar",
      data: {
        labels: xTicks,
        datasets: [
          {
            xAxisID: "bar-x-axis1",
            label: "Actual",
            data: actualArray,
            categoryPercentage: 1,
            barPercentage: 0.2,
            backgroundColor: gradientGrm,
            borderWidth: 0,
            datalabels: {
              anchor: "end",
              align: 'start',
              color: "#dee5ef",
              font: {
                size: 20
              }
            },
          },
          {
            xAxisID: "bar-x-axis2",
            label: "Target",
            backgroundColor: targetBackgroundColor,
            categoryPercentage: 0.7,
            data: targetArray,
            borderWidth: 0,
            pointRadius: 0,
            datalabels: {
              display: false,
              // formatter: function (value, context) {
              //   return value > 0 ? targetLabelArray[context.dataIndex] : ""
              // },
              // anchor: "end",
              // align: 'end',
              // offset: 0,
              // color: "rgb(161, 173, 187)",
              // font: {
              //   size: 20
              // }
            },
          },
        ]
      },
      options: {
        // barRoundness: 1,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'category',

              display: true,
              offset: true,
              id: "bar-x-axis1",

              gridLines: {
                color: "transparent",
                offsetGidLines: true,
                tickMarkLength: 0,
                borderDash: [3],
              },
              ticks: {
                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "22",
              },
            },
            {
              display: false,
              offset: true,
              id: "bar-x-axis2",
              type: 'category',

              gridLines: {
                color: "transparent",
                offsetGidLines: true,
                tickMarkLength: 0,
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
            beginAtZero: true,
            ticks: {
              beginAtZero: true,
              display: false,
              padding: 20,
              fontColor: "#dee5ef",
              fontSize: "20",
            },
            gridLines: {
              color: "transparent",
              tickMarkLength: 0,
              zeroLineColor: "#67758d",
              zeroLineWidth: 1
            }
          },
          ]
        },
        legend: {
          display: false
        },
      }
    }

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.graphData, props.location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`flex-grow-1 ${styles.graphContainer}`}>
      <div className={`d-flex justify-content-between align-items-center ${styles.legendsContainer}`}>
        <div className={`${styles.leftLegend}`} >
          <div className={`d-flex align-items-center mt-1 ${styles.actual}`}>
            <span className={`mr-2 ${props.location === "mumbai" ? styles.actualMumbaiDot : styles.actualKochiDot}`} ></span>
            Actual: {` ${lastItem.unit === "USD/barrel" ? usdFormat(lastItem.actual) : inrFormat(lastItem.actual)}`} {lastItem.unit === "USD/barrel" ? " per bbl" : "Cr"}
          </div>
          <div className={`d-flex align-items-center mt-3 ${styles.target}`}>
            <span className={`mr-2 ${props.location === "mumbai" ? styles.targetMumbaiDot : styles.targetKochiDot}`} ></span>

            Target: {` ${lastItem.unit === "USD/barrel" ? usdFormat(lastItem.target) : inrFormat(lastItem.target)}`} {lastItem.unit === "USD/barrel" ? " per bbl" : "Cr"}
          </div>
        </div>
      </div>

      <div className={`${styles.grmGraph}`}>
        <canvas
          ref={chartContainer}
        />
      </div>
    </div>
  )
}
export default GrmGraph;