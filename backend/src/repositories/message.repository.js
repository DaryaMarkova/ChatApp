const MessageModel = require('./../schemas/message');
const DialogModel = require('./../schemas/dialog');
const RoomModel = require('./../schemas/room');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const ModelRepository = require('./model.repository');

class MessageRepository extends ModelRepository {
	constructor() {
    super(MessageModel);
	}
	
	async getMessageList(dialogId) {
		return MessageModel.find(
			{$or: [{dialog: dialogId}, {room: dialogId}]
		}).populate([{
				path: 'user',
				select: '-password'
			}, 
			{ path: 'dialog'}, 
			{	path: 'attachments'},
			{
				path: 'room',
				populate: {
					path: 'owner',
					select: '-password'
				},
				select: '-users'
			}])
	}

	async createMessageIntoRoom(message) {
		const messageModel = new MessageModel({
			...message,
			user: message.user ? new ObjectId(message.user) : null
		});
		
		try {
			const savedModel = await messageModel.save();
			
			await RoomModel.updateOne(
				{'_id': message.room},
				{ $set: { lastMessage: new ObjectId(savedModel._id) }}
			);

			return savedModel
				.populate([
					{ path: 'room', populate: ['users', 'owner', 'lastMessage'] },
					{ path: 'user' },
					{ path: 'attachments' }
				]).execPopulate();
		} catch(err) {
			return Promise.reject(err)
		}
	}

	async createMessageIntoDialog(message) {
		const messageModel = new MessageModel({
			...message,
			user: message.user ? new ObjectId(message.user) : null
		});

		try {
			const savedMessage = await messageModel.save();

			await DialogModel.updateOne(
				{'_id': message.dialog},
				{ $set: { lastMessage: new ObjectId(savedMessage._id) }}
			);

			return savedMessage.populate([
				{ path: 'user' }, 
				{ path: 'dialog', populate: ['partner', 'author'] },
				{ path: 'attachments' }
			]).execPopulate();
		} catch(err) {
			return Promise.reject(err)
		}
	}
}

module.exports = new MessageRepository();