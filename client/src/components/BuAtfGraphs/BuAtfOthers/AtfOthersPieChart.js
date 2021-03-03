import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./AtfOthersPieChart.module.scss";
Chart.defaults.global.defaultFontFamily = "Titillium Web";

function AtfOthersPieChart(props) {

    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);
    
    useEffect(() => {
      let actualArray = [];
  
      const prepareGraphData = (apiGraphData) => {
          apiGraphData.forEach((item, index) => {
              actualArray.push(item.amount);
          });
      }
        prepareGraphData(props.graphData);

        if (chartInstance) {
            chartInstance.destroy()
        }

        const ctx = chartContainer.current.getContext("2d");
        let lessThanTwoGrad = ctx.createLinearGradient(0, 0, 0, 500);
        lessThanTwoGrad.addColorStop(1, '#00a8ec');
        lessThanTwoGrad.addColorStop(0, '#00e0bc');

        let twoToFiveGrad = ctx.createLinearGradient(0, 0, 0, 500);
        twoToFiveGrad.addColorStop(0, '#ffbf45');
        twoToFiveGrad.addColorStop(1, '#ff8309');

        let sixToTenGrad = ctx.createLinearGradient(0, 0, 0, 500);
        sixToTenGrad.addColorStop(0, '#ff7bda');
        sixToTenGrad.addColorStop(1, '#e640b7');

        let moreThanTenGrad = ctx.createLinearGradient(0, 0, 0, 500);
        moreThanTenGrad.addColorStop(0, '#ff588c');
        moreThanTenGrad.addColorStop(1, '#fac159');

        const chartConfig = {
            type: "pie",
            data: {
                datasets: [
                    {
                        label: ["One", "two", "three", "four"],
                        data: actualArray,
                        datalabels: {
                            anchor: "center",
                            align: 'center',
                            font: {
                                size: 25,
                            },
                            color: "white"
                        },
                        backgroundColor: [lessThanTwoGrad, twoToFiveGrad, sixToTenGrad, moreThanTenGrad],
                        borderWidth: 0,
                        // borderWidth: [0, 2, 2, 2],
                        borderColor: "#202c3f",
                        // borderColor: ["00e0bc", "#202c3f", "#202c3f", "#202c3f"],
                        weight: 4,
                        hoverBorderWidth: 0,
                        hoverBorderColor: [lessThanTwoGrad, twoToFiveGrad, sixToTenGrad, moreThanTenGrad],
                        hoverBackgroundColor: [lessThanTwoGrad, twoToFiveGrad, sixToTenGrad, moreThanTenGrad],
                    },

                ]
            },
            options: {
                layout: {
                    padding: {
                        left: 30,
                        right: 30,
                        top: 30,
                        bottom: 30
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                },
                rotation: 3,
                responsive: true,
                maintainAspectRatio: false,
            },
            plugins: [{
                afterUpdate: function (chart) {
                    let maxNo = 0;
                    let maxNoIndex = 0;
                    for (let i in chart.config.data.datasets) {
                        let dataset = chart.config.data.datasets[i];
                        maxNo = Math.max(...dataset.data);
                        maxNoIndex = dataset.data.indexOf(maxNo);

                        for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
                            // let model = chart.getDatasetMeta(i).data[j]._model;
                            if (j === maxNoIndex) {
                                chart.getDatasetMeta(i).data[maxNoIndex]._model.outerRadius = chart.outerRadius + 30
                            }
                        }
                    }
                },

            }],
            legend: {
                display: false
            },
        }

        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(ctx, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer, props.graphData, props.activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={`${styles.graph}`}>
            <canvas
                ref={chartContainer}
                height="300"
                width="300"
            />
        </div>
    )
}
export default AtfOthersPieChart;