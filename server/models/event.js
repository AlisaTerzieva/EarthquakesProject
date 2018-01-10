const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let eventSchema = new Schema({
  id: { type: String, required: true, unique:true },
  dateTime: { type: Date, required: true },
  latitude_deg: { type: Number, required: true },
  latitude: { type: String, required: true },
  longitude_deg: { type: Number, required: true },
  longitude: { type: String, required: true },
  depth: { type: Number, required: true },
  magnitude_type: { type: String },
  magnitude: { type: Number, required: true },
  region: { type: String, required: true }
})

module.exports = mongoose.model('Event', eventSchema);