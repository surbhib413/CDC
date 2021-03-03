const express = require("express");
const router = express.Router();
const crudeProcureCtrl = require("../../controller/crude_procurement")
const crudeProcureDetailCtrl = require("../../controller/crude_procurement_detail")
const landedCostCtrl = require("../../controller/landed_cost")

router.get("/", (req, res) => {
    res.json({ message: "itrm kpis" }).status(200);
});
router.get('/crude_procurement/fetch/all', crudeProcureCtrl.fetchAll)
router.get('/crude_procurement/migrate/', crudeProcureCtrl.migrate)
router.post('/crude_procurement/bulk', crudeProcureCtrl.insertMany)

router.get('/crude_procurement_detail/fetch/all', crudeProcureDetailCtrl.fetchAll)
router.get('/crude_procurement_detail/migrate/', crudeProcureDetailCtrl.migrate)
router.post('/crude_procurement_detail/bulk', crudeProcureDetailCtrl.insertMany)

router.get('/landed_cost/fetch/all', landedCostCtrl.fetchAll)
router.get('/landed_cost/migrate/', landedCostCtrl.migrate)
router.post('/landed_cost/bulk', landedCostCtrl.insertMany)

/**
 * @swagger
 * /api/bpcl/itrm/crude_procurement/region:
 *  get:
 *    tags:
 *      - ITRM KPI
 *    description: Get crude procurement data by region
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/crude_procurement/region', crudeProcureCtrl.getDataForCrudeProcurmentByRegion)

/**
 * @swagger
 * /api/bpcl/itrm/crude_procurement/country:
 *  get:
 *    tags:
 *      - ITRM KPI
 *    description: Get crude procurement data by country
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/crude_procurement/country', crudeProcureCtrl.getYtmDataForCrudeProcurmentByCountry)

/**
 * @swagger
 * /api/bpcl/itrm/crude_procurement_detail/:
 *  get:
 *    tags:
 *      - ITRM KPI
 *    description: Get crude procurement data by region
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/crude_procurement_detail/', crudeProcureDetailCtrl.getDataForCrudeProcurmentByRegion)

/**
 * @swagger
 * /api/bpcl/itrm/landed_cost:
 *  get:
 *    tags:
 *      - ITRM KPI
 *    description: Get landed cost data for month
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/landed_cost', landedCostCtrl.getDataForLandedCostByRegion)

module.exports = router;