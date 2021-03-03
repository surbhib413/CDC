const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    business_unit: { type: String },
    level: { type: String },
    country: { type: String },
    region: { type: String },
    state: { type: String },
    territory: { type: String },
    district: { type: String },
    value: { type: Number },
    ratio_range: { type: String },
    depot_type: { type: String },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_indendaton_ratio', schema)