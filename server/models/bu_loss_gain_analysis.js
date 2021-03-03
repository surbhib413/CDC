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
    blending: { type: Number },
    bulk_material: { type: Number },
    financial_goods: { type: Number },
    packaging_material: { type: Number },
    actual: { type: Number },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_loss_gain_analysis', schema)