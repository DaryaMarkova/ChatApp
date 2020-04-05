var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dialogSchema = new Schema({
  partner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' }
}, {
  timestamps: true
});

var Dialog = mongoose.model('Dialog', dialogSchema);
module.exports = Dialog;