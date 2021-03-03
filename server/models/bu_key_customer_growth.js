const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    business_unit: { type: String },
    level: { type: String },
    country: { type: String },
    region: { type: String },
    state: { type: String },
    territory: { type: String },
    district: { type: String },
    curr_year: { type: Number },
    prev_year: { type: Number },
    company_name: { type: String },
    percentage_growth: { type: Number },
    unit: { type: String },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_key_customer_growth', schema)