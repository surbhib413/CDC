import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./BpclMarket.module.scss";

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BpclMarketGraph(props) {
    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy()
        }

        const ctx = chartContainer.current.getContext("2d");

        const chartConfig = {
            type: "line",
            data: {
                labels: [0, 5, 10, 15, 20, 25],
                datasets: [
                    {
                        borderColor: "#74ce12",
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#74ce12",
                        pointBorderColor: "#74ce12",
                        borderWidth: 4,
                        label: "Actual",
                        data: [100, 150, 50, 160, 100, 200],
                        pointRadius : [0,0,0,0,0,3],
                        pointStyle : 'triangle',
                        pointRotation : 175,
                        fill: false,
                        // backgroundColor: "rgb(222, 172, 245)",
                        datalabels: {
                            display: false,
                        },
                    },
                ]
            },
            options: {
                // barRoundness: 1,
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            display: false,
                            ticks: {
                                display: false,
                                beginAtZero : true
                            },
                        },
                    ],

                    yAxes: [
                        {
                            display : false,
                            ticks: {
                                beginAtZero: true,
                                display: false,
                            },
                        },
                    ]
                },
                legend: {
                    display: false
                },
                layout : {
                    padding : {
                        left : 30,
                        top : 20,
                        right : 50,
                        bottom : 20
                    }
                }
            }
        }

        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(ctx, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={`${styles.BpclGraph}`}>
            <canvas
                ref={chartContainer}
            />
        </div>
    )
}
export default BpclMarketGraph;