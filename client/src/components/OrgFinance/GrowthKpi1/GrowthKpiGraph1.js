import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js";
import "chartjs-plugin-datalabels";

function GrowthKpiGraph1(props) {
  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);


  // graphData.map((item, index) => {
  //     prevYearArray.push(item.prev_year);
  //     companyNames.push(item.company_name);
  //     if (item.curr_year < item.prev_year) {
  //         currYearArray.push(item.curr_year);
  //         growthArray.push(item.prev_year - item.curr_year)
  //         growthColor.push("#e13219")
  //     } else {
  //         currYearArray.push(item.prev_year);
  //         growthArray.push(item.curr_year - item.prev_year)
  //         growthColor.push("#74ce12")
  //     }
  // });
  // console.log("Prev year array",prevYearArray);
  // console.log("growth year array",growthArray);
  // console.log("Prev year array",currYearArray);
  
  useEffect(() => {
    let arrayData = [];
    let grmdata = [];
    let agrmData = [];
  
    const prepareGraphData = (graphData) => {
      if (props.kpiName === 'GRM') {
        arrayData = [720, 720, 720, 720];
        grmdata = [440, 440, 440 , 440];
        agrmData = [160, 160, 160, 160];
      }else{
        arrayData = [520, 520, 520, 520];
        grmdata = [420, 420, 420, 420];
        agrmData = [0, 0, 0, 0];
      }
    }
    prepareGraphData(props.graphData);
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");
    /*let chartConfig = {
      // The type of chart we want to create
      type: 'bar',
      // The data for our dataset
      data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
            label: 'FY 19',
            backgroundColor: ["#06c7aa", "#06c7aa", "#06c7aa", "#06c7aa"],
            borderColor: 'rgba(41, 61, 83, 1)',
            data: [650, 650, 650, 650],
            barThickness : 30,
            borderWidth : 1,
            datalabels : {
              display : false
            }
          },{
              label: 'FY 20',
              xAxisID : 'first',
              backgroundColor: 'rgba(36, 169, 217, 1)',
              borderColor: 'rgba(41, 61, 83, 1)',
              data: arrayData,
              barThickness : 30,
              borderWidth : 1,
              order : 3,
              datalabels : {
                display : false
              }
          },{
            label: 'Target',
            xAxisID : "second",
            backgroundColor: 'rgba(26, 85, 192, 1)',
            data: grmdata,
            barThickness : 30,
            borderWidth : 1,
            order : 2,
            datalabels : {
              display : false
            }
        },{
          label: 'AGRM',
          xAxisID : "third",
          backgroundColor: 'rgba(114, 72, 189, 1)',
          data: agrmData,
          barThickness : 30,
          borderWidth : 1,
          order : 1,
          datalabels : {
            display : false
          }
      }]
      },
      // Configuration options go here
      options: {
        responsive : true,
        maintainAspectRatio : false,
        legend : {
          display : false
        },
        scales: {
          yAxes : [{
            scaleLabel: {
              display: true,
              labelString: 'TMT',
              fontColor: "#dee5ef",
              fontSize: "20",
            },
            ticks: {
              beginAtZero: true,
              display: true,
              padding: 20,
              fontColor: "#dee5ef",
              fontSize: "20",
              min : 0,
              max : 800,
              stepSize : 200
            },
            gridLines: {
              color: "#2f3b51",
              tickMarkLength: 0,
              zeroLineColor: "transparent",
              zeroLineWidth: 1
            }
          }],
          xAxes: [{
            id : 'first',
            display : true,
            gridLines: {
              color: "transparent",
              offsetGidLines: true,
              tickMarkLength: 0,
              borderDash: [3],
            },
            ticks: {
              display: true,
              padding: 9,
              fontColor: "#dee5ef",
              fontSize: "20",
            },
          },{
            id : 'second',
            display : false,
            offset : true,
            gridLines: {
              color: "transparent",
              offsetGidLines: true,
              tickMarkLength: 0,
              borderDash: [3],
            },
            ticks: {
              display: true,
              padding: 9,
              fontColor: "#dee5ef",
              fontSize: "20",
            }
          },{
            id : 'third',
            display : false,
            offset : true,
            gridLines: {
              color: "transparent",
              offsetGidLines: true,
              tickMarkLength: 0,
              borderDash: [3],
            },
            ticks: {
              display: true,
              padding: 9,
              fontColor: "#dee5ef",
              fontSize: "20",
            }
          }
        ]
        },
        layout: {
          padding: {
              left: 20
          }
        }
      }
    }*/
    let chartConfig = {
      type: 'bar',
      data: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            label: "American Express",
            stack: 1,
            yAxisID: "bar-y-axis1",
            xAxisID: "bar-x-axis1",
            backgroundColor: ["#06c7aa", "#06c7aa", "#06c7aa", "#06c7aa"],
            borderWidth: 1,
            data: [650, 650, 650, 650],
            datalabels : {
              display : false
            }
          },
          {
            label: "American Express",
            stack: 1,
            yAxisID: "bar-y-axis2",
            xAxisID: "bar-x-axis2",
            backgroundColor: ["#06c7aa", "#06c7aa", "#06c7aa", "#06c7aa"],
            borderWidth: 1,
            data: [],
            datalabels : {
              display : false
            }
          },
          //check
          {
            label: "American Express",
            stack: 2,
            yAxisID: "bar-y-axis1",
            xAxisID: "bar-x-axis1",
            backgroundColor: ["#6849ba", "#6849ba", "#6849ba", "#6849ba"],
            borderWidth: 1,
            categoryPercentage: 0.8,
            barPercentage: 0.4,
            //data: [2, 2, 2, 2]
            data: agrmData,
            datalabels : {
              display : false
            }
          },
          //check
          {
            label: "Mastercard",
            stack: 2,
            yAxisID: "bar-y-axis1",
            xAxisID: "bar-x-axis1",
            backgroundColor: ["#1b55c0", "#1b55c0", "#1b55c0", "#1b55c0"],
            borderWidth: 1,
            categoryPercentage: 0.8,
            barPercentage: 0.4,
            data: grmdata,
            datalabels : {
              display : false
            }
          },
          {
            yAxisID: "bar-y-axis2",
            xAxisID: "bar-x-axis2",
            stack: 2,
            label: "Mastercard",
            backgroundColor: ["#24a9d9", "#24a9d9", "#24a9d9", "#24a9d9"],
            borderWidth: 1,
            data: arrayData,
            datalabels : {
              display : false
            }
          },
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
              id: "bar-x-axis1",
              stacked: true,
              type: 'category',
              display: true,
              offset: true,
              gridLines: {
                color: "transparent",
                offsetGidLines: true,
                tickMarkLength: 0,
                borderDash: [3],
              },
              ticks: {
                display: true,
                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
            },
            {
              id: "bar-x-axis2",
              // barPercentage: 1,
              stacked: true,
              display: false,
              offset: true,
              type: 'category',
              gridLines: {
                color: "transparent",
                offsetGidLines: true,
                tickMarkLength: 0,
                borderDash: [3],
              },
              ticks: {
                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "22",
              },
            },
          ],

          yAxes: [
            {
              display: false,
              id: "bar-y-axis1",
              stacked: true,
              beginAtZero: true,
              scaleLabel: {
                display: true,
                labelString: 'TMT',
                fontColor: "#dee5ef",
                fontSize: "20",
              },
              ticks: {
                beginAtZero: true,
                display: true,
                padding: 20,
                fontColor: "#dee5ef",
                fontSize: "20",
                min : 0,
                max : 800,
                stepSize : 200
              },
              gridLines: {
                color: "#2f3b51",
                tickMarkLength: 0,
                zeroLineColor: "#67758d",
                zeroLineWidth: 1
              }
            },
            {
              id: "bar-y-axis2",
              stacked: true,
              beginAtZero: true,
              scaleLabel: {
              display: true,
              labelString: 'TMT',
              fontColor: "#dee5ef",
              fontSize: "20",
            },
              ticks: {
                beginAtZero: true,
                display: true,
                padding: 20,
                fontColor: "#dee5ef",
                fontSize: "20",
                min : 0,
              max : 800,
              stepSize : 200
              },
              gridLines: {
                color: "#2f3b51",
                tickMarkLength: 0,
                zeroLineColor: "#2f3b51",
                zeroLineWidth: 1
              }
            },
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
  }, [chartContainer, props.graphData, props.kpiName]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={chartContainer}
    />
  );
}

export default GrowthKpiGraph1;
