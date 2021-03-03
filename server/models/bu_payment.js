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
    amount: { type: Number },
    less_than_five_days: { type: Number },
    five_to_ten_days: { type: Number },
    not_due: { type: Number },
    zero_to_three_months: { type: Number },
    three_to_six_months: { type: Number },
    six_to_twelve_months: { type: Number },
    twelve_to_thirty_six_months: { type: Number },
    legal: { type: Number },
    time_range: { type: String }, //remove later
    growth: { type: Number },
    overall_growth: { type: Number },
    product: { type: String },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_payment', schema)