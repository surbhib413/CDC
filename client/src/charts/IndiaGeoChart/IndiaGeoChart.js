import React, { Component, useState } from "react";
import Chart from "react-google-charts";
import mapStyles from "../Map/mapStyles";
import BackButton from "../Map/BackButton";
import PercentData from "../Map/PercentData";
import { TransitionGroup } from "react-transition-group";
import Marker from "../Map/Marker";

class IndiaGeoChart extends Component {
    state = {
        options: {
            region: 'IN',
            domain: 'IN',
            displayMode: 'regions',
            colorAxis: { colors: ['#e5ef88', '#d4b114', '#e85a03'] },
            resolution: 'provinces',
            defaultColor: '#f5f5f5',
            tooltip: { trigger: 'selection' },
        },
        data: [
            ['State Code', 'State', 'Temperature'],
            ['IN-UP', 'Uttar Pradesh', 33],
            ['IN-MH', 'Maharashtra', 32],
            ['IN-BR', 'Bihar', 31],
            ['IN-WB', 'West Bengal', 32],
            ['IN-MP', 'Madhya Pradesh', 30],
            ['IN-TN', 'Tamil Nadu', 33],
            ['IN-RJ', 'Rajasthan', 33],
            ['IN-KA', 'Karnataka', 29],
            ['IN-GJ', 'Gujarat', 34],
            ['IN-AP', 'Andhra Pradesh', 32],
            ['IN-OR', 'Orissa', 33],
            ['IN-TG', 'Telangana', 33],
            ['IN-KL', 'Kerala', 31],
            ['IN-JH', 'Jharkhand', 29],
            ['IN-AS', 'Assam', 28],
            ['IN-PB', 'Punjab', 30],
            ['IN-CT', 'Chhattisgarh', 33],
            ['IN-HR', 'Haryana', 30],
            ['IN-JK', 'Jammu and Kashmir', 20],
            ['IN-UT', 'Uttarakhand', 28],
            ['IN-HP', 'Himachal Pradesh', 17],
            ['IN-TR', 'Tripura', 31],
            ['IN-ML', 'Meghalaya', 21],
            ['IN-MN', 'Manipur', 22],
            ['IN-NL', 'Nagaland', 22],
            ['IN-GA', 'Goa', 32],
            ['IN-AR', 'Arunachal Pradesh', 33],
            ['IN-MZ', 'Mizoram', 23],
            ['IN-SK', 'Sikkim', 24],
            ['IN-DL', 'Delhi', 31],
            ['IN-PY', 'Puducherry', 33],
            ['IN-CH', 'Chandigarh', 30],
            ['IN-AN', 'Andaman and Nicobar Islands', 30],
            ['IN-DN', 'Dadra and Nagar Haveli', 30],
            ['IN-DD', 'Daman and Diu', 29],
            ['IN-LD', 'Lakshadweep', 31]
        ],
        scale: 1,
        clicked: false,
        width: "100%",
        regionName: "",
        dataWeight: 0
    };

    mapClickHandler(e, region) {
        console.log("region:--", this.state.data[region + 1]);
        let regionName = this.state.data[region + 1][0];
        let dataWeight = this.state.data[region + 1][1];
        console.log("--------------------");
        console.log(regionName);
        this.setState({
            clicked: !this.state.clicked,
            regionName: regionName,
            dataWeight: dataWeight
        });
    }

    componentDidMount() { }

    backClickHandler(e, region) {
        this.setState({
            clicked: !this.state.clicked
        });
    }
    render() {
        const chartEvents = [
            {
                eventName: "ready",
                callback: ({ chartWrapper, google }) => {
                    const chart = chartWrapper.getChart();
                    chart.container.addEventListener("click", ev => {
                        if (!this.state.clicked) {
                            console.log("*********", ev);

                            const indexOfSelectedRegion =
                                chart.getSelection().length > 0
                                    ? chart.getSelection()[0]["row"]
                                    : null;

                            if (indexOfSelectedRegion !== null) {
                                this.mapClickHandler(ev, indexOfSelectedRegion);
                            } else {
                                return false;
                            }
                        }
                    });
                }
            }
        ];
        return (
            <div>
                {this.state.clicked ? (
                    <div>
                        <BackButton backClickHandler={e => this.backClickHandler(e)} />
                        <PercentData regionName={this.state.regionName} />
                        <Marker />
                    </div>
                ) : null}
                <TransitionGroup timeout={1200} transitionName='googlechart'>
                    <Chart
                        width={"100%"}
                        ref={this.wrapperRef}
                        chartType='GeoChart'
                        chartEvents={chartEvents}
                        options={this.state.options}
                        data={this.state.data}
                        mapsApiKey='AIzaSyARqnA7S2JnKjSvsikuOdYCMvoOf7Dv_lI'
                        rootProps={{ "data-testid": "1" }}
                        style={{ transform: `scale(${this.state.scale})` }}
                    />
                </TransitionGroup>
            </div>
        );
    }
}
export default IndiaGeoChart;
