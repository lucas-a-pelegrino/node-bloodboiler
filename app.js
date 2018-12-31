const app = require('./src/config/express');

const port = app.get('port');

app.listen(port, () => console.info(`Application running on port: ${port}`));
