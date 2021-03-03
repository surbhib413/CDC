const refineryKpiModel = require('../models/refinery_kpis')

const save = (data) => {
    return new Promise((resolve, reject) => {
        let kpiData = new refineryKpiModel(data)
        kpiData.save((err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const saveBulk = (data) => {
    return new Promise((resolve, reject) => {
        refineryKpiModel.insertMany(data, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const fetch = (query) => {
    return new Promise((resolve, reject) => {
        refineryKpiModel.find(query, null, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const sortAndFetch = (query, sort) => {
    return new Promise((resolve, reject) => {
        refineryKpiModel.find(query, null, sort, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const aggregate = (query) => {
    return new Promise((resolve, reject) => {
        refineryKpiModel.aggregate(query, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}



module.exports = {
    save,
    saveBulk,
    fetch,
    sortAndFetch,
    aggregate
}