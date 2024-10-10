import mongoose from 'mongoose';
import config from './config';
import logger from '../utils/logger';

class Database {
  private connectionString: string;

  constructor(connectionString: string = config.DB_CONNECTION_STRING!) {
    this.connectionString = connectionString;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.connectionString);
      logger.info(`Connected to database: ${this.connectionString}`);
    } catch (error) {
      logger.error(`Error connecting to database: ${error}`);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info('Disconnected from database');
    } catch (error) {
      logger.error(`Error disconnecting from database: ${error}`);
      throw error;
    }
  }
}

export default Database;
