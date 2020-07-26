import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';
import { errorHandler, notFound } from './middlewares/error';
import dbConfig from './config/db';

const app = express();

mongoose.connect(dbConfig.dbConnectionUrl, dbConfig.dbConnectionOptions);

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

app.listen(3333);
