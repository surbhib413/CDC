const marketShareSrvc = require('../services/bu_market_share')
const utility = require("../utils/utililty")
const axios = require('axios')
const URL = require('../config/default').migURL

const insertOne = async (req, res) => {
    try {
        const result = await marketShareSrvc.save(req.body)
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const insertMany = async (req, res) => {
    try {
        const result = await marketShareSrvc.saveBulk(req.body)
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const getDataForMarketShare = async (req, res) => {
    try {
        let financialYearDate = utility.getCurrFinDate()
        let startOfMonth = utility.getStartOfMonth()
        let query = req.query
        // console.log(query)
        for (let key in query) {
            query[key] = new RegExp(["^", query[key], "$"].join(""), "i")
        }
        if (query.data_type == 'ytm') {
            query.date = { $gt: financialYearDate }
        } else if (query.data_type == 'monthly') {
            query.date = { $gt: startOfMonth }
        }
        // console.log(query)
        const result = await marketShareSrvc.sortAndFetch(query, { sort: { date: 1 } })
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
        const result = await marketShareSrvc.fetch({})
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
        axios.get(`${URL}/api/bpcl/business_unit/market/fetch/all`)
            .then(async response => {
                result = response.data
                console.log("fetched data :", result.length)
                // create json file in mongo_data folder
                await utility.writeFile('./mongo_data/bu_market_share.json', JSON.stringify(result))
                // insert all data in db
                const insertedData = await marketShareSrvc.saveBulk(result)
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
    getDataForMarketShare,
    fetchAll,
    migrate
}