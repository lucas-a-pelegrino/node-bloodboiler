const app = require('./src/config/express');
const { logger } = require('./src/utils');

const port = app.get('port');

app.listen(port, () =>
  logger.info(`Application currently running on port: ${port} for ${process.env.NODE_ENV}`),
);
