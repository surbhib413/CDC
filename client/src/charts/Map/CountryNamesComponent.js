import React, { useState, useEffect } from "react";
import styles from "./Region.module.scss";
import regionStyles from "./Map.module.scss";
import env from "../../environment";

const CountryNamesComponent = (props) => {
  const [data, setData] = useState([]);

  const makeProgressBar = (res) => {
    let localData = [];
    res.map((item) => {
      localData.push({
        countryCode: item.country_code,
        percent: item.overall_percentage,
        term: item.term_hs,
        spot: item.spot_hs,
        ind: item.indigenous_hs,
      });
    });
    setData(localData);
  };

  const renderProgressBar = (countryCode, term, spot, ind) => {
    if (
      document.querySelector(`#progressbarDataForTerm${countryCode}`) !== null
    ) {
      document.querySelector(
        `#progressbarDataForTerm${countryCode}`
      ).style.width = `${term / 10}%`;

      document.querySelector(
        `#progressbarDataForTerm${countryCode}`
      ).innerHTML = `<span id="hsTerm${countryCode}" style="font-size:16px;float:left; font-style: italic;">${term}</span><span id="lsTerm${countryCode}" style="font-size:16px;float:right; font-style: italic;left:150px;position:absolute">${
        1000 - term
      }</span>`;
    }
    if (
      document.querySelector(`#progressbarDataForSpot${countryCode}`) !== null
    ) {
      document.querySelector(
        `#progressbarDataForSpot${countryCode}`
      ).style.width = `${spot / 10}%`;
      document.querySelector(
        `#progressbarDataForSpot${countryCode}`
      ).innerHTML = `<span id="hsSpot${countryCode}" style="font-size:16px;float:left; font-style: italic;">${spot}</span><span id="lsSpot${countryCode}" style="font-size:16px;float:right; font-style: italic;left:150px;position:absolute">${
        1000 - spot
      }</span>`;
    }

    if (
      document.querySelector(`#progressbarDataForIndigenous${countryCode}`) !==
      null
    ) {
      document.querySelector(
        `#progressbarDataForIndigenous${countryCode}`
      ).style.width = `${ind / 10}%`;
      document.querySelector(
        `#progressbarDataForIndigenous${countryCode}`
      ).innerHTML = `<span id="hsIndigenous${countryCode}" style="font-size:16px;float:left; font-style: italic;">${ind}</span><span id="lsIndigenous${countryCode}" style="font-size:16px;float:right; font-style: italic;left:150px;position:absolute">${
        1000 - ind
      }</span>`;
    }
  };
  const fetchCountryData = () => {
    let url = `${env.ITRM_KPI_URL}/crude_procurement/country?refinery=mumbai&data_type=ytm&region=${props.regionDetails.region}`;

    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((response) => {
        if (response.data.length > 0) {
          makeProgressBar(response.data);
        } else {
          return false;
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchCountryData();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //console.log(data);
  return props.regionDetails.countries.map((country, index) => {
    let regionStyle = country.v.replace(/\s/g, "").toLowerCase();

    if (styles[regionStyle]) {
      return (
        <div key={index} className={`${styles[regionStyle]}`}>
          {data.length > 0 ? (
            data.map((el, index) => {
              if (el.countryCode === country.v) {
                setTimeout(function () {
                  renderProgressBar(el.countryCode, el.term, el.spot, el.ind);
                }, 1000);
                return (
                  <div key={index}>
                    <div style={{ transform: `scale(${0.7})` }}>
                      <div className={`${regionStyles.chartDataFont}`}>
                        {el ? el.percent + "%" : 0}
                      </div>
                      <div>{country.f}</div>
                      <div
                        className={`${regionStyles.progressbarTerm}`}
                        id={`termText${el.countryCode}`}
                        style={{ marginTop: "5px" }}
                      >
                        <div
                          className={`${regionStyles.progressbarData}`}
                          id={`progressbarDataForTerm${el.countryCode}`}
                        ></div>{" "}
                      </div>

                      <div
                        className={`${regionStyles.progressbarSpot}`}
                        id={`spotText${el.countryCode}`}
                      >
                        <div
                          className={`${regionStyles.progressbarData}`}
                          id={`progressbarDataForSpot${el.countryCode}`}
                        ></div>
                      </div>
                      <div
                        className={`${regionStyles.progressbarIndigenous}`}
                        id={`indText${el.countryCode}`}
                      >
                        <div
                          className={`${regionStyles.progressbarData}`}
                          id={`progressbarDataForIndigenous${el.countryCode}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div style={{ marginBottom: "0", fontSize: "24px" }}>
              {country.f}
            </div>
          )}
        </div>
      );
    }
  });
};

export default CountryNamesComponent;
