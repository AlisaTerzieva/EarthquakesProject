const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ObjId = Schema.Types.ObjectId;

let ReportSchema = new Schema({
  text: { type: String, required: true },
  strength: { type: Number, required: true },
  authorId: { type: String },
  authorName: { type: String },
  eventId: {  type: ObjId, ref: 'Event', required: true  },
  author: { type: ObjId, ref: 'User', required: true }
})

module.exports = mongoose.model('Report', ReportSchema);
