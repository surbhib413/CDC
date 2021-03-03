const discountSalesSrvc = require('../services/bu_discount_sales')
const utility = require("../utils/utililty")
const axios = require('axios')
const URL = require('../config/default').migURL

const insertOne = async (req, res) => {
    try {
        const result = await discountSalesSrvc.save(req.body)
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const insertMany = async (req, res) => {
    try {
        const result = await discountSalesSrvc.saveBulk(req.body)
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const getDataForDiscountSales = async (req, res) => {
    try {
        let startOfMonth = utility.getStartOfMonth()
        let query = req.query
        // console.log(query)
        for (let key in query) {
            query[key] = new RegExp(["^", query[key], "$"].join(""), "i")
        }
        query.date = { $gt: startOfMonth }
        // console.log(query)
        const result = await discountSalesSrvc.fetch(query)
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
        const result = await discountSalesSrvc.fetch({})
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
        axios.get(`${URL}/api/bpcl/business_unit/discount_sales/fetch/all`)
            .then(async response => {
                result = response.data
                console.log("fetched data :", result.length)
                // create json file in mongo_data folder
                await utility.writeFile('./mongo_data/bu_discount_sales.json', JSON.stringify(result))
                // insert all data in db
                const insertedData = await discountSalesSrvc.saveBulk(result)
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
    getDataForDiscountSales,
    fetchAll,
    migrate
}