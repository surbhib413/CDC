const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    business_unit: { type: String },
    level: { type: String },
    country: { type: String },
    region: { type: String },
    state: { type: String },
    territory: { type: String },
    district: { type: String },
    bpcl: { type: Number },
    bpcl_target: { type: Number },
    iocl: { type: Number },
    iocl_target: { type: Number },
    hpcl: { type: Number },
    hpcl_target: { type: Number },
    shell: { type: Number },
    ril: { type: Number },
    nel: { type: Number },
    incidents: { type: Number },
    lost_man_hours: { type: Number },
    com: { type: String },
    product_segment: { type: String },
    customer_group: { type: String },
    depot_name: { type: String },
    plant_name: { type: String },
    supply_days: {
        actual: { type: Number },
        target: { type: Number }
    },
    supply: {
        actual: { type: Number },
        target: { type: Number }
    },
    total_loss: {
        actual: { type: Number },
        percent: { type: Number }
    },
    total_bottling: {
        actual: { type: Number },
        target: { type: Number }
    },
    loss_gain: {
        actual: { type: Number },
        target: { type: Number }
    },
    bulk_inventory: {
        actual: { type: Number },
        target: { type: Number }
    },
    cylinder_inventory: {
        actual: { type: Number },
        target: { type: Number }
    },
    incoming: {
        actual: { type: Number },
        target: { type: Number }
    },
    demand: {
        actual: { type: Number },
        target: { type: Number }
    },
    sales: {
        actual: { type: Number },
        target: { type: Number }
    },
    export: {
        actual: { type: Number },
        target: { type: Number }
    },
    channel: {
        actual: { type: Number },
        target: { type: Number }
    },
    direct: {
        actual: { type: Number },
        target: { type: Number }
    },
    institutional: {
        actual: { type: Number },
        target: { type: Number }
    },
    retail: {
        actual: { type: Number },
        target: { type: Number }
    },
    accident_free_hrs: { type: Number },
    cpa: { type: Number },
    kpi_name: { type: String },
    unit: { type: String },
    product: { type: String },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('bu_table_detail', schema)