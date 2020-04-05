const sharp = require('sharp');
const ModelRepository = require('./model.repository');
const AttachModel = require('./../schemas/attachment');
const fs = require('fs').promises;
const omit = require('lodash/omit');

class AttachmentRepository extends ModelRepository {
  async createAttachment(attach) {
    try {
      return new AttachModel(attach).save()
    } catch(err) {
      return Promise.reject(err);
    }
	}

	async createAttachmentList(attaches) {
		try {
			return AttachModel.insertMany(attaches);
		} catch(err) {
      return Promise.reject(err);
    }
	}

	async resizeAttachment(resourceId, size) {
		const attachment = await this.findAttachment(({_id: resourceId}));
		const inputFile = attachment.path;
		const outputFile = `${attachment.path}_${size}`;

		try {
			const resizedAttach = await this.findAttachment({path:outputFile});

			if (resizedAttach) {
				return Promise.resolve(resizedAttach);
			}

			await sharp(inputFile).resize({width: size}).toFile(outputFile);
			const originAttach = omit(attachment._doc, '_id');
			return this.createAttachment({...originAttach, path: outputFile})
		} catch (err) {
			return Promise.reject(err)
		}
	}

	async findAttachment(query) {
		return AttachModel.findOne(query).exec();
	}

	async readAttachmentAsImage(path) {
		try {
			const encoding = 'base64';
			const image = await fs.readFile(path);
			const encodedImage = image.toString(encoding);
			const bufferedImage = Buffer.from(encodedImage, encoding);
			return Promise.resolve(bufferedImage);
		} catch(err) {
			return Promise.reject(err);
		}
	}
}

module.exports = new AttachmentRepository();