import 'dotenv/config';

const dbConnectionUrl = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const dbConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default { dbConnectionUrl, dbConnectionOptions };
