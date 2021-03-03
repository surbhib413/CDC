import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./LubesLossGainAnalysisGraph.module.scss";


Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BuLpgCustPopulationGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);
  
  useEffect(() => {
    let blendingArray = [];
    let bulkMaterialArray = [];
    let financialGoodsArray = [];
    let packingMaterailArray = [];
    let xTicks = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
  
    const prepareGraphData = (apiGraphData) => {
      apiGraphData.forEach((item, index) => {
        blendingArray.push(item.blending);
        bulkMaterialArray.push(item.bulk_material);
        financialGoodsArray.push(item.financial_goods);
        packingMaterailArray.push(item.packaging_material)
      });
    }
    prepareGraphData(props.graphData);
    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");
    let blendingGradient = ctx.createLinearGradient(0, 0, 0, 20);
    blendingGradient.addColorStop(0, '#00a8ec');
    blendingGradient.addColorStop(1, '#00e0bc');

    let bulkGradient = ctx.createLinearGradient(0, 0, 0, 20);
    bulkGradient.addColorStop(0, '#fde093');
    bulkGradient.addColorStop(1, '#fabd5a');

    let financialGradient = ctx.createLinearGradient(0, 0, 0, 20);
    financialGradient.addColorStop(0, '#ff91bf');
    financialGradient.addColorStop(1, '#ff588b');

    let packingGradient = ctx.createLinearGradient(0, 0, 0, 20);
    packingGradient.addColorStop(0, '#b4ec51');
    packingGradient.addColorStop(1, '#65ce3a');

    const chartConfig = {
      type: "line",
      data: {
        // fill: false,
        labels: xTicks,
        datasets: [
          {
            fill: false,
            label: "Target",
            data: blendingArray,
            pointRadius: 5,
            pointBorderWidth: 0,
            pointBackgroundColor: blendingGradient,
            // pointBorderColor: "#ff588b",
            borderColor: "rgba(0, 199, 236,0.5)",
            borderWidth: 4,
            //             pointBackgroundColor: ["#ff588b", "#ff588b", "white", "#ff588b", "#ff588b", "#ff588b", "#ff588b", "#ff588b", "#ff588b", "#ff588b", "#ff588b", "#ff588b"],
            //             pointBorderColor: ["#ff588b", "#ff588b", "white", "#ff588b", "#ff588b", "#ff588b", "#ff588b", "#ff588b", "#ff588b", "#ff588b", "#ff588b", "#ff588b"],
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
            fill: false,
            label: "Target",
            data: bulkMaterialArray,
            pointRadius: 5,
            pointBorderWidth: 0,
            pointBackgroundColor: bulkGradient,
            // pointBorderColor: "#fabd5a",
            borderColor: "rgba(255, 191, 69, 0.5)",
            borderWidth: 4,
            //borderDash: [4],
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
            fill: false,
            label: "Target",
            data: financialGoodsArray,
            pointRadius: 5,
            pointBorderWidth: 0,
            pointBackgroundColor: financialGradient,
            // pointBorderColor: gradient,
            borderColor: "rgba(255, 88, 139, 0.5)",
            // backgroundColor: gradient,
            borderWidth: 4,
            datalabels: {
              display: false,
            },
          },
          {
            fill: false,
            label: "Target",
            data: packingMaterailArray,
            pointRadius: 5,
            pointBorderWidth: 0,
            pointBackgroundColor: packingGradient,
            // pointBorderColor: gradient,
            borderColor: "rgba(101, 206, 58,0.5)",
            // backgroundColor: gradient,
            borderWidth: 4,
            datalabels: {
              display: false,
            },
          },
        ]
      },
      options: {
        elements: {
          line: {
            tension: 0
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
                // zeroLineBorderDash: [3],
                // zeroLineColor: "#67758d",
                // zeroLineWidth: 1,
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
              display: true,
              padding: 20,
              fontColor: "#dee5ef",
              fontSize: "20",
            },
            gridLines: {
              color: "#67758d",
              offsetGidLines: true,
              tickMarkLength: 0,
              // zeroLineBorderDash: [3],
              zeroLineColor: "#67758d",
              zeroLineWidth: 1,
              // borderDash: [3],
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
  }, [props.graphData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.grmGraph}`}>
      <canvas
        ref={chartContainer}
      />
    </div>
  )
}
export default BuLpgCustPopulationGraph;