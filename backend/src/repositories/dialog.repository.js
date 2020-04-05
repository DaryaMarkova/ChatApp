const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const DialogModel = require('./../schemas/dialog');
const ModelRepository = require('./model.repository');
class DialogRepository extends ModelRepository {
  constructor() {
    super(DialogModel);
  }

  async findRelatedDialogs(authorId) {
    return DialogModel.find({
      $or: [{author: authorId}, {partner: authorId}]
    }).sort('-updatedAt').populate([
      { path: 'author', select: '-password'}, 
      { path: 'partner', select: '-password'}, 
      { path: 'lastMessage'}]
    )
  }

  async createDialog(dialog) {
    const { author, partner} = dialog;
    
    const foundDialog = await super.findModel({
      author: new ObjectId(author),
      partner: new ObjectId(partner)
    })

    if (foundDialog) {
      return Promise.reject(false);
    }

    try {
      const savedModel = await new DialogModel(dialog).save();
      return savedModel.populate(['partner', 'author']).execPopulate();
    } catch(err) {
      return Promise.reject(err)
    }
  }

  async deleteDialog(dialogId) {
    return super.deleteModel(dialogId);
  }
}

module.exports = new DialogRepository();