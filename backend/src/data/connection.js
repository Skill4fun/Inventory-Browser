import mongoose from 'mongoose';
import logger from '../logger';
import config from '../config';

export default async function connectToDatabase() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('connected to db!');
  } catch (error) {
    logger.error(error.message);
  }
}

export async function connectToTestDatabase() {
  try {
    await mongoose.connect(config.mongoTestUri);
    logger.info('connected to TEST db!');
  } catch (error) {
    logger.error(error.message);
  }
}
