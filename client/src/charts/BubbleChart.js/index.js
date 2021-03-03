import React from 'react';
import Chart from 'chart.js';

class index extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let bubble_ctx = document.getElementById('bubble-chart').getContext('2d');
        // let bar_chart = new Chart(bar_ctx, {
        let bubbleChart = new Chart(bubble_ctx, {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'John',
                    data: [
                        {
                            x: 3,
                            y: 7,
                            r: 10
                        }
                    ],
                    backgroundColor: "#ff6384",
                    hoverBackgroundColor: "#ff6384"
                },
                {
                    label: 'Paul',
                    data: [
                        {
                            x: 6,
                            y: 2,
                            r: 10
                        }
                    ],
                    backgroundColor: "#ff6384",
                    hoverBackgroundColor: "#ff6384"
                },
                {
                    label: 'George',
                    data: [
                        {
                            x: 2,
                            y: 6,
                            r: 10
                        }
                    ],
                    backgroundColor: "#ff6384",
                    hoverBackgroundColor: "#ff6384"
                },
                {
                    label: 'Ringo',
                    data: [
                        {
                            x: 5,
                            y: 3,
                            r: 10
                        }
                    ],
                    backgroundColor: "#ff6384",
                    hoverBackgroundColor: "#ff6384"
                },
                {
                    label: 'John',
                    data: [
                        {
                            x: 2,
                            y: 1,
                            r: 10
                        }
                    ],
                    backgroundColor: "#ff6384",
                    hoverBackgroundColor: "#ff6384"
                },
                {
                    label: 'George',
                    data: [
                        {
                            x: 1,
                            y: 3,
                            r: 10
                        }
                    ],
                    backgroundColor: "#ff6384",
                    hoverBackgroundColor: "#ff6384"
                },
                {
                    label: 'Ringo',
                    data: [
                        {
                            x: 1,
                            y: 1,
                            r: 10
                        }
                    ],
                    backgroundColor: "#ff6384",
                    hoverBackgroundColor: "#ff6384"
                },
                {
                    label: 'George',
                    data: [
                        {
                            x: 1,
                            y: 2,
                            r: 10
                        }
                    ],
                    backgroundColor: "#ff6384",
                    hoverBackgroundColor: "#ff6384"
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                //labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
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
                <h1>Bubble Chart</h1>
                <canvas id="bubble-chart" height="170Px" />
            </div>
        )
    }
}

export default index;
