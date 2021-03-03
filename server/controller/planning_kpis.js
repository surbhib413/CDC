const planningKpiSrvc = require('../services/planning_kpis')
const utility = require("../utils/utililty")
const axios = require('axios')
const URL = require('../config/default').migURL




const insertOne = async (req, res) => {
    try {
        const result = await planningKpiSrvc.save(req.body)
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const insertMany = async (req, res) => {
    try {
        const result = await planningKpiSrvc.saveBulk(req.body)
        res.send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

// get mandatory kpi list
const getMandatoryKpi = async (req, res) => {
    try {
        let startOfQuater = "2019-10-01T18:30:00.000Z"
        let endOfQuater = "2019-12-30T18:30:00.000Z"

        let query = {
            data_type: "ytq",
            date: { $gt: startOfQuater, $lt: endOfQuater }
        }
        let result = await planningKpiSrvc.fetch(query)
        // console.log(result)
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

// get other kpi list
const getOtherKpi = async (req, res) => {
    try {
        let startOfMonth = utility.getStartOfMonth()

        let result = await planningKpiSrvc.fetch({ data_type: "ytm", date: { $gt: startOfMonth } })
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

// get other kpi data for the current financial year
const getFinYearOtherData = async (req, res) => {
    try {
        let finalResult = new Array(12).fill({})
        let result = []
        let financialYearDate = utility.getCurrFinDate()
        let kpiName = new RegExp(["^", req.params.kpi_name, "$"].join(""), "i")

        let query = {
            kpi_name: kpiName,
            data_type: "ytm",
            date: { $gt: financialYearDate }
        }
        result = await planningKpiSrvc.sortAndFetch(query, { sort: { date: 1 } })
        // console.log(result)
        for (let i = 0; i < result.length; i++) {
            finalResult[i] = result[i]
        }
        res.status(200).send(finalResult)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

// get mandatory kpi data for the current financial year
const getFinYearMandatoryData = async (req, res) => {
    try {
        let result = []
        let currFinDate = utility.getCurrFinDate()
        let kpiName = new RegExp(["^", req.params.kpi_name, "$"].join(""), "i")
        result = await planningKpiSrvc.sortAndFetch({
            kpi_name: kpiName,
            data_type: "ytq",
            date: { $gt: currFinDate }
        }, { sort: { date: 1 } })
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}


// get overall kpi performance
const getOverallKpiPerformance = async (req, res) => {
    // try {
    //     let quaterKpi = [],
    //         monthlyKpi = []
    //     let totalMarks = 0,
    //         score = 0

    //     let result = quaterKpi.concat(monthlyKpi)
    //     result.forEach(item => {
    //         totalMarks += item.total_marks
    //         score += item.score
    //     })
    //     // console.log("total", totalMarks)
    //     // console.log("score", score / totalMarks)
    //     res.status(200).send({ overall_percentage: Math.floor((score / totalMarks) * 100) })
    // } catch (err) {
    //     res.status(500).send({
    //         message: "Internal server error"
    //     })
    // }
}

const uploadExcel = async (req, res) => {
    const result = await utility.excelToJson(req.params.filename)
    if (result.data) {
        // console.log(result.data)
        let newResult = []
        result.data.forEach(item => {
            console.log(item)
            newResult.push({
                mycolumn1: item.column1,
                mycolumn2: item.column2
            })
        })
        console.log(newResult)
    }
}

const fetchAll = async (req, res) => {
    try {
        const result = await planningKpiSrvc.fetch({})
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
        axios.get(`${URL}/api/bpcl/planning/fetch/all`)
            .then(async response => {
                result = response.data
                console.log("fetched data :", result.length)
                // create json file in mongo_data folder
                // await utility.writeFile('./mongo_data/planning_kpi.json', JSON.stringify(result))
                // insert all data in db
                const insertedData = await planningKpiSrvc.saveBulk(result)
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
    getMandatoryKpi,
    getOtherKpi,
    // getLatestKpiData,
    getFinYearMandatoryData,
    getFinYearOtherData,
    getOverallKpiPerformance,
    uploadExcel,
    fetchAll,
    migrate
}