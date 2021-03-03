const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    kpi_name: { type: String },
    business_unit: { type: String },
    level: { type: String },
    country: { type: String },
    region: { type: String },
    state: { type: String },
    territory: { type: String },
    district: { type: String },
    bpcl: { type: Number },
    hpcl: { type: Number },
    iocl: { type: Number },
    connection: {
        actual: { type: Number },
        growth: { type: Number }
    },
    sbc: {
        actual: { type: Number },
        growth: { type: Number }
    },
    dbc: {
        actual: { type: Number },
        growth: { type: Number }
    },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_customer_population', schema)