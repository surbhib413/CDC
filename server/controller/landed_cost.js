const landedCostSrvc = require('../services/landed_cost')
const utility = require("../utils/utililty")
const axios = require('axios')
const URL = require('../config/default').migURL

const insertOne = async (req, res) => {
    try {
        const result = await landedCostSrvc.save(req.body)
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const insertMany = async (req, res) => {
    try {
        const result = await landedCostSrvc.saveBulk(req.body)
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

// get landed cost, ocean loss, demurrage data for month
const getDataForLandedCostByRegion = async (req, res) => {
    try {
        let financialYearDate = utility.getCurrFinDate()
        let refineryName = new RegExp(["^", req.query.refinery, "$"].join(""), "i")
        let regionName = new RegExp(["^", req.query.region, "$"].join(""), "i")
        let dataType = new RegExp(["^", req.query.data_type, "$"].join(""), "i")
        let query = {
            refinery: refineryName,
            region: regionName,
            data_type: dataType,
            date: { $gt: financialYearDate }
        }
        const result = await landedCostSrvc.sortAndFetch(query, { sort: { date: 1 } })
        res.status(200).send({
            success: true,
            count: result.length,
            data: result
        })
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const fetchAll = async (req, res) => {
    try {
        const result = await landedCostSrvc.fetch({})
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const migrate = async (req, res) => {
    try {
        let result = []
        axios.get(`${URL}/api/bpcl/itrm/landed_cost/fetch/all`)
            .then(async response => {
                result = response.data
                console.log("fetched data :", result.length)
                // create json file in mongo_data folder
                await utility.writeFile('./mongo_data/landed_cost.json', JSON.stringify(result))
                // insert all data in db
                const insertedData = await landedCostSrvc.saveBulk(result)
                console.log("inserted data :", result.length)
                res.status(200).send({
                    fetched_data: result.length,
                    insert_data: insertedData.length,
                    data: insertedData
                })
            })
            .catch(error => {
                console.log(error);
            });
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

module.exports = {
    insertOne,
    insertMany,
    getDataForLandedCostByRegion,
    fetchAll,
    migrate
}
