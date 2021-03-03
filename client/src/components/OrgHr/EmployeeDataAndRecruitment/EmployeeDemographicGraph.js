import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js";
import "chartjs-plugin-datalabels";

const EmployeeDemographicGraph = (props) => {
  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);
  // let dataset = [{}];
  // let aboveTargetArray = [];
  // let belowTargetArray = [];
  // let productNames = [];

  // const prepareGraphData = (graphData) => {
  //   graphData.map((item, index) => {
  //     aboveTargetArray.push(item.above_target);
  //     belowTargetArray.push(item.below_target);
  //     productNames.push(item.product);
  //     return;
  //   });
  // }

  useEffect(() => {
    // prepareGraphData(props.graphData);
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");
    let chartConfig = {
      type: 'horizontalBar',
      data: {
        // labels: productNames,
        labels: ["BU 1", "BU 2", "BU 3", "BU 4", "BU 5", "BU 6",],
        datasets: [
          {
            label: "Cadre 1",
            backgroundColor: "#8affb2",
            data: [150, 150, 150, 150, 150, 150],
            // data: aboveTargetArray,
            categoryPercentage: 1,
            barPercentage: 0.2,
            datalabels: {
              display: false
            }
          },
          {
            label: "Cadre 2",
            backgroundColor: "#00ebff",
            data: [200, 200, 200, 200, 200, 200],
            // data: belowTargetArray,
            categoryPercentage: 1,
            barPercentage: 0.2,
            datalabels: {
              display: false
            }
          },
          {
            label: "Cadre 3",
            backgroundColor: "#00abff",
            data: [150, 150, 150, 150, 150, 150],
            // data: belowTargetArray,
            categoryPercentage: 1,
            barPercentage: 0.2,
            datalabels: {
              display: false
            }
          }

        ],
      },
      options: {
        legend: {
          display: false,
          // align: "start",
          // labels: {
          //   fontSize: 22,
          //   fontColor: "#8fa9db",
          //   boxWidth: 24
          // }
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
                fontColor: "#dee5ef",
                fontSize: "22",
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
                padding: 5,
                fontColor: "#dee5ef",
                fontSize: "22",
              }

            }
          ]
        },
      },
    };

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.graphData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={chartContainer}
    />
  );
}

export default EmployeeDemographicGraph;
