const express = require("express");
const articleProviderMiddleware = require("./middlewares/articleProvider");
const requestLimiterMiddleware = require("./middlewares/requestLimiter");
const loggerMiddleware = require("./middlewares/logger");
const rateStorage = require("./services/rateStorage");
const articleStorage = require("./services/articleStorage");
const logger = require("./services/logger");

const app = express();

app.use(loggerMiddleware(logger));
app.get('/', requestLimiterMiddleware(rateStorage), articleProviderMiddleware(articleStorage));

app.listen(8000, () => {
  logger.log({ level: 'info', message: `Server running on http://localhost:8000` });
});
