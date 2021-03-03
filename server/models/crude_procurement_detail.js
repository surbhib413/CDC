const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    region: { type: String },
    refinery: { type: String },
    term_planned: { type: Number },
    term_procured: { type: Number },
    term_arrived: { type: Number },
    spot_procured: { type: Number },
    spot_arrived: { type: Number },
    indegenous_planned: { type: Number },
    indegenous_procured: { type: Number },
    indegenous_arrived: { type: Number },
    oil_type: { type: String },
    unit: { type: String },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('crude_procurement_detail', schema)