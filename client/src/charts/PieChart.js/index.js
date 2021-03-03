import React from 'react';
import Chart from 'chart.js';

class index extends React.Component {
    componentDidMount() {
        let doughnut_ctx = document.getElementById('pie-chart').getContext('2d');
        // let bar_chart = new Chart(bar_ctx, {
        let doughnutChart = new Chart(doughnut_ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [2478, 5267, 734, 784, 433],
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    label: "Population (millions)",
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }
        });
    }

    render() {
        return (
            <div className="p-2" style={{ width: "50%", margin: "auto" }}>
                <h1>Pie Chart</h1>
                <canvas id="pie-chart" height="170Px" />
            </div>
        )
    }
}

export default index;
