import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import { getColor } from '../../utility/utility';

// import { managerData, nationalAverageData, yearLabels } from "../mockData";
//import styles from "./LineGraph.module.scss";


Chart.defaults.global.elements.line.tension = 0;
Chart.defaults.global.defaultFontFamily = "Titillium Web";

function LineGraph(props) {

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const chartConfig = {
    type: "line",
    data: {
      labels: props.graphData.labels,
      datasets: [
        {
          borderWidth: 4,
          borderColor: "#009fff",
          label: "Turnover",
          data: props.graphData.target,
          fill: false,
          datalabels:{
            display: false
          }
        },
        {
          borderWidth: 4,
          borderColor: getColor(props.latestQuaterData.rating),
          label: "Turnover",
          data: props.graphData.data,
          fill: false,
          datalabels:{
            display: false
          }
        },
      ]
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      tooltips: {
        mode: 'label',
      },
      scales: {
        // gridLines: {
        //   drawBorder: true,

        // },
        xAxes: [{
          // scaleLabel:{
          //   display: true
          // },
          ticks: {
            padding: 20,
            beginAtZero: true,
            fontColor: "#dee5ef",
            fontSize: "22",
          },
          gridLines: {
            borderDashOffset: [1],
            display: true,
            color: "#67758d",
            tickMarkLength: 0
          }
        }],
        yAxes: [{
          gridLines: {
            display: true,
            color: "#67758d",
            tickMarkLength: 0
          },
          ticks: {
            padding: 20,
            fontColor: "#dee5ef",
            fontSize: "22",
            //callback: function (value) { return value + " " + props.latestQuaterData.unit },
            callback: function (value) { return value },
          },
        }]
      },
      elements: {
        line: {
          fill: false
        }
      },
    }
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.graphData]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <canvas
      ref={chartContainer} height=""
    />
  )
}
export default LineGraph;