const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    region: { type: String },
    refinery: { type: String }, // Mumbai or Kochi
    crude_cost_actual: { type: Number },
    crude_cost_target: { type: Number },
    freight_cost_actual: { type: Number },
    freight_cost_target: { type: Number },
    taxes_actual: { type: Number },
    taxes_target: { type: Number },
    ocean_loss: { type: Number },
    lp_in_hr: { type: Number },
    dp_in_hr: { type: Number },
    lp_in_rs: { type: Number },
    dp_in_rs: { type: Number },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('landed_cost_kpi', schema)