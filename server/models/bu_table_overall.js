const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    business_unit: { type: String },
    level: { type: String },
    country: { type: String },
    region: { type: String },
    state: { type: String },
    territory: { type: String },
    district: { type: String },
    sales_actual: { type: Number },
    sales_target: { type: Number },
    revenue_actual: { type: Number },
    revenue_target: { type: Number },
    bpcl_mkt_share_actual: { type: Number },
    bpcl_mkt_share_target: { type: Number },
    nro_sales_actual: { type: Number },
    nro_sales_target: { type: Number },
    hsse: { type: Number },
    com: { type: String },
    product_segment: { type: String },
    product: { type: String },
    product_group: { type: String },
    customer_group: { type: String },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_table_overall', schema)