import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import Table from "./Table";
import styles from "./Map.module.scss";
import env from "../../environment";
import CountryNamesComponent from "./CountryNamesComponent";
import LegendsProgressBar from "./LegendsProgressBar";
const CountryChart = (props) => {
  const [countryData, setCountryData] = useState([["Country", "Percent"]]);
  const { region, countries, overall_percentage } = props.regionClicked;
  const [loading, setLoading] = useState(false);
  const [regionCode, setRegionCode] = useState("");

  //console.log(countries);
  let temp = [];
  const makeRegionData = () => {
    countries.map((item, index) => {
      temp.push([item.v, overall_percentage]);
      setCountryData([...countryData, ...temp]);
    });
    setRegionCode();
  };

  let result = [];
  const storeCountryData = (cData) => {
    // console.log(cData);

    //debugger;
    cData.map((data) => {
      result.push([data.country_code, data.overall_percentage]);
      setCountryData([...countryData, ...result]);
    });
  };

  const fetchRegionData = () => {
    //console.log(props.regionClicked);
    const regionName = props.regionClicked.region.toLowerCase();
    let url = `${env.ITRM_KPI_URL}/crude_procurement/country?refinery=mumbai&data_type=ytm&region=${regionName}`;

    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((response) => {
        if (response.data.length > 0) {
          setCountryData([["Country", "Percent"]]);
          storeCountryData(response.data);
        } else {
          makeRegionData();
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    //makeRegionData();
    fetchRegionData();
    setLoading(true);
  }, [props.regionClicked]) // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(countryData);

  return (
    <div style={{ position: "relative" }}>
      (
      <div className={`${styles.countryChartHeading}`}>
        {props.regionClicked.region}
      </div>
      <Chart
        options={{
          region: props.regionClicked.regionCode,
          colorAxis: {
            colors: [
              "#FF7800",
              "#ffbf00",
              "#ffec00",
              "#fff25d",
              "#fff690",
              "#fffabd",
            ],
          },
          datalessRegionColor: "#000000",
          backgroundColor: {
            fill: "#141923",
            strokeWidth: "20",
            stroke: "#000000",
          },
          tooltip: { trigger: "none" },
          legend: "none",
          displayMode: "regions",
        }}
        chartType='GeoChart'
        mapsApiKey={process.env.REACT_APP_GOOGLE_KEY}
        data={countryData}
        style={{
          transform: `scale(${0.85})`,
          bottom: "110px",
          position: "relative",
          cursor: "pointer",
          width: "100%",
        }}
      />
      <CountryNamesComponent regionDetails={props.regionClicked} />
      {countryData.length > 1 ? (
        <div>
          <LegendsProgressBar />
        </div>
      ) : (
        <div></div>
      )}
      <div className={`${styles.countryChartTable}`}>
        <Table regionName={props.regionClicked.region.toLowerCase()} />
      </div>
      )
    </div>
  );
};
export default CountryChart;
