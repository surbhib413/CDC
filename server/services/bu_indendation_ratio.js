const indendRatioModel = require('../models/bu_indendation_ratio')

const save = (data) => {
    return new Promise((resolve, reject) => {
        let kpiData = new indendRatioModel(data)
        kpiData.save((err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const saveBulk = (data) => {
    return new Promise((resolve, reject) => {
        indendRatioModel.insertMany(data, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const fetch = (query) => {
    return new Promise((resolve, reject) => {
        indendRatioModel.find(query, null, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const sortAndFetch = (query, sort) => {
    return new Promise((resolve, reject) => {
        indendRatioModel.find(query, null, sort, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const aggregate = (query) => {
    return new Promise((resolve, reject) => {
        indendRatioModel.aggregate(query, (err, result) => {
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