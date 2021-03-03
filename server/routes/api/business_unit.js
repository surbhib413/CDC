const express = require("express");
const router = express.Router();
const buKpiCtrl = require("../../controller/business_unit")
const buCusCompCtrl = require("../../controller/bu_customer_complaint")
const inventoryCtrl = require("../../controller/bu_inventory")
const operatingCostCtrl = require("../../controller/bu_operating_cost")
const marketShareCtrl = require("../../controller/bu_market_share")
const nroLoyaltyCtrl = require("../../controller/bu_nro_loyalty")
const buOverallCtrl = require("../../controller/bu_overall")
const buTableOverallCtrl = require("../../controller/bu_table_overall")
const buTableDetailCtrl = require("../../controller/bu_table_detail")
const buCustPopulationCtrl = require("../../controller/bu_customer_population")
const buLossGainCtrl = require("../../controller/bu_loss_gain_analysis")
const buDiscountSalesCtrl = require("../../controller/bu_discount_sales")
const buPaymentCtrl = require("../../controller/bu_payment")
const buKeyCustCtrl = require("../../controller/bu_key_customer_growth")
const buIndendRatioCtrl = require("../../controller/bu_indendation_ratio")

router.get("/", (req, res) => {
    res.json({ message: "BU kpis" }).status(200);
});
router.get('/fetch/all', buKpiCtrl.fetchAll)
router.get('/migrate/', buKpiCtrl.migrate)
router.post('/bulk', buKpiCtrl.insertMany)

router.get('/complaints/fetch/all', buCusCompCtrl.fetchAll)
router.get('/complaints/migrate/', buCusCompCtrl.migrate)
router.post('/complaints/bulk', buCusCompCtrl.insertMany)

router.get('/inventory/fetch/all', inventoryCtrl.fetchAll)
router.get('/inventory/migrate/', inventoryCtrl.migrate)
router.post('/inventory/bulk', inventoryCtrl.insertMany)

router.get('/operating/fetch/all', operatingCostCtrl.fetchAll)
router.get('/operating/migrate/', operatingCostCtrl.migrate)
router.post('/operating/bulk', operatingCostCtrl.insertMany)

router.get('/market/fetch/all', marketShareCtrl.fetchAll)
router.get('/market/migrate/', marketShareCtrl.migrate)
router.post('/market/bulk', marketShareCtrl.insertMany)

router.get('/retail_outlet/fetch/all', nroLoyaltyCtrl.fetchAll)
router.get('/retail_outlet/migrate/', nroLoyaltyCtrl.migrate)
router.post('/retail_outlet/bulk', nroLoyaltyCtrl.insertMany)

router.get('/overall/fetch/all', buOverallCtrl.fetchAll)
router.get('/overall/migrate/', buOverallCtrl.migrate)
router.post('/overall/bulk', buOverallCtrl.insertMany)

router.get('/table_overall/fetch/all', buTableOverallCtrl.fetchAll)
router.get('/table_overall/migrate/', buTableOverallCtrl.migrate)
router.post('/table_overall/bulk', buTableOverallCtrl.insertMany)

router.get('/table_detail/fetch/all', buTableDetailCtrl.fetchAll)
router.get('/table_detail/migrate/', buTableDetailCtrl.migrate)
router.post('/table_detail/bulk', buTableDetailCtrl.insertMany)

router.get('/customer_population/fetch/all', buCustPopulationCtrl.fetchAll)
router.get('/customer_population/migrate/', buCustPopulationCtrl.migrate)
router.post('/customer_population/bulk', buCustPopulationCtrl.insertMany)

router.get('/loss_gain/fetch/all', buLossGainCtrl.fetchAll)
router.get('/loss_gain/migrate/', buLossGainCtrl.migrate)
router.post('/loss_gain/bulk', buLossGainCtrl.insertMany)

router.get('/discount_sales/fetch/all', buDiscountSalesCtrl.fetchAll)
router.get('/discount_sales/migrate/', buDiscountSalesCtrl.migrate)
router.post('/discount_sales/bulk', buDiscountSalesCtrl.insertMany)

router.get('/payment/fetch/all', buPaymentCtrl.fetchAll)
router.get('/payment/migrate/', buPaymentCtrl.migrate)
router.post('/payment/bulk', buPaymentCtrl.insertMany)

router.get('/key_customer/fetch/all', buKeyCustCtrl.fetchAll)
router.get('/key_customer/migrate/', buKeyCustCtrl.migrate)
router.post('/key_customer/bulk', buKeyCustCtrl.insertMany)

router.get('/indendation_ratio/fetch/all', buIndendRatioCtrl.fetchAll)
router.get('/indendation_ratio/migrate/', buIndendRatioCtrl.migrate)
router.post('/indendation_ratio/bulk', buIndendRatioCtrl.insertMany)

/**
 * @swagger
 * /api/bpcl/business_unit/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for BU Kpis(sales, revenue, ethanol blending, transportation charges, commercial discount)
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: kpi_name
 *        in: query
 *        description: kpi name
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *      - name: product
 *        in: query
 *        description: name of product
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/data', buKpiCtrl.getDataForBusinessUnit)

/**
 * @swagger
 * /api/bpcl/business_unit/complaints/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for Customer complaints
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: kpi_name
 *        in: query
 *        description: kpi name
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *      - name: product
 *        in: query
 *        description: name of product
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/complaints/data', buCusCompCtrl.getDataForCcs)

/**
 * @swagger
 * /api/bpcl/business_unit/operating/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for operating cost
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: kpi_name
 *        in: query
 *        description: kpi name
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *      - name: product
 *        in: query
 *        description: name of product
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/operating/data', operatingCostCtrl.getDataForOperatingCost)

/**
 * @swagger
 * /api/bpcl/business_unit/inventory/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for Inventory
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: kpi_name
 *        in: query
 *        description: kpi name
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/inventory/data', inventoryCtrl.getDataForInventory)

/**
 * @swagger
 * /api/bpcl/business_unit/market/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for market share
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: kpi_name
 *        in: query
 *        description: kpi name
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *      - name: product
 *        in: query
 *        description: name of product
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/market/data', marketShareCtrl.getDataForMarketShare)

/**
 * @swagger
 * /api/bpcl/business_unit/retail_outlet/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for retail outlet in Retail
 *    parameters:
  *      - name: kpi_name
 *        in: query
 *        description: kpi name
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: region
 *        in: query
 *        description: region name
 *        required: false
 *      - name: state
 *        in: query
 *        description: state name
 *        required: false
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/retail_outlet/data', nroLoyaltyCtrl.getDataForRetailOutlet)

/**
 * @swagger
 * /api/bpcl/business_unit/others/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for bu kpis(hsse)
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: kpi_name
 *        in: query
 *        description: kpi name
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: region
 *        in: query
 *        description: region name
 *        required: false
 *      - name: state
 *        in: query
 *        description: state name
 *        required: false
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *      - name: kpi type
 *        in: query
 *        description: name of product
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/others/data', buKpiCtrl.getDataForOthers)

/**
 * @swagger
 * /api/bpcl/business_unit/overall/data:
 *  get:
 *    tags:
 *      - BU Map Api
 *    description: Get data for BU map
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *      - name: product
 *        in: query
 *        description: name of product
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/overall/data', buOverallCtrl.getDataForBuOverall)

/**
 * @swagger
 * /api/bpcl/business_unit/table_overall/data:
 *  get:
 *    tags:
 *      - BU Table Api
 *    description: Get current financial for BU retail
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *      - name: product
 *        in: query
 *        description: name of product
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/table_overall/data', buTableOverallCtrl.getDataForBuTableOverall)

/**
 * @swagger
 * /api/bpcl/business_unit/table_detail/data:
 *  get:
 *    tags:
 *      - BU Table Api
 *    description: Get current financial for BU retail
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *      - name: product
 *        in: query
 *        description: name of product
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/table_detail/data', buTableDetailCtrl.getDataForTableDetail)

/**
 * @swagger
 * /api/bpcl/business_unit/customer_population/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for Customer Population in LPG
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: region
 *        in: query
 *        description: region name
 *        required: false
 *      - name: state
 *        in: query
 *        description: state name
 *        required: false
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/customer_population/data', buCustPopulationCtrl.getDataForCustPopulation)

/**
 * @swagger
 * /api/bpcl/business_unit/loss_gain/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for loss and gain analysis in Lubes
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: region
 *        in: query
 *        description: region name
 *        required: false
 *      - name: state
 *        in: query
 *        description: state name
 *        required: false
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/loss_gain/data', buLossGainCtrl.getDataForLossGain)

/**
 * @swagger
 * /api/bpcl/business_unit/discount_sales/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for Discount vs Sales Growth
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: region
 *        in: query
 *        description: region name
 *        required: false
 *      - name: state
 *        in: query
 *        description: state name
 *        required: false
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/discount_sales/data', buDiscountSalesCtrl.getDataForDiscountSales)

/**
 * @swagger
 * /api/bpcl/business_unit/payment/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for payment(outstanding, outstanding territory wise)
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: level
 *        in: query
 *        description: market level
 *        required: true
 *      - name: region
 *        in: query
 *        description: region name
 *        required: false
 *      - name: state
 *        in: query
 *        description: state name
 *        required: false
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/payment/data', buPaymentCtrl.getDataForPayment)

/**
 * @swagger
 * /api/bpcl/business_unit/key_customer/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for Key Customer in ATF
 *    parameters:
 *      - name: kpi_name
 *        in: query
 *        description: kpi name
 *        required: true
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: level
 *        in: query
 *        description: level
 *        required: true
 *      - name: region
 *        in: query
 *        description: region name
 *        required: false
 *      - name: state
 *        in: query
 *        description: state name
 *        required: false
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/key_customer/data', buKeyCustCtrl.getDataForKeyCustomer)

/**
 * @swagger
 * /api/bpcl/business_unit/indendation_ratio/data:
 *  get:
 *    tags:
 *      - BU Charts API
 *    description: Get data for Indendation ratio in I&C
 *    parameters:
 *      - name: business_unit
 *        in: query
 *        description: business unit
 *        required: true
 *      - name: level
 *        in: query
 *        description: level
 *        required: true
 *      - name: region
 *        in: query
 *        description: region name
 *        required: false
 *      - name: state
 *        in: query
 *        description: state name
 *        required: false
 *      - name: data_type
 *        in: query
 *        description: data type
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/indendation_ratio/data', buIndendRatioCtrl.getDataForIndendRatio)

module.exports = router;