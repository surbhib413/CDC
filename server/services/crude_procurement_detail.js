const crudeProcurementDetailModel = require('../models/crude_procurement_detail')
// const  = require('../models/crude_procurement')

const save = (data) => {
    return new Promise((resolve, reject) => {
        let kpiData = new crudeProcurementDetailModel(data)
        kpiData.save((err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const saveBulk = (data) => {
    return new Promise((resolve, reject) => {
        crudeProcurementDetailModel.insertMany(data, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const fetch = (query) => {
    return new Promise((resolve, reject) => {
        crudeProcurementDetailModel.find(query, null, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const sortAndFetch = (query, sort) => {
    return new Promise((resolve, reject) => {
        crudeProcurementDetailModel.find(query, null, sort, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

const aggregate = (query) => {
    return new Promise((resolve, reject) => {
        crudeProcurementDetailModel.aggregate(query, (err, result) => {
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