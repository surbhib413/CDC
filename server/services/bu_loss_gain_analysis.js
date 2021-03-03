const buLossGainModel = require('../models/bu_loss_gain_analysis')

const save = (data) => {
    return new Promise((resolve, reject) => {
        let kpiData = new buLossGainModel(data)
        kpiData.save((err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const saveBulk = (data) => {
    return new Promise((resolve, reject) => {
        buLossGainModel.insertMany(data, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const fetch = (query) => {
    return new Promise((resolve, reject) => {
        buLossGainModel.find(query, null, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const sortAndFetch = (query, sort) => {
    return new Promise((resolve, reject) => {
        buLossGainModel.find(query, null, sort, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const aggregate = (query) => {
    return new Promise((resolve, reject) => {
        buLossGainModel.aggregate(query, (err, result) => {
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