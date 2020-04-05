const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attachmentSchema = new Schema({
  originalname: String,
  mimetype: String,
  filename: String,
  path: String,
  size: Number,
  asImage: Boolean
}, {
  timestamps: true
});

const Attachment = mongoose.model('Attachment', attachmentSchema);
module.exports = Attachment;