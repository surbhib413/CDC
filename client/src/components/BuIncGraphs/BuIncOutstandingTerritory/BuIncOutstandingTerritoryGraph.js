import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import styles from "./BuIncOutstandingTerritory.module.scss";

function BuIncOutstandingTerritory(props) {
    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);
    
    useEffect(() => {
      let notDueArray = [];
      let zeroToThreeMonthsArray = [];
      let threeToSixMonthsArray = [];
      let sixToTwelveMonthsArray = [];
      let twelveToThirtySixMonthsArray = [];
      let legalArray = [];
      let labelsArray = [];
  
      function prepareGraphData(apiGraphData) {
          apiGraphData.forEach((item, index) => {
              notDueArray.push(item.not_due);
              zeroToThreeMonthsArray.push(item.zero_to_three_months);
              threeToSixMonthsArray.push(item.three_to_six_months);
              sixToTwelveMonthsArray.push(item.six_to_twelve_months);
              twelveToThirtySixMonthsArray.push(item.twelve_to_thirty_six_months);
              legalArray.push(item.legal);
              labelsArray.push(item.product);
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
                labels: labelsArray,
                datasets: [
                    {
                        categoryPercentage: 1,
                        barPercentage: 0.3,
                        label: "Actual",
                        backgroundColor: "#00d3f7",
                        data: notDueArray,
                        borderWidth: 0,
                        datalabels: {
                            //display:false,
                            anchor: "end",
                            align: 'start',
                            color: "#dee5ef",
                            font: {
                                size: 20
                            }
                        },
                    },
                    {
                        categoryPercentage: 1,
                        barPercentage: 0.3,
                        label: "Actual",
                        backgroundColor: "#ff588c",
                        data: zeroToThreeMonthsArray,
                        borderWidth: 0,
                        datalabels: {
                            //display:false,
                            anchor: "end",
                            align: 'start',
                            color: "#dee5ef",
                            font: {
                                size: 20
                            }
                        },
                    },
                    {
                        categoryPercentage: 1,
                        barPercentage: 0.3,
                        label: "Actual",
                        backgroundColor: "#ffbf45",
                        data: threeToSixMonthsArray,
                        borderWidth: 0,
                        datalabels: {
                            //display:false,
                            anchor: "end",
                            align: 'start',
                            color: "#dee5ef",
                            font: {
                                size: 20
                            }
                        },
                    },
                    {
                        categoryPercentage: 1,
                        barPercentage: 0.3,
                        label: "Actual",
                        backgroundColor: "#ff7bda",
                        data: sixToTwelveMonthsArray,
                        borderWidth: 0,
                        datalabels: {
                            //display:false,
                            anchor: "end",
                            align: 'start',
                            color: "#dee5ef",
                            font: {
                                size: 20
                            }
                        },
                    },
                    {
                        categoryPercentage: 1,
                        barPercentage: 0.3,
                        label: "Actual",
                        backgroundColor: "#b76df1",
                        data: twelveToThirtySixMonthsArray,
                        borderWidth: 0,
                        datalabels: {
                            //display:false,
                            anchor: "end",
                            align: 'start',
                            color: "#dee5ef",
                            font: {
                                size: 20
                            }
                        },
                    },
                    {
                        categoryPercentage: 1,
                        barPercentage: 0.3,
                        label: "Actual",
                        backgroundColor: "#b4ec51",
                        data: legalArray,
                        borderWidth: 0,
                        datalabels: {
                            //display:false,
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
                // layout: {
                //     padding: {
                //         right: -10,
                //     }
                // },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            stacked: true,
                            display: true,
                            beginAtZero: true,
                            ticks: {
                                beginAtZero: true,
                                display: true,
                                padding: 20,
                                fontColor: "#dee5ef",
                                fontSize: "20",
                            },
                            gridLines: {
                                display: true,
                                color: "grey",
                                drawBorder: true,
                                tickMarkLength: 0,
                                borderDash: [3],
                            }
                        },
                    ],

                    yAxes: [
                        {
                            stacked: true,
                            beginAtZero: true,
                            display: true,
                            offset: true,
                            type: 'category',
                            gridLines: {
                                display: true,
                                color: "grey",
                                tickMarkLength: 0,
                            },
                            ticks: {
                                display: true,
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
            // plugins: [{
            //     afterUpdate: function (chart) {
            //         for (let i in chart.config.data.datasets) {
            //             let dataset = chart.config.data.datasets[i];
            //             if (dataset.label === "Actual") {
            //                 for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
            //                     let model = chart.getDatasetMeta(i).data[j]._model;
            //                     let start = model.x;
            //                     // let end = model.x + dataset.data[0];
            //                     let end = model.x;

            //                     let gradient = ctx.createLinearGradient(start + 10, 0, end - 400, 0);
            //                     gradient.addColorStop(0, 'rgb(0, 168, 236)');
            //                     gradient.addColorStop(1, 'rgb(0, 224, 188)');
            //                     model.backgroundColor = gradient;
            //                 }
            //             }
            //             else {
            //                 for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
            //                     let model = chart.getDatasetMeta(i).data[j]._model;
            //                     // console.log("MODEL", model);
            //                     let start = model.x;
            //                     let end = model.x;

            //                     let gradient = ctx.createLinearGradient(start + 100, 0, end - 300, 0);
            //                     gradient.addColorStop(0, 'rgba(0, 168, 236,0.3)');
            //                     gradient.addColorStop(1, 'rgba(0, 224, 188,0.3)');
            //                     model.backgroundColor = gradient;
            //                 }
            //             }
            //         }
            //     }
            // }]
        }
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(ctx, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer, props.graphData]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className={`${styles.grmGraph}`}>
            <canvas
                ref={chartContainer}
            />
        </div>
    )
}

export default BuIncOutstandingTerritory;