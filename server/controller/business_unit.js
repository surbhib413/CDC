const buSrvc = require('../services/business_unit')
const utility = require("../utils/utililty")
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: 'BPCL CDC' });
const axios = require('axios')
const URL = require('../config/default').migURL


const insertOne = async (req, res) => {
    try {
        const result = await buSrvc.save(req.body)
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const insertMany = async (req, res) => {
    try {
        const result = await buSrvc.saveBulk(req.body)
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const getDataForBusinessUnit = async (req, res) => {
    try {
        log.info({ query: req.query, method: req.method });
        let financialYearDate = utility.getCurrFinDate()
        let startOfMonth = utility.getStartOfMonth()
        let query = req.query
        // console.log(query)
        for (let key in query) {
            query[key] = new RegExp(["^", query[key], "$"].join(""), "i")
        }
        if (query.data_type == 'ytm') {
            query.date = { $gt: financialYearDate }
        } else if (query.data_type == 'mtd') {
            query.date = { $gt: startOfMonth }
        }
        // console.log(query)
        const result = await buSrvc.sortAndFetch(query, { sort: { date: 1 } })
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

const getDataForOthers = async (req, res) => {
    try {
        let startOfMonth = utility.getStartOfMonth()
        let query = req.query
        // console.log(query)
        for (let key in query) {
            query[key] = new RegExp(["^", query[key], "$"].join(""), "i")
        }
        if (query.data_type == 'ytm') {
            query.date = { $gt: startOfMonth }
        } else if (query.data_type == 'mtd') {
            // query.date = { $gt: startOfMonth }
        }
        // console.log(query)
        const result = await buSrvc.sortAndFetch(query, { sort: { date: 1 } })
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
        const result = await buSrvc.fetch({})
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
        axios.get(`${URL}/api/bpcl/business_unit/fetch/all`)
            .then(async response => {
                result = response.data
                console.log("fetched data :", result.length)
                // create json file in mongo_data folder
                await utility.writeFile('./mongo_data/business_unit.json', JSON.stringify(result))
                // insert all data in db
                const insertedData = await buSrvc.saveBulk(result)
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
    getDataForBusinessUnit,
    getDataForOthers,
    fetchAll,
    migrate
}