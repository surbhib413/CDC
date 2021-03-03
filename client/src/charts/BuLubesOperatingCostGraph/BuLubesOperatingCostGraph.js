import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./BuLubesOperatingCostGraph.module.scss";

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BuLubesOperatingCostGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  
  useEffect(() => {
    let plantArray = [];
    let othersArray = [];
    let cnfArray = [];
  
  
    const xLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
  
    function prepareGraphData(apiGraphData) {
      apiGraphData.forEach((item, index) => {
        plantArray.push(item.plant);
        othersArray.push(item.others);
        cnfArray.push(item.cnf);
      });
    }
    prepareGraphData(props.graphData);

    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");
    let cnfGradient = ctx.createLinearGradient(0, 0, 0, 500);
    cnfGradient.addColorStop(0, '#00a8ec');
    cnfGradient.addColorStop(1, '#00e0bc');

    let plantGradient = ctx.createLinearGradient(0, 0, 0, 500);
    plantGradient.addColorStop(0, '#00d3f7');
    plantGradient.addColorStop(1, '#00a8eb');

    let othersGradient = ctx.createLinearGradient(0, 0, 0, 500);
    othersGradient.addColorStop(0, '#ff91bf');
    othersGradient.addColorStop(1, '#ff588b');

    const chartConfig = {
      type: "bar",
      data: {
        labels: xLabels,
        datasets: [
          {
            label: "DP",
            data: cnfArray,
            categoryPercentage: 1,
            barPercentage: 0.6,
            backgroundColor: cnfGradient,
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
            label: "DP",
            data: plantArray,
            categoryPercentage: 1,
            barPercentage: 0.6,
            backgroundColor: plantGradient,
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
            label: "LP",
            data: othersArray,
            categoryPercentage: 1,
            barPercentage: 0.6,
            backgroundColor: othersGradient,
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
        ]
      },
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 30,
            bottom: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        annotation: {
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              type: 'category',
              display: true,
              offset: true,
              gridLines: {
                color: "#35425c",
                offsetGidLines: true,
                tickMarkLength: 0,
                borderDash: [3],
                lineWidth: 3,
                zeroLineBorderDash: [3]
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
              stacked: true,
              ticks: {
                display: true,
                padding: 20,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
              gridLines: {
                color: "#35425c",
                tickMarkLength: 0,
                zeroLineColor: "#35425c",
                zeroLineWidth: 1,
                lineWidth: 3
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
  }, [chartContainer, props.graphData, props.staffCostVar, props.allVar, props.rmVar, props.rentalVar, props.thirdPartyVar, props.salesProVar, props.othersVar])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.grmGraph}`}>
      <canvas
        ref={chartContainer}
      />
    </div>
  )
}
export default BuLubesOperatingCostGraph;