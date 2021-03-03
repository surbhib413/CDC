const planningKpiModel = require('../models/planning_kpis')

const save = (data) => {
    return new Promise((resolve, reject) => {
        let kpiData = new planningKpiModel(data)
        kpiData.save((err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const saveBulk = (data) => {
    return new Promise((resolve, reject) => {
        planningKpiModel.insertMany(data, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const fetch = (query) => {
    return new Promise((resolve, reject) => {
        planningKpiModel.find(query, null, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const sortAndFetch = (query, sort) => {
    return new Promise((resolve, reject) => {
        planningKpiModel.find(query, null, sort, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

module.exports = {
    save,
    saveBulk,
    fetch,
    sortAndFetch
}