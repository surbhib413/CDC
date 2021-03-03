import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js";
import "chartjs-plugin-datalabels";
import styles from "./AtfCustomerGrowthGraph.module.scss";

function BuLubesInventoryGraph(props) {
  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);
  
  
  useEffect(() => {
    let prevYearArray = [];
    let currYearArray = [];
    let companyNames = [];
    let growthArray = [];
    let growthColor = [];
  
    const prepareGraphData = (graphData) => {
      graphData.forEach((item, index) => {
        prevYearArray.push(item.prev_year);
        companyNames.push(item.company_name);
        if(item.curr_year < item.prev_year){
          currYearArray.push(item.curr_year);
          growthArray.push(item.prev_year - item.curr_year)
          growthColor.push("#e13219")
        } else {
          currYearArray.push(item.prev_year);
          growthArray.push(item.curr_year - item.prev_year)
          growthColor.push("#74ce12")
        }
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
        // labels: ["Air India", "Spice Jet", "Vistara", "Indigo", "Indigo", "Indigo", "Lufthansa", "British Airways", "Indigo", "Indigo"],
        labels: companyNames,
        datasets: [
          {
            label: "Last Year",
            stack: "Stack 1",
            backgroundColor: "rgba(0, 168, 236, 0.3)",
            // data: [5500, 5200, 5100, 5000, 4692, 4312, 4116, 4182, 3920, 2940],
            data:prevYearArray,
            barThickness: 15,
            datalabels: {
              display: false
            }
          },
          {
            label: "Current Year",
            stack: "Stack 2",
            backgroundColor: "rgba(0, 168, 236, 0.65)",
            data:currYearArray,
            // data: [5390, 5096, 5000, 4900, 4600, 4400, 4200, 4100, 4000, 3000],
            barThickness: 15,
            datalabels: {
              display: false
            }
          },
          {
            label: "Gain/Loss",
            stack: "Stack 2",
            backgroundColor: growthColor, 
            data: growthArray,
            // backgroundColor: ["#74ce12","#74ce12","#e13219", "#74ce12","#e13219","#74ce12","#74ce12","#e13219","#74ce12","#74ce12"],
            // data: [110, 104, 100, 100, 92, 88, 84, 82, 80, 60],
            // categoryPercentage: 1,
            // barPercentage: 1,
            barThickness: 15,
            datalabels: {
              display: false,
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
      // plugins: [{
      //   afterUpdate: function (chart) {
      //     // console.log(chart)
      //     for (let i in chart.config.data.datasets) {
      //       let dataset = chart.config.data.datasets[i];
      //       if (dataset.label === "Above Target") {
      //         for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
      //           let model = chart.getDatasetMeta(i).data[j]._model;
      //           let start = model.x;
      //           let end = model.x;
      //           // let height = model.height;
      //           let gradient = ctx.createLinearGradient(start + 10, 0, end - 400, 0);
      //           // let gradient = ctx.createLinearGradient(startX, startY, startX+400, startY);
      //           gradient.addColorStop(0, 'rgb(101, 206, 58, 0.5)');
      //           gradient.addColorStop(1, 'rgba(180, 236, 81, 0.5)');
      //           model.backgroundColor = gradient;
      //         }
      //       }
      //       else {
      //         for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
      //           let model = chart.getDatasetMeta(i).data[j]._model;
      //           let start = model.x;
      //           let end = model.x;
      //           // let height = model.height;
      //           let gradient = ctx.createLinearGradient(start + 100, 0, end - 300, 0);
      //           // let gradient = ctx.createLinearGradient(startX, startY, startX+400, startY);
      //           gradient.addColorStop(0, 'rgba(230, 0, 0, 0.5)');
      //           gradient.addColorStop(1, 'rgba(255, 81, 58, 0.5)');
      //           model.backgroundColor = gradient;
      //         }
      //       }
      //     }
      //   }
      // }]
    };

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.graphData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.grmGraph}`}>
      <span className={`${styles.graphHeader}`}>Key Customers</span>
      <canvas
        ref={chartContainer}
      />
    </div>
  );
}

export default BuLubesInventoryGraph;
