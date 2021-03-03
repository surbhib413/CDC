const custCompModel = require('../models/bu_customer_complaint')

const save = (data) => {
    return new Promise((resolve, reject) => {
        let kpiData = new custCompModel(data)
        kpiData.save((err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const saveBulk = (data) => {
    return new Promise((resolve, reject) => {
        custCompModel.insertMany(data, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const fetch = (query) => {
    return new Promise((resolve, reject) => {
        custCompModel.find(query, null, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const sortAndFetch = (query, sort) => {
    return new Promise((resolve, reject) => {
        custCompModel.find(query, null, sort, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const aggregate = (query) => {
    return new Promise((resolve, reject) => {
        custCompModel.aggregate(query, (err, result) => {
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