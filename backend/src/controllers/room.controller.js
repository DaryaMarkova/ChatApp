const RoomRepository = require('./../repositories/room.repository');

class RoomController  {
    constructor(socket) {
			this.socket = socket;
    }

    getRoomList(req, res) {
			const userId = req.activeUser._id;

			RoomRepository
				.findRelatedRooms(userId)
				.then(list => res.status(200).json(list))
				.catch(err => res.status(501).json(err))
    }
}

module.exports = RoomController;