import React, { useState, useEffect } from "react";
import styles from "./Map.module.scss";
import env from "../../environment";

const Table = (props) => {
  const [data, setData] = useState([]);
  const [lsData, setLsData] = useState([]);
  const [hsTotal, setHsTotal] = useState([]);
  const [lsTotal, setLsTotal] = useState([]);

  const getTableData = () => {
    let url = `${env.ITRM_KPI_URL}/crude_procurement_detail/?refinery=mumbai&data_type=ytm&oil_type=hs&region=${props.regionName}`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((response) => {
        if (response.data.length > 0) {
          let total = 0;

          response.data.map((el) => {
            total =
              el.term_planned +
              el.term_procured +
              el.term_arrived +
              el.spot_procured +
              el.spot_arrived +
              el.indegenous_planned +
              el.indegenous_procured +
              el.indegenous_arrived;
            setHsTotal(total);
          });
          setData(response.data);
        } else {
          document.querySelector(
            "#tbl_hs_ls"
          ).innerHTML = `<tr><td colspan="5">Data not avaiable</td></tr>`;
          return true;
        }
      })
      .catch((error) => console.log(error));
  };

  const getLsTableData = () => {
    let url = `${env.ITRM_KPI_URL}/crude_procurement_detail/?refinery=mumbai&data_type=ytm&oil_type=ls&region=${props.regionName}`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((response) => {
        if (response.data.length > 0) {
          let total = 0;
          response.data.map((el) => {
            total =
              el.term_planned +
              el.term_procured +
              el.term_arrived +
              el.spot_procured +
              el.spot_arrived +
              el.indegenous_planned +
              el.indegenous_procured +
              el.indegenous_arrived;
            setLsTotal(total);
          });
          setLsData(response.data);
        } else {
          document.querySelector(
            "#tbl_hs_ls"
          ).innerHTML = `<tr><td colspan="5">Data not avaiable</td></tr>`;
          return true;
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTableData();
    getLsTableData();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.mapTable}`}>
      <table>
        <thead>
          <tr>
            <td className={`${styles.col}`}>Product</td>
            <td className={`${styles.col}`}>Term</td>
            <td className={`${styles.col}`}>Spot</td>
            <td className={`${styles.col}`}>Indigenous</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody id='tbl_hs_ls'>
          <tr>
            <td className={`${styles.col}`}></td>
            <td className={`${styles.col}`}>
              <table>
                <tbody>
                  <tr>
                    <td className={`${styles.col}`}>
                      <i>Plan.</i>
                    </td>
                    <td className={` ${styles.col}`}>
                      <i>Pro.</i>
                    </td>
                    <td>
                      <i>Arr.</i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className={`${styles.col}`}>
              <table>
                <tbody>
                  <tr>
                    <td className={`${styles.col} ${styles.middleTd}`}>
                      <i>Pro.</i>
                    </td>
                    <td className={`${styles.middleTd}`}>
                      <i>Arr.</i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className={`${styles.col}`}>
              <table>
                <tbody>
                  <tr>
                    <td className={`${styles.col}`}>
                      <i>Plan.</i>
                    </td>
                    <td className={`${styles.col}`}>
                      <i>Pro.</i>
                    </td>
                    <td>
                      <i>Arr.</i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td></td>
          </tr>

          <tr>
            <td className={`${styles.col}`}>HS</td>
            <td className={`${styles.col}`}>
              <table>
                <tbody>
                  {data.map((el, index) => (
                    <tr key='hs_term_key'>
                      <td
                        key='hs_term_planned'
                        className={`${styles.innerTable1} ${styles.col}`}
                      >
                        {el.term_planned}
                      </td>
                      <td
                        key='hs_term_procured'
                        className={`${styles.innerTable1} ${styles.col}`}
                      >
                        {el.term_procured}
                      </td>
                      <td key='hs_term_arrived'>{el.term_arrived}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>

            <td className={`${styles.col}`}>
              <table>
                <tbody>
                  {data.map((el) => (
                    <tr key='hs_spot_key'>
                      <td
                        key='hs_spot_procured'
                        className={`${styles.col} ${styles.middleTd}`}
                      >
                        {el.spot_procured}
                      </td>
                      <td
                        key='hs_spot_arrived'
                        className={`${styles.middleTd}`}
                      >
                        {el.spot_arrived}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>

            <td className={`${styles.col}`}>
              <table>
                <tbody>
                  {data.map((el) => (
                    <tr key='hs_indegenous_key'>
                      <td
                        key='hs_indegenous_planned'
                        className={`${styles.innerTable1} ${styles.col}`}
                      >
                        {el.indegenous_planned}
                      </td>
                      <td
                        key='hs_indegenous_procured'
                        className={`${styles.innerTable1} ${styles.col}`}
                      >
                        {el.indegenous_procured}
                      </td>
                      <td key='hs_indegenous_arrived'>
                        {el.indegenous_arrived}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td>{hsTotal}</td>
          </tr>

          <tr>
            <td className={`${styles.col}`}>LS</td>

            <td className={`${styles.col}`}>
              <table>
                <tbody>
                  {lsData.map((el) => (
                    <tr key='ls_term_key'>
                      <td
                        key='ls_term_planned'
                        className={`${styles.innerTable1} ${styles.col}`}
                      >
                        {el.term_planned}
                      </td>
                      <td
                        key='ls_term_procured'
                        className={`${styles.innerTable1} ${styles.col}`}
                      >
                        {el.term_procured}
                      </td>
                      <td key='ls_term_arrived'>{el.term_arrived}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>

            <td className={`${styles.col}`}>
              <table>
                <tbody>
                  {lsData.map((el) => (
                    <tr key='ls_spot_key'>
                      <td
                        key='ls_spot_procured'
                        className={`${styles.col} ${styles.middleTd}`}
                      >
                        {el.spot_procured}
                      </td>
                      <td
                        key='ls_spot_arrived'
                        className={`${styles.middleTd}`}
                      >
                        {el.spot_arrived}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>

            <td className={`${styles.col}`}>
              <table>
                <tbody>
                  {data.map((el) => (
                    <tr key='ls_indegenous_key'>
                      <td
                        key='ls_indegenous_planned'
                        className={`${styles.innerTable1} ${styles.col}`}
                      >
                        {el.indegenous_planned}
                      </td>
                      <td
                        key='ls_indegenous_procured'
                        className={`${styles.innerTable1} ${styles.col}`}
                      >
                        {el.indegenous_procured}
                      </td>
                      <td key='ls_indegenous_arrived'>
                        {el.indegenous_arrived}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td>{lsTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
