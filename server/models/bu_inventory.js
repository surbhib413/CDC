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
    meets_target: { type: Number },
    below_target: { type: Number },
    above_target: { type: Number },
    below_norm: { type: Number },
    above_norm: { type: Number },
    depot_type: { type: String },
    product: { type: String },
    inventory_type: { type: String },
    inventory_count: { type: Number },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_inventory', schema)