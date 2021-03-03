import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
// import 'chartjs-plugin-datalabels';
import styles from "./CracksGraph.module.scss";
// import {inrFormat, usdFormat} from "../../utility/utility"

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function CracksGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  const xLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
  useEffect(() => {
   
    // prepareGraphData(props.graphData);

    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");
    let targetColor = "";
    let actualColor = "";

    //SET COLORS ACCORDING TO LOCATION
    if (props.location === "mumbai") {
      targetColor = "#02d345";//green
      actualColor = "#06bee1";//blue
    }
    if (props.location === "kochi") {
      targetColor = "#e640b7";//pink
      actualColor = "#b76df1";//purple
    }

    const chartConfig = {
      type: "line",
      data: {
        labels: xLabels,
        datasets: [
          {
            label: "Target",
            fill: false,
            data: [10, 40, 23, 37, 39, 47, 78, 57, 50, 100, 80, 120],
            pointBorderWidth: 4,
            backgroundColor: targetColor,
            pointBorderColor: targetColor,
            borderColor: targetColor,
            borderWidth: 4,
            borderDash: [4],
            datalabels: {
              align: 'bottom',
              color: "rgb(161, 173, 187)",
              font: {
                size: 20
              }
            },
          },
          {
            label: "Actual",
            fill: false,
            data: [10, 40, 70, 50, 90, 40, 60, 80, 50, 57, 70, 60],
            pointBorderWidth: 4,
            pointBackgroundColor: actualColor,
            pointBorderColor: actualColor,
            borderColor: actualColor,
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                color: "#2f3b51",
                offsetGidLines: true,
                tickMarkLength: 0,
              },
              ticks: {
                display: true,
                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
            },
          ],

          yAxes: [
            {
              beginAtZero: true,
              ticks: {
             //   min: 54,
             //   max: 62,
             //   stepSize: 2,
                
                
               beginAtZero: true,
                display: true,
                padding: 20,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
              gridLines: {
                color: "#2f3b51",
                tickMarkLength: 0,
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
  }, [chartContainer, props.location]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.grmGraph}`}>
      <canvas
        ref={chartContainer}
      />
    </div>
  )
}
export default CracksGraph;
