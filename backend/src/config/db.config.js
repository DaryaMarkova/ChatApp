const mongoose = require('mongoose');
const logger = require('./logger.config');

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/chat',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    },
    (err) => {
      if (err) {
        logger.error('Mongo is definitely not launched ((')
			}
    }
  )
}