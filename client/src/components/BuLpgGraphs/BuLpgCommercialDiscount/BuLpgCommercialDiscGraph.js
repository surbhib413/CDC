import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./BuLpgCommercialDiscGraph.module.scss";

function BuLpgCommercialDiscGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  
  useEffect(() => {
    let targetArray = [];
    let actualArray = [];
  
    function prepareGraphData(apiGraphData) {
      apiGraphData.forEach((item, index) => {
        actualArray.push(item.actual);
        targetArray.push(item.target);
      });
    }
    prepareGraphData(props.graphData);

    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");
    let gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(1, 'rgba(0, 168, 236)');
    gradient.addColorStop(0, 'rgba(0, 224, 188)');

    const chartConfig = {
      type: "bar",
      borderSkipped: "bottom",
      data: {
        barThickness: 100,
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [
          {
            barPercentage: 0.6,
            label: "Operating Point",
            data: actualArray,
            backgroundColor: gradient,
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
          // callbacks: {
          //     label: function (tooltipItem, data) {
          //         return data.datasets[tooltipItem.datasetIndex].label + ":";
          //     }
          //}
        }, annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 4,
            borderColor: 'white',
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
              //callback: function (value) { return value },
            },
          }],
        },
      }
    }

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);

      setChartInstance(newChartInstance);
    }
  }, [props.graphData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.grmGraph}`}>
      <canvas
        ref={chartContainer}
      />
    </div>
  )
}

export default BuLpgCommercialDiscGraph;