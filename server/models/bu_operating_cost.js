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
    staff_cost: { type: Number },
    rm: { type: Number },
    rental: { type: Number },
    third_party: { type: Number },
    sales_promotion: { type: Number },
    bottling: { type: Number },
    transport: { type: Number },
    cnf: { type: Number },
    plant: { type: Number },
    others: { type: Number },
    target: { type: Number },
    percentage_growth: { type: Number },
    product: { type: String },
    unit: { type: String },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_operating_cost', schema)