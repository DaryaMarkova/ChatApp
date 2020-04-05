const AttachRepository = require('./../repositories/attachment.repository');
const fs = require('fs');

class AttachmentController {
	constructor() {
		this.getOriginal = this.getOriginal.bind(this);
		this.getPreview = this.getPreview.bind(this);
	}

  create(req, res, next) {
		const file = req.file;

    if (!file) {
      const error = new Error('Wrong file uploaded');
      error.httpStatusCode = 400;
      return next(error);
    }

    AttachRepository
      .createAttachment({...file, asImage: req.body.asImage})
      .then((data) => res.status(201).send([data]))
      .catch(err => res.status(501).json(err))
	}

	createList(req, res, next) {
		const files = req.files;

    if (!files) {
      const error = new Error('Wrong file uploaded');
      error.httpStatusCode = 400;
      return next(error);
		}

		AttachRepository
			.createAttachmentList(files.map(it => ({...it, asImage: req.body.asImage})))
			.then((data) => res.status(201).send(data))
      .catch(err => res.status(501).json(err))
	}

	getOriginal(req, res) {
		const resourceId = req.params.id;

		AttachRepository
			.findAttachment({_id: resourceId})
			.then(resource => {
					AttachRepository.readAttachmentAsImage(resource._doc.path).then(image => {
						res.contentType(resource._doc.mimetype);
						res.send(image);
					});
			}).catch(err => res.status(501).json(err));
	}

	getPreview(req, res) {
		const smallPreviewSize = 100;
		const resourceId = req.params.id;
		
		AttachRepository
			.resizeAttachment(resourceId, smallPreviewSize)
			.then((data) => {
				AttachRepository
					.findAttachment({_id: data._doc._id})
					.then(resource => {
						AttachRepository.readAttachmentAsImage(resource._doc.path).then(image => {
							res.contentType(resource._doc.mimetype);
							res.send(image);
						})
					})
			}).catch(err => {
				res.status(500).json(err);
			});
	}
}

module.exports = AttachmentController;