const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    business_unit: { type: String },
    level: { type: String },
    country: { type: String },
    region: { type: String },
    state: { type: String },
    territory: { type: String },
    district: { type: String },
    sales: {
        actual: { type: Number },
        target: { type: Number },
        contribution: { type: Number },
        rating: { type: String }
    },
    revenue: {
        actual: { type: Number },
        target: { type: Number },
        contribution: { type: Number },
        rating: { type: String }
    },
    mkt_share: {
        actual: { type: Number },
        target: { type: Number },
        rating: { type: String }
    },
    hsse: {
        lost_man_hours: { type: Number },
        incidents: { type: Number },
        rating: { type: String }
    },
    depot: {
        above: { type: Number },
        below: { type: Number },
        rating: { type: String }
    },
    plant: {
        bottling: { type: Number },
        blending: { type: Number },
        filling: { type: Number },
        plan_vs_actual: {
            above: { type: Number },
            below: { type: Number }
        },
        bulk_inventory: { type: Number },
        cylinder_inventory: { type: Number },
        loss_gain: { type: Number },
        rating: { type: String }
    },
    supply: {
        incoming: { type: Number },
        planned_demand: { type: Number },
        actual_sales: { type: Number },
        rating: { type: String }
    },
    rating: { type: String },
    product: { type: String },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_overall', schema)