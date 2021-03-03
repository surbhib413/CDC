const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    region: { type: String },
    country_list: { type: Array },
    country: { type: String, default: null },
    regionCode: { type: String },
    country_code: { type: String },
    refinery: { type: String }, // Mumbai or Kochi
    term_hs: { type: Number }, // term procurement (high sulphur)
    term_ls: { type: Number }, // term procurement (low sulphur)
    spot_hs: { type: Number },
    spot_ls: { type: Number },
    indigenous_hs: { type: Number },
    indigenous_ls: { type: Number },
    overall_percentage: { type: Number },
    unit: { type: String },
    data_type: { type: String },
    date: { type: Date },
}, { timestamps: true })

// const schema = new mongoose.Schema({
//     country: { type: String, default: null },
//     region: { type: String },
//     refinery: { type: String }, // Mumbai or Kochi
//     procurement_type: { type: String }, // term, spot or indengenious
//     oil_type: { type: String }, // high sulphur or low sulphur
//     status: { type: String }, // procured or arrived
//     actual: { type: Number },
//     unit: { type: String },
//     data_type: { type: String },
//     date: { type: Date },
// }, { timestamps: true })

module.exports = mongoose.model('crude_procurement_kpi', schema)