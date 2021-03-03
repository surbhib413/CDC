const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    kpi_name: { type: String },
    actual: { type: Number },
    prev_year_actual: { type: Number },
    target: { type: Number },
    delta: { type: Number },
    yearly_delta: { type: String },
    target: { type: Number },
    actual: { type: Number },
    unit: { type: String },
    data_type: { type: String },
    kpi_type: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('organisation_kpi', schema)