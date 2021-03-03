import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
// import styles from "./BarGraph.module.scss";
// import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { getGradient0, getGradient1 } from "../../utility/utility";

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BarGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);
  function getData() {
    // console.log("MOU............",props.graphData.data);
    return props.graphData.data;
  }

  function setBackgroundGradient(ctx) {
    const gradientTempArray = []
    props.kpiDetails.forEach((item, index) => {
      let barGradient = ctx.createLinearGradient(0, 0, 0, 600);
      barGradient.addColorStop(0, getGradient0(item.rating));
      barGradient.addColorStop(1, getGradient1(item.rating));
      gradientTempArray.push(barGradient)
    })
    if (props.kpiListData.title.trim() === 'Mandatory Kpis') {
      gradientTempArray.shift();
    }
    return gradientTempArray;
  }


  useEffect(() => {
    const ctx = chartContainer.current.getContext("2d");
    const gradientArray = setBackgroundGradient(ctx);

    const chartConfig = {
      type: "bar",
      borderSkipped: "bottom",
      data: {
        barThickness: 100,
        labels: props.graphData.labels,
        datasets: [
          {
            barPercentage: 0.6,
            label: "Operating Point",
            data: props.graphData.data && getData(),
            // data: getData(),
            backgroundColor: gradientArray,
            datalabels: {
              display: false
            }
          },
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          mode: 'label',
          callbacks: {
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].label + ":";
            }
          }
        }, annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: props.latestQuaterData.target,
            borderColor: '#009fff',
            borderWidth: 2,
            label: {
              enabled: true,
              content: ''
            }
          }]
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              offsetGridLines: true,
              color: "#67758d",
              tickMarkLength: 0
            },
            ticks: {
              padding: 20,
              fontColor: "#dee5ef",
              fontSize: "22",
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
              beginAtZero: true,
              //callback: function (value) { return value.toFixed(1)},
              callback: function (value) { return value },
            },
          }],
        },
      }
    }

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);

      setChartInstance(newChartInstance);
    }
  }, [props.graphData.data]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <canvas
      ref={chartContainer}
    />
  )
}
export default BarGraph;