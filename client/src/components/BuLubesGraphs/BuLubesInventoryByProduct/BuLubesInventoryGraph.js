import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js";
import "chartjs-plugin-datalabels";
import styles from "./BuLubesInventoryGraph.module.scss";

function BuLubesInventoryGraph(props) {
  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);
  // let dataset = [{}];
  
  useEffect(() => {
    let aboveTargetArray = [];
    let belowTargetArray = [];
    let productNames = [];
  
    const prepareGraphData = (graphData) => {
      graphData.forEach((item, index) => {
        aboveTargetArray.push(item.above_target);
        belowTargetArray.push(item.below_target);
        productNames.push(item.product);
        return;
      });
    }
    prepareGraphData(props.graphData);
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");
    let chartConfig = {
      type: 'horizontalBar',
      data: {
        labels: productNames,
        datasets: [
          {
            label: "Above Target",
            backgroundColor: "rgba(101, 206, 58, 0.5)",
            data: aboveTargetArray,
            categoryPercentage: 1,
            barPercentage: 0.6,
            datalabels: {
              anchor: "end",
              align: 'start',
              offset: 5,
              font: {
                size: 25,
              },
              color: "white"
            }
          },
          {
            label: "Below Target",
            backgroundColor: "rgba(230, 0, 0, 0.5)",
            data: belowTargetArray,
            categoryPercentage: 1,
            barPercentage: 0.6,
            datalabels: {
              anchor: "start",
              align: 'end',
              offset: 5,
              font: {
                size: 25,
              },
              color: "white"
            }
          }
        ],
      },
      options: {
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 20
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              ticks: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              ticks: {
                padding: 9,
                fontColor: "white",
                fontSize: "20",
              }

            }
          ]
        },
      },
      plugins: [{
        afterUpdate: function (chart) {
          // console.log(chart)
          for (let i in chart.config.data.datasets) {
            let dataset = chart.config.data.datasets[i];
            if (dataset.label === "Above Target") {
              for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
                let model = chart.getDatasetMeta(i).data[j]._model;
                let start = model.x;
                let end = model.x;
                // let height = model.height;
                let gradient = ctx.createLinearGradient(start + 10, 0, end - 400, 0);
                // let gradient = ctx.createLinearGradient(startX, startY, startX+400, startY);
                gradient.addColorStop(0, 'rgb(101, 206, 58, 0.5)');
                gradient.addColorStop(1, 'rgba(180, 236, 81, 0.5)');
                model.backgroundColor = gradient;
              }
            }
            else {
              for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
                let model = chart.getDatasetMeta(i).data[j]._model;
                let start = model.x;
                let end = model.x;
                // let height = model.height;
                let gradient = ctx.createLinearGradient(start + 100, 0, end - 300, 0);
                // let gradient = ctx.createLinearGradient(startX, startY, startX+400, startY);
                gradient.addColorStop(0, 'rgba(230, 0, 0, 0.5)');
                gradient.addColorStop(1, 'rgba(255, 81, 58, 0.5)');
                model.backgroundColor = gradient;
              }
            }
          }
        }
      }]
    };

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.graphData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.grmGraph}`}>
      <canvas
        ref={chartContainer}
      />
    </div>
  );
}

export default BuLubesInventoryGraph;
