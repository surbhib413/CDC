import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import styles from "./BuRetailOutletGraph.module.scss";

function BuRetailOutletGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  
  useEffect(() => {
    let actualArray = [];
    let targetArray = [];
  
    function prepareGraphData(apiGraphData) {
      apiGraphData.forEach((item, index) => {
        actualArray.push(item.nro_actual_sales);
        actualArray.push(item.loyalty_actual_sales);
        targetArray.push(item.nro_target_sales);
        targetArray.push(item.loyalty_target_sales);
      });
  
    }
    prepareGraphData(props.graphData);

    if (chartInstance) {
      chartInstance.destroy()
    }
    const ctx = chartContainer.current.getContext("2d");
    const chartConfig = {
      type: "horizontalBar",
      data: {
        labels: ["Apr", "May"],
        datasets: [
          {
            yAxisID: "bar-x-axis1",
            categoryPercentage: 0.7,
            barPercentage: 0.4,
            label: "Actual",
            backgroundColor: ["#ff588c", "#00e0bc"],
            data: actualArray,
            //data: actualArray,
            borderWidth: 0,
            datalabels: {
              //display:false,
              anchor: "end",
              align: 'start',
              color: "white",
              font: {
                size: 20
              },
              formatter: function (value, context) {
                return value + "TKL";
              }
            },
          },
          {
            yAxisID: "bar-x-axis2",
            label: "Target",
            data: targetArray,
            categoryPercentage: 0.6,
            backgroundColor: "#2f3b51",
            borderWidth: 0,
            datalabels: {
              anchor: "end",
              align: 'end',
              color: "#dee5ef",
              font: {
                size: 20,
              },
              formatter: function (value, context) {
                return value + " TKL";
              }
            },
          },
        ]
      },
      options: {
        layout: {
          padding: {
            right: 100,
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: true,
              beginAtZero: true,
              ticks: {
                beginAtZero: true,
                display: false,
                padding: 20,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
              gridLines: {
                display: false,
                color: "grey",
                drawBorder: true,
                tickMarkLength: 0,
                borderDash: [3],
              }
            },
          ],

          yAxes: [
            {
              id: "bar-x-axis1",
              beginAtZero: true,
              display: true,
              offset: true,
              type: 'category',
              gridLines: {
                display: false,
                color: "grey",
                tickMarkLength: 0,
              },
              ticks: {
                display: false,
                padding: 20,
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
                display: false,
                color: "grey",
              },
              ticks: {
                display: false,
                padding: 20,
                fontColor: "#dee5ef",
                fontSize: "22",
              },
            },
          ]

        },
        legend: {
          display: false
        }
      },
      plugins: [{

        afterUpdate: function (chart) {
          let actualColor = ['rgb(250, 193, 89)', 'rgb(0, 224, 188)'];
          let targetColor = ['rgb(255, 88, 140)', 'rgb(0, 168, 236)'];
          let actualColorArray = ['rgba(250, 193, 89,0.3)', 'rgba(0, 224, 188,0.3)'];
          let targetColorArray = ['rgba(255, 88, 140,0.3)', 'rgba(0, 168, 236,0.3)'];

          for (let i in chart.config.data.datasets) {
            let dataset = chart.config.data.datasets[i];
            if (dataset.label === "Actual") {
              for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
                let model = chart.getDatasetMeta(i).data[j]._model;
                let start = model.x;
                // let end = model.x + dataset.data[0];
                let end = model.x;
                let gradient = ctx.createLinearGradient(start + 10, 0, end - 400, 0);
                gradient.addColorStop(1, actualColor[j]);
                gradient.addColorStop(0, targetColor[j]);
                model.backgroundColor = gradient;
              }
            }
            else {
              for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
                let model = chart.getDatasetMeta(i).data[j]._model;
                let start = model.x;
                let end = model.x;

                let gradient = ctx.createLinearGradient(start + 100, 0, end - 300, 0);
                gradient.addColorStop(1, actualColorArray[j]);
                gradient.addColorStop(0, targetColorArray[j]);
                model.backgroundColor = gradient;
              }
            }
          }
        }
      }]

    }
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.graphData]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className={`${styles.grmGraph}`}>
      <canvas ref={chartContainer} />
    </div>
  )
}

export default BuRetailOutletGraph;