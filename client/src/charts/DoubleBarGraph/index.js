import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import styles from "./DoubleBarGraph.module.scss";

Chart.defaults.global.defaultFontFamily = "Titillium Web";


function GrmBarGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy()
    }
    const ctx = chartContainer.current.getContext("2d");
    // let orangeGradient = ctx.createLinearGradient(0, 0, 0, 400);
    // orangeGradient.addColorStop(0, '#f37021');
    // orangeGradient.addColorStop(1, '#ecb22e');

    const chartConfig = {
      type: "bar",
      borderSkipped: "bottom",
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            // clip: {left: 50},
            label: "Mumbai Target",
            backgroundColor: 'rgb(37, 206, 218, 0.4)',
            categoryPercentage: 0.7,
            barPercentage: 1,
            // borderWidth: 1,
            data: [79, 78, 90, 89, 80, 70, 50, 40, 30],
            xAxisID: "bar-x-axis1",
            yAxisID: "bar-y-axis1",
            // stack: 1
          },
          {
            label: "Mumbai Actual",
            categoryPercentage: 0.7,
              barPercentage: 0.2,
            data: [56, 45, 56, 67, 70, 65, 40, 35],
            backgroundColor: "#23ced3",
            xAxisID: "bar-x-axis2",
            yAxisID: "bar-y-axis2",
            // stack: 2
          },
          {
            label: "Mumbai Target",
            backgroundColor: 'rgb(142, 96, 221, 0.4)',
            // borderWidth: 1,
            data: [70, 73, 90, 83, 87, 70, 60, 40, 30],
            categoryPercentage: 0.7,
            barPercentage: 1,
            xAxisID: "bar-x-axis1",
            yAxisID: "bar-y-axis1",
            // stack: 1
          },
          {
            label: "Mumbai Actual",
            data: [56, 45, 56, 67, 70, 65, 40, 35, 30, 35, 40],
            backgroundColor: "#aa7ef1",
            categoryPercentage: 0.7,
              barPercentage: 0.2,
            xAxisID: "bar-x-axis2",
            yAxisID: "bar-y-axis2",
            // stack: 2
          },
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              display: true,
              // stacked: true,
              offset: true,
              id: "bar-x-axis1",
              // barThickness: 15,
              type: 'category',
              gridLines: {
                // display: false,
                color: "#67758d",
                borderDash: [2],
                offsetGridLines: true
              },
              ticks: {
                // padding: 10,
                fontColor: "#dee5ef",
                fontSize: "22",
                // beginAtZero: true,
              },
            },
            {
              display: false,
              offset: true,
              // stacked: true,
              id: "bar-x-axis2",
              // barThickness: 5,
              type: 'category',
              // gridLines: {
              //   color: "#67758d",
              //   offsetGridLines: true,
              //   borderDash: [2],
              // },
              // ticks: {
              //   padding: 20,
              //   fontColor: "#dee5ef",
              //   fontSize: "22",
              //   // beginAtZero: true,
              // },
            }],

          yAxes: [{
            id: "bar-y-axis1",
            // stacked: false,
            ticks: {
              // padding: 20,
              fontColor: "#dee5ef",
              fontSize: "22",
              // beginAtZero: true,
              // max: 100
            },
            gridLines: {
              color: "#67758d"
            }
          },
          {
            id: "bar-y-axis2",
            display: false,
            // stacked: false,
            // ticks: {
            //   padding: 20,
            //   fontColor: "#dee5ef",
            //   fontSize: "22",
            //   beginAtZero: true,
            //   max: 100
            // },
          }]

        },
        legend: {
          display: false
          // labels: {
          // boxWidth: 2,
          // fontSize: 12,
          // fontColor: "#23ced3",

          // }
        }
      }
    }
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, []);
  return (
    <div className={`${styles.canvasContainer}`}>
      <canvas
        ref={chartContainer}
      />
    </div>
  )
}
export default GrmBarGraph;