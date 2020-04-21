const app = require('./src/config/express');
const { env } = require('./src/config/env');
const { logger } = require('./src/utils');

const port = app.get('port');

app.listen(port, () => logger.info(`Application currently running on port: ${port} for ${env}`));
