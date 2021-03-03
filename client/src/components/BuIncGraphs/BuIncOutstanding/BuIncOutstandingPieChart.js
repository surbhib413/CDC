import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./BuIncOutstanding.module.scss";

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BuIncOutstandingPieChart(props) {

    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);
    
    
    useEffect(() => {
      let actualArray = [];
  
      function prepareGraphData(apiGraphData) {
          apiGraphData.forEach((item, index) => {
              actualArray.push(item.not_due);
              actualArray.push(item.zero_to_three_months);
              actualArray.push(item.three_to_six_months);
              actualArray.push(item.six_to_twelve_months);
              actualArray.push(item.twelve_to_thirty_six_months);
              actualArray.push(item.legal);
          });
      }
        prepareGraphData(props.graphData);

        if (chartInstance) {
            chartInstance.destroy()
        }

        const ctx = chartContainer.current.getContext("2d");

        let grad1 = ctx.createLinearGradient(0, 0, 0, 500);
        grad1.addColorStop(1, '#00a8ec');
        grad1.addColorStop(0, '#00e0bc');

        let grad2 = ctx.createLinearGradient(0, 0, 0, 500);
        grad2.addColorStop(1, '#ff588c');
        grad2.addColorStop(0, '#fac159');

        let grad3 = ctx.createLinearGradient(0, 0, 0, 500);
        grad3.addColorStop(1, '#ffbf45');
        grad3.addColorStop(0, '#ffd179');

        let grad4 = ctx.createLinearGradient(0, 0, 0, 500);
        grad4.addColorStop(0, '#ff7bda');
        grad4.addColorStop(1, '#e640b7');

        let grad5 = ctx.createLinearGradient(0, 0, 0, 500);
        grad5.addColorStop(1, '#b76df1');
        grad5.addColorStop(0, '#632897');

        let grad6 = ctx.createLinearGradient(0, 0, 0, 500);
        grad6.addColorStop(1, '#b4ec51');
        grad6.addColorStop(0, '#65ce3a');

        const chartConfig = {
            type: "pie",
            data: {
                datasets: [
                    {
                        label: ["One", "two", "three"],
                        data: actualArray,
                        datalabels: {
                            anchor: "center",
                            align: 'center',
                            font: {
                                size: 25,
                            },
                            color: "white"
                        },
                        backgroundColor: [grad1, grad2, grad3, grad4, grad5, grad6],
                        borderWidth: 0,
                        borderColor: "#202c3f",
                        weight: 4,
                        hoverBorderWidth: 0,
                        hoverBorderColor: [grad1, grad2, grad3, grad4, grad5, grad6],
                        hoverBackgroundColor: [grad1, grad2, grad3, grad4, grad5, grad6],
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
                rotation: -1,
                responsive: true,
                maintainAspectRatio: false,
            },
            legend: {
                display: false
            },
        }

        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(ctx, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer, props.graphData]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={`${styles.graph}`}>
            <canvas
                ref={chartContainer}
                height="450"
                width="450"
            />
        </div>
    )
}
export default BuIncOutstandingPieChart;