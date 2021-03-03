const crudeProcurementSrvc = require('../services/crude_procurement')
const utility = require("../utils/utililty")
const axios = require('axios')
const URL = require('../config/default').migURL

const insertOne = async (req, res) => {
    try {
        const result = await crudeProcurementSrvc.save(req.body)
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const insertMany = async (req, res) => {
    try {
        const result = await crudeProcurementSrvc.saveBulk(req.body)
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

// get crude procurement data for month
const getDataForCrudeProcurmentByRegion = async (req, res) => {
    try {
        let startOfMonth = utility.getStartOfMonth()
        let endOfMonth = utility.getEndOfMonth()
        let refineryName = new RegExp(["^", req.query.refinery, "$"].join(""), "i")
        let dataType = new RegExp(["^", req.query.data_type, "$"].join(""), "i")
        let query = {
            country: null,
            refinery: refineryName,
            data_type: dataType,
            date: { $gt: startOfMonth, $lte: endOfMonth }
        }
        // console.log(query)
        const result = await crudeProcurementSrvc.fetch(query)
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

// get crude procurement data for month
const getYtmDataForCrudeProcurmentByCountry = async (req, res) => {
    try {
        let startOfMonth = utility.getStartOfMonth()
        let endOfMonth = utility.getEndOfMonth()
        let refineryName = new RegExp(["^", req.query.refinery, "$"].join(""), "i")
        let region = new RegExp(["^", req.query.region, "$"].join(""), "i")
        let dataType = new RegExp(["^", req.query.data_type, "$"].join(""), "i")
        let query = {
            country: { $ne: null },
            region: region,
            refinery: refineryName,
            data_type: dataType,
            date: { $gt: startOfMonth, $lte: endOfMonth }
        }
        // console.log(query)
        const result = await crudeProcurementSrvc.fetch(query)
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
        const result = await crudeProcurementSrvc.fetch({})
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
        axios.get(`${URL}/api/bpcl/itrm/crude_procurement/fetch/all`)
            .then(async response => {
                result = response.data
                console.log("fetched data :", result.length)
                // create json file in mongo_data folder
                await utility.writeFile('./mongo_data/crude_procurement.json', JSON.stringify(result))
                // insert all data in db
                const insertedData = await crudeProcurementSrvc.saveBulk(result)
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
    getDataForCrudeProcurmentByRegion,
    getYtmDataForCrudeProcurmentByCountry,
    fetchAll,
    migrate
}
