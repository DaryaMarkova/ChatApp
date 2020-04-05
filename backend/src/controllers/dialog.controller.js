const DialogRepository = require('./../repositories/dialog.repository');

class DialogController {
  constructor(socket) {
    this.socket = socket;
  }

  getDialogList(req, res) {
    const authorId = req.activeUser._id;

    DialogRepository
      .findRelatedDialogs(authorId)
      .then(list => res.status(200).json(list))
      .catch(err => res.status(501).json(err))
  }

  delete(req, res) {
    DialogRepository
      .deleteDialog(req.params.id)
      .then(_ => res.status(204))
      .catch(err => res.status(400).json(err))
  }
}

module.exports = DialogController;