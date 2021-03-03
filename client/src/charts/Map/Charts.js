import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import BackButton from "./BackButton";
import Table from "./Table";
import CountryChart from "./CountryChart";
//import _ from "lodash";
import styles from "./Map.module.scss";
import ChartData from "./ChartData";
import SelectBox from "./SelectBox";
import LegendsProgressBar from "./LegendsProgressBar";
import env from "../../environment";

const GoogleChart = (props) => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectBoxMode, setSelectBoxMode] = useState("ytm");
  const [location, setLocation] = useState(props.location);

  const [childData, setChildData] = useState({
    clicked: false,
    regionClicked: {},
  });

  const mapClickHandler = (e, region) => {
    if (data[region + 1]) {
      let fetchedRegionName = data[region + 1][0];
      const bool = chartData.map((item) => {
        item.countries.map((el) => {
          if (el.v === fetchedRegionName) {
            //console.log(item);
            props.getRegionNameOnClick(item.region.toLowerCase());
            setChildData({
              clicked: !clicked,
              regionClicked: item,
            });
          }
        });
      });
    }
  };
  let temp = [];
  const storeCountry = (
    countryList,
    percent,
    region,
    regionCode,
    term_hs,
    spot_hs,
    indigenous_hs
  ) => {
    countryList.map((country) => {
      temp.push([country.v, percent]);
      setData([["Country", "Percent"], ...temp]);
    });

    setChartData((state) => [
      ...state,
      {
        region: region,
        regionCode: regionCode,
        countries: countryList,
        overall_percentage: percent,
        term_hs,
        spot_hs,
        indigenous_hs,
      },
    ]);
  };

  const fetchData = () => {
    let url = `${env.ITRM_KPI_URL}/crude_procurement/region?refinery=${props.location}&data_type=${selectBoxMode}`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((response) =>
        response.data.map((el, index) =>
          storeCountry(
            el.country_list,
            el.overall_percentage,
            el.region,
            el.regionCode,
            el.term_hs,
            el.spot_hs,
            el.indigenous_hs
          )
        )
      )
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
    setLoading(true);
    setLocation(props.location);
    setChartData([]);
  }, [selectBoxMode, props.location]) // eslint-disable-line react-hooks/exhaustive-deps

  const backClickHandler = (e, region) => {
    setChildData({ clicked: !clicked });
  };
  const chartEvents = [
    {
      eventName: "ready",
      callback: ({ chartWrapper, google }) => {
        const chart = chartWrapper.getChart();
        chart.container.addEventListener("click", (ev) => {
          if (!clicked) {
            const indexOfSelectedRegion =
              chart.getSelection().length > 0
                ? chart.getSelection()[0]["row"]
                : null;
            if (indexOfSelectedRegion) {
              mapClickHandler(ev, indexOfSelectedRegion);
            } else {
              return false;
            }
          }
        });
      },
    },
  ];
  const { regionName, dataWeight, clicked } = childData;
  const { regionClicked } = childData;

  const getSelectBoxMode = (val) => {
    setSelectBoxMode(val);

    // setTimeout(function() {
    //   fetchData();
    // }, 2000);
  };
  //console.log(data);
  return (
    <div>
      {clicked ? (
        <div>
          <BackButton backClickHandler={() => backClickHandler()} />
          <CountryChart regionClicked={regionClicked}></CountryChart>
        </div>
      ) : loading ? (
        <div style={{ position: "relative" }}>
          <div className={`${styles.crudeProcurementHeading}`}>
            Crude Procurement(MMT)
          </div>
          <Chart
            width={"100%"}
            chartType='GeoChart'
            chartEvents={chartEvents}
            options={{
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
              backgroundColor: "#000000",
              datalessRegionColor: "#283040",
              defaultColor: "#000000",
              stroke: "#6699cc",
              legend: "none",
              tooltip: { trigger: "none" },
            }}
            data={data}
            mapsApiKey={process.env.REACT_APP_GOOGLE_KEY}
            style={{
              transform: `scale(${0.8})`,
              position: "absolute",
              right: "100px",
              cursor: "pointer",
            }}
          />
          <div className={`${styles.selectbox}`}>
            <SelectBox getSelectBoxMode={(val) => getSelectBoxMode(val)} />
          </div>
          <LegendsProgressBar />
          <ChartData chartData={chartData} location={location} />

          <div className={`${styles.mapTable}`}>
            <div className={`${styles.table}`}>
              <Table regionName='all regions' />
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default GoogleChart;
