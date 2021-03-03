import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js";
import "chartjs-plugin-datalabels";
import styles from "./BalanceSheets.module.scss";

function BalanceSheetGraph(props) {
    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy();
        }

        const ctx = chartContainer.current.getContext("2d");
        let chartConfig = {
            type: 'horizontalBar',
            data: {
                labels: ["Q4", "Q3", "Q2", "Q1"],
                datasets: [
                    {
                        label: "Last Year",
                        backgroundColor: ["#00e7ff", "#00e7ff", "#00e7ff", "#00e7ff"],
                        data: [120, 110, 90, 120],
                        barThickness: 15,
                        datalabels: {
                            display: false
                        }
                    },
                    {
                        label: "Current Year",
                        backgroundColor: ["#ff526d", "#ff526d", "#ff526d", "#ff526d"],
                        data: [100, 100, 100, 100],
                        barThickness: 15,
                        datalabels: {
                            display: false
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
                            gridLines: {
                                display: true,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'INR (Cr)',
                                fontColor: "#dee5ef",
                                fontSize: "20",
                              },
                            ticks: {
                                beginAtZero: true,
                                display: true,
                                padding: 0,
                                fontColor: "#dee5ef",
                                fontSize: "20",
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: true,
                            },
                            ticks: {
                                display: true,
                                padding: 20,
                                fontColor: "#dee5ef",
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
            <canvas
                ref={chartContainer}
            />
        </div>
    );
}

export default BalanceSheetGraph;
