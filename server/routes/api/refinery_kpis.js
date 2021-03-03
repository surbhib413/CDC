const express = require("express");
const router = express.Router();
const refineryKpiCtrl = require("../../controller/refinery_kpis")

router.get("/", (req, res) => {
    res.json({ message: "refinery kpis" }).status(200);
});
router.post('/bulk', refineryKpiCtrl.insertMany)

router.get('/fetch/all', refineryKpiCtrl.fetchAll)

router.get('/migrate/', refineryKpiCtrl.migrate)

/**
 * @swagger
 * /api/bpcl/refinery/year/data:
 *  get:
 *    tags:
 *      - Refinery KPI
 *    description: Get current financial year monthly data for GRM, Operating Cost, Enery Index
 *    parameters:
 *      - name: kpi_name
 *        in: query
 *        description: Name of the kpi
 *        required: true
 *      - name: refinery
 *        in: query
 *        description: Refinery name
 *        required: true
 *      - name: unit
 *        in: query
 *        description: unit
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *           type: array
 *           items: 
 *              $ref: "#/definitions/Refinery KPI"
 */
router.get('/year/data', refineryKpiCtrl.getYearDataForKpi)

/**
 * @swagger
 * /api/bpcl/refinery/month/data:
 *  get:
 *    tags:
 *      - Refinery KPI
 *    description: Get last month data for Distillate Yield, Production, Delivered
 *    parameters:
 *      - name: kpi_name
 *        in: query
 *        description: Name of the kpi
 *        required: true
 *      - name: refinery
 *        in: query
 *        description: Refinery name
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *           type: array
 *           items: 
 *              $ref: "#/definitions/Refinery KPI"
 */
router.get('/month/data', refineryKpiCtrl.getMonthDataForKpi)

/**
 * @swagger
 * /api/bpcl/refinery/day/data:
 *  get:
 *    tags:
 *      - Refinery KPI
 *    description: Get current day data for Distillate Yield, Production, Delivered, Product Inventory, Unit wise utilization, Crude oil inventory
 *    parameters:
 *      - name: kpi_name
 *        in: query
 *        description: Name of the kpi
 *        required: true
 *      - name: refinery
 *        in: query
 *        description: Refinery name
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *           type: array
 *           items: 
 *              $ref: "#/definitions/Refinery KPI"
 */
router.get('/day/data', refineryKpiCtrl.getDayDataForKpi)

router.post('/upload/:filename', refineryKpiCtrl.uploadExcel)

module.exports = router;