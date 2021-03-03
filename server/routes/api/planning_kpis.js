//Will countain integration of of first KPI with DB
const express = require("express");
const router = express.Router();
const planningKpiCtrl = require("../../controller/planning_kpis")

router.get("/", (req, res) => {
    res.json({ message: "plannning kpis" }).status(200);
});

router.post('/', planningKpiCtrl.insertOne)
router.post('/bulk', planningKpiCtrl.insertMany)

router.get('/fetch/all', planningKpiCtrl.fetchAll)

router.get('/migrate/', planningKpiCtrl.migrate)

/**
 * @swagger
 * /api/bpcl/planning/mandatory:
 *  get:
 *    tags:
 *      - Planning KPI
 *    description: Get mandatory kpi list with latest quater data
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *           type: array
 *           items: 
 *              $ref: "#/definitions/Planning KPI"
 */
router.get('/mandatory', planningKpiCtrl.getMandatoryKpi)

/**
 * @swagger
 * /api/bpcl/planning/other:
 *  get:
 *    tags:
 *      - Planning KPI
 *    description: Get other kpi list with latest month data
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *           type: array
 *           items: 
 *              $ref: "#/definitions/Planning KPI"
 */
router.get('/other', planningKpiCtrl.getOtherKpi)

/**
 * @swagger
 * /api/bpcl/planning/mandatory/data/{kpi_name}:
 *  get:
 *    tags:
 *      - Planning KPI
 *    description: Get kpi data for the current financial year
 *    parameters:
 *      - name: kpi_name
 *        in: path
 *        description: Name of the kpi
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *           type: array
 *           items: 
 *              $ref: "#/definitions/Planning KPI"
 */
router.get('/mandatory/data/:kpi_name', planningKpiCtrl.getFinYearMandatoryData)

/**
 * @swagger
 * /api/bpcl/planning/other/data/{kpi_name}:
 *  get:
 *    tags:
 *      - Planning KPI
 *    description: Get kpi data for the current financial year
 *    parameters:
 *      - name: kpi_name
 *        in: path
 *        description: Name of the kpi
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *           type: array
 *           items: 
 *              $ref: "#/definitions/Planning KPI"
 */
router.get('/other/data/:kpi_name', planningKpiCtrl.getFinYearOtherData)

// router.get('/overall/performance/', planningKpiCtrl.getOverallKpiPerformance)

// router.get('/latest/:kpi_name', planningKpiCtrl.getLatestKpiData)

router.post('/upload/:filename', planningKpiCtrl.uploadExcel)

module.exports = router;
