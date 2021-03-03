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
    resolution_time: { type: String }, // need to be removed data format changed
    resolved_cases: { type: Number }, // need to be removed data format changed
    total_complaints: { type: Number }, // need to be removed data format changed
    less_than_two_days: { type: Number },
    two_to_five_days: { type: Number },
    six_to_ten_days: { type: Number },
    more_than_ten_days: { type: Number },
    complaints_received: { type: Number },
    customer_satisfation: {
        actual: { type: Number },
        growth: { type: Number }
    },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_customer_complaint', schema)