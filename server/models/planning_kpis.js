const mongoose = require('mongoose')

// const Schema = mongoose.Schema
// const ObjectId = Schema.Types.ObjectId

const schema = new mongoose.Schema({
    kpi_name: { type: String },
    total_marks: { type: Number },
    raw_score: { type: Number }, // in percentage
    score: { type: Number }, // out of total marks
    rating: { type: String },
    target: { type: Number },
    actual: { type: Number },
    unit: { type: String },
    currency: { type: String },
    remarks: { type: String },
    date: { type: Date },
    data_type: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('planning_kpi', schema)