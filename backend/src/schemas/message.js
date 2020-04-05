var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  text: String,
  unread: Boolean,
  dialog: { type: Schema.Types.ObjectId, ref: 'Dialog' },
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  attachments: [{ type: Schema.Types.ObjectId, ref: 'Attachment'}]
}, {
  timestamps: true
});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;