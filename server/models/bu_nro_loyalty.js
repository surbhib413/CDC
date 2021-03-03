const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // kpi_name: { type: String },
    // business_unit: { type: String },
    level: { type: String },
    country: { type: String },
    region: { type: String },
    state: { type: String },
    territory: { type: String },
    district: { type: String },
    nro_commissioned: { type: Number },
    nro_actual_sales: { type: Number },
    nro_target_sales: { type: Number },
    nro_sales_contribution: { type: Number },
    nro_volume_growth: { type: Number },
    loyalty_actual_sales: { type: Number },
    loyalty_target_sales: { type: Number },
    loyalty_sales_contribution: { type: Number },
    loyalty_volume_growth: { type: Number },
    ro_automated: { type: Number },
    digital_transactions: { type: Number },
    rating: { type: String },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_nro_loyalty', schema)