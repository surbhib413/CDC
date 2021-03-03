const mongoose = require('mongoose')

// const Schema = mongoose.Schema
// const ObjectId = Schema.Types.ObjectId

const schema = new mongoose.Schema({
    kpi_name: { type: String },
    refinery: { type: String },
    actual: { type: Number },
    target: { type: Number },
    product: { type: String }, // LPG, Petrol
    frequency: { type: String }, // monthly or daily
    delta: { type: Number },
    entry_date: { type: Date },
    unit: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('refinery_kpi', schema)