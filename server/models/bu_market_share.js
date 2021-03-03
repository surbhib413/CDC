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
    bpcl_target: { type: Number },
    hpcl: { type: Number },
    iocl: { type: Number },
    shell: { type: Number },
    shell: { type: Number },
    total: { type: Number },
    others: { type: Number },
    percentage_growth: { type: Number },
    product: { type: String },
    rating: { type: String },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_market_share', schema)