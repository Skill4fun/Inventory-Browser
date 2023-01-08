import logger from './logger';
import app from './app';
import config from './config';
import connectToDatabase from './data/connection';

const PORT = config.port || 8080;

connectToDatabase();

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
