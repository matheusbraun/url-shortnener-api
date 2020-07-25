import express from 'express';

import routes from './routes';

const app = express();

app.use('api/v1', routes);

app.listen(3333);
