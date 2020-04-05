const RoomModel = require('./../schemas/room');
const ModelRepository = require('./model.repository');

class RoomRepository extends ModelRepository {
	constructor() {
    super(RoomModel);
	}
	
	async findRelatedRooms(userId) {
		return RoomModel.find({
				$or: [{owner: userId}, {users: {$in: userId}}]
		}).sort('-updatedAt').populate(
				[
					{ path: 'users', select: '-password'}, 
					{ path: 'lastMessage'}
				]
		)
	}

	async findRoom(query) {
		return RoomModel.findOne(query);
	}

	async createRoom(room) {
		const foundRoom = await super.findModel({
			title: room.title
		})

		if (foundRoom) {
			return Promise.reject(false);
		}

		try {
			const roomModel =  await new RoomModel(room).save();

			return roomModel.populate([
				{ path: 'owner', select: '-password' },
				{ path: 'users', select: '-password' },
			]).execPopulate();
		} catch(err) {
			return Promise.reject(err);
		}
	}

	async deleteRoom(roomId) {
		return super.deleteModel(roomId);
	}
}

module.exports = new RoomRepository();