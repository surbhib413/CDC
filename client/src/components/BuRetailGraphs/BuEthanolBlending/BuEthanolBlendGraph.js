import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import styles from "./BuEthanolBlendGraph.module.scss";

function BuEthanolBlendGraph(props) {

    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);
    
    useEffect(() => {
      let actualArray = [];
      let targetArray = [];
  
      function prepareGraphData(apiGraphData) {
          apiGraphData.forEach((item, index) => {
              actualArray.push(item.actual);
              targetArray.push(item.target);
              return;
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
                        label: "Actual",
                        backgroundColor: "#ff588c",
                        //data: [30],
                        categoryPercentage: 1,
                            barPercentage: 0.5,
                        data: actualArray,
                        borderWidth: 0,
                        datalabels: {
                            //display:false,
                            anchor: "end",
                            align: 'start',
                            color: "white",
                            font: {
                                size: 20
                            }
                        },
                    },
                    {
                        yAxisID: "bar-x-axis2",
                        label: "Target",
                            barPercentage: 1,
                            //data: [70],
                        categoryPercentage: 1,
                        data: targetArray,
                        backgroundColor: "#2f3b51",
                        borderWidth: 0,
                        datalabels: {
                            display: false,
                        },
                    },
                ]
            },
            options: {
                layout: {
                    padding: {
                        top:18,
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
                                // display: true,
                                drawBorder: true,
                                // offsetGridLines: true,
                                tickMarkLength: 0,
                                // color: "grey",
                                // tickMarkLength: 0,
                                borderDash: [3],

                                // tickMarkLength: 0,
                                // zeroLineColor: "#67758d",
                                // zeroLineWidth: 1
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
                                // display: true,
                                // drawBorder: true,
                                // color: "grey",
                                // tickMarkLength: 0,
                                // borderDash: [3],

                                display: false,
                                color: "grey",
                                tickMarkLength: 0,
                                // tickMarkLength: 0,
                                // zeroLineColor: "#67758d",
                                // zeroLineWidth: 1
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
                                // drawBorder: true,
                                // tickMarkLength: 0,
                                // borderDash: [3],
                            },
                            ticks: {
                                display: false,
                                padding: 9,
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
                    for (let i in chart.config.data.datasets) {
                        let dataset = chart.config.data.datasets[i];
                        if (dataset.label === "Actual") {
                            for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
                                let model = chart.getDatasetMeta(i).data[j]._model;
                                let start = model.x;
                                // let end = model.x + dataset.data[0];
                                let end = model.x;
                                let gradient = ctx.createLinearGradient(start + 10, 0, end - 200, 0);
                                gradient.addColorStop(0, 'rgb(255, 88, 140)');
                                gradient.addColorStop(1, 'rgb(250, 193, 89)');
                                model.backgroundColor = gradient;

                            }
                        }
                        else {
                            for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
                                let model = chart.getDatasetMeta(i).data[j]._model;
                                // console.log("MODEL", model);
                                let start = model.x;
                                let end = model.x;


                                let gradient = ctx.createLinearGradient(start + 100, 0, end - 300, 0);
                                gradient.addColorStop(0, 'rgba(255, 88, 140,0.3)');
                                gradient.addColorStop(1, 'rgba(250, 193, 89,0.3)');
                                model.backgroundColor = gradient;

                                //console.log("dataset.backgroundColor[j]",model.backgroundColor);
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

export default BuEthanolBlendGraph;