require('app-module-path/register');

const express = require('express');
const parser = require('body-parser');
const dotenv = require('dotenv');
const createRoutes = require('./config/route.config');
const createMongoose = require('./config/db.config');
const createSocket = require('./config/socket.config');
const app = express();
const http = require('http').createServer(app);
const socket = createSocket(http);
const cors = require('cors');

const mongoSanitize = require('express-mongo-sanitize');
const authMiddleware = require('./middleware/user.authorized');
const lastseenMiddleware = require('./middleware/user.lastseen');
const requestLogger = require('./middleware/request.interceptor');
const errorLogger = require('./middleware/error.interceptor');
const logger = require('./config/logger.config');

createMongoose();
dotenv.config();

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(requestLogger);
app.use(authMiddleware);
app.use(lastseenMiddleware);

createRoutes(app, socket);
app.use(errorLogger);

http.listen(process.env.PORT, () => {
  logger.debug(`Example app listening on port ${process.env.PORT}`);
});