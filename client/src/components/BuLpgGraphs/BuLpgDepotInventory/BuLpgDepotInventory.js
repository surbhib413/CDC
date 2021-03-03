import React, { useState, useEffect } from "react";
import expandIcon from "../../../assets/images/expandIcon.png";
import styles from "./BuLpgDepotInventory.module.scss";
import { Spinner } from "react-bootstrap";
import BuLpgInventoryPieChart from "./BuLpgInventoryPieChart";
import environment from "../../../environment";

function BuLpgDepotInventory(props) {
    const [cylinderPlantData, setCylinderPlantData] = useState([]);
    const [loading, setLoader] = useState(true);
    const [cylinderDistData, setCylinderDistData] = useState([]);
    const [bpclPlantData, setBpclPlantData] = useState([]);

    
    useEffect(() => {
      function prepareGraphData() {
          let url = `${environment.BU_KPI_URL}/inventory/data?business_unit=lpg&kpi_name=inventory&data_type=daily&level=country`;
          fetch(url, { method: "GET" })
              .then(res => res.json())
              .then(response => {
                  response.data.forEach((item, index) => {
                      if (item.inventory_type === "Cylinder plants") {
                          setCylinderPlantData(item);
                          setLoader(false);
                      }
                      else if (item.inventory_type === "Cylinder distributor") {
                          setCylinderDistData(item);
                      }
                      else if (item.inventory_type === "BPCL plants") {
                          setBpclPlantData(item);
                      }
                  });
  
              })
              .catch(error => console.log(error));
      }
        prepareGraphData();
    }, [props.activeTab])

    return (
        <div className={`${styles.BuDepotInventoryContiner}`}>
            <div className={`pt-2 ${styles.headerContainer}`}>
                <div className={`row`}>
                    <div className={`col-8`}>
                        <span>Inventory</span>
                    </div>
                </div>
                <div className={`row pt-2`}>
                    <div className={`col-9 d-flex align-items-center ${styles.headerLabels}`}>
                        <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.meetsDot}`}></span>Meets Target</div>
                        <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.belowDot}`}></span>Below Target</div>
                        <div className="d-flex mr-3 align-items-center "><span className={`mr-2 ${styles.morethanDot}`}></span>More than 10 days</div>
                    </div>
                </div>
            </div>
            <div className={`d-flex align-items-center ${styles.graphContainer}`}>
                <div className={`align-items-center text-center`} >
                    {
                        loading ?
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                            :
                            cylinderPlantData && <BuLpgInventoryPieChart graphData={cylinderPlantData}></BuLpgInventoryPieChart>
                    }
                    <span className={`${styles.pieChartLabel}`}> {cylinderPlantData.inventory_count} BPCL Plants (Bulk)</span>
                </div>

                <div className={`align-items-center text-center`} >
                    {
                        cylinderDistData ?
                            <BuLpgInventoryPieChart graphData={cylinderDistData}></BuLpgInventoryPieChart>
                            :
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                    }
                    <span className={`${styles.pieChartLabel}`}>{cylinderDistData.inventory_count} Cylinder (Distribution)</span>
                </div>

                <div className={`align-items-center text-center`} >
                    {
                        bpclPlantData ?
                            <BuLpgInventoryPieChart graphData={bpclPlantData}></BuLpgInventoryPieChart>
                            :
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                    }
                    <span className={`${styles.pieChartLabel}`}>{bpclPlantData.inventory_count} Cylinder (Plants)</span>
                </div>


            </div>
            <div className={`d-flex justify-content-end ${styles.expandIconContainer}`}>
                <img className={`${styles.expandIcon}`} src={expandIcon} alt='Expand Icon'></img>
            </div>
        </div >
    )
}
export default BuLpgDepotInventory;