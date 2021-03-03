const refineryKpiSrvc = require('../services/refinery_kpis')
const utility = require("../utils/utililty")
const axios = require('axios')
const URL = require('../config/default').migURL

const insertOne = async (req, res) => {
    try {
        const result = await refineryKpiSrvc.save(req.body)
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const insertMany = async (req, res) => {
    try {
        // console.log(req.body)
        const result = await refineryKpiSrvc.saveBulk(req.body)
        res.send(result)
    } catch (err) {
        // console.log(err)
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

// get refinery kpi data for year
const getYearDataForKpi = async (req, res) => {
    try {
        let kpiName = new RegExp(["^", req.query.kpi_name, "$"].join(""), "i")
        let refineryName = new RegExp(["^", req.query.refinery, "$"].join(""), "i")
        let unit = new RegExp(["^", req.query.unit, "$"].join(""), "i")
        let query = { kpi_name: kpiName, refinery: refineryName }
        if (req.query.unit) query.unit = unit
        let currFinDate = utility.getCurrFinDate()
        query.entry_date = { $gt: currFinDate }
        // console.log("query :", query)
        const result = await refineryKpiSrvc.sortAndFetch(query, { sort: { entry_date: 1 } })
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

// get refinery kpi data for month
const getMonthDataForKpi = async (req, res) => {
    try {
        let startOfMonth = utility.getStartOfMonth()
        let endOfMonth = utility.getEndOfMonth()
        let kpiName = new RegExp(["^", req.query.kpi_name, "$"].join(""), "i")
        let refineryName = new RegExp(["^", req.query.refinery, "$"].join(""), "i")
        let query = {
            kpi_name: kpiName,
            refinery: refineryName,
            frequency: "monthly",
            entry_date: { $gt: startOfMonth, $lte: endOfMonth }
        }
        // console.log(query)
        const result = await refineryKpiSrvc.fetch(query)
        // console.log(result)
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

// get refinery kpi data for day
const getDayDataForKpi = async (req, res) => {
    try {
        let startOfDay = utility.getStartOfDay()
        let endOfEnd = utility.getEndOfDay()
        // console.log("start", startOfDay)
        // console.log("end", endOfEnd)
        let query = {
            kpi_name: new RegExp(["^", req.query.kpi_name, "$"].join(""), "i"),
            refinery: new RegExp(["^", req.query.refinery, "$"].join(""), "i"),
            frequency: "daily",
            // entry_date: { $gt: startOfDay, $lte: endOfEnd }
        }
        const result = await refineryKpiSrvc.fetch(query)
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

const uploadExcel = async (req, res) => {
    const result = await utility.excelToJson(req.params.filename)
    if (result.data) {
        // console.log(result.data)
        let newResult = []
        result.data.forEach(item => {
            newResult.push({
                kpi_name: item.kpi_name,
                refinery: item.refinery,
                actual: item['actual'],
                target: item['target'],
                frequency: item['frequency'],
                unit: item.unit,
                entry_date: new Date(item['entry_date']),
                remarks: item['remarks']
            })
        })
        console.log(newResult)
        // newResult = await refineryKpiSrvc.saveBulk(newResult)
        res.json(newResult)
    }
}

const fetchAll = async (req, res) => {
    try {
        const result = await refineryKpiSrvc.fetch({})
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
        axios.get(`${URL}/api/bpcl/refinery/fetch/all`)
            .then(async response => {
                result = response.data
                console.log("fetched data :", result.length)
                // create json file in mongo_data folder
                await utility.writeFile('./mongo_data/refinery_kpis.json', JSON.stringify(result))
                // insert all data in db
                const insertedData = await refineryKpiSrvc.saveBulk(result)
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
    getYearDataForKpi,
    getMonthDataForKpi,
    getDayDataForKpi,
    uploadExcel,
    fetchAll,
    migrate
}