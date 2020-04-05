const MessageRepository = require('./../repositories/message.repository');

class MessageController {
  constructor(socket) {
    this.socket = socket;
  }
	
	getMessageListByDialogId(req, res) {
		const dialogId = req.params.id;

		MessageRepository.getMessageList(dialogId).then(
			list => res.status(200).json(list)
		).catch(
			err => res.status(501).json(err)
		);
	}
}

module.exports = MessageController;