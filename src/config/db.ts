import mongoose, { Connection } from 'mongoose';
import logger from '../utils/logger';

class Database {
  private static connections: Map<string, Connection> = new Map();

  public static async connect(
    dbUri: string,
    connectionName: string,
  ): Promise<Connection> {
    if (Database.connections.has(connectionName)) {
      return Database.connections.get(connectionName) as Connection;
    }

    try {
      const connection = mongoose.createConnection(dbUri);

      Database.connections.set(connectionName, connection);

      connection.on('connected', () =>
        logger.info(`Mongoose connected to ${connectionName}`),
      );
      connection.on('error', err =>
        logger.error(`Mongoose connection error on ${connectionName}:`, err),
      );
      connection.on('disconnected', () =>
        logger.info(`Mongoose disconnected from ${connectionName}`),
      );

      return connection;
    } catch (error) {
      logger.error(`Unable to connect to database: ${connectionName}:`, error);

      throw error;
    }
  }

  public static async disconnectAll(): Promise<void> {
    for (const [connectionName, connection] of Database.connections) {
      try {
        await connection.close();
        logger.info('Disconnected from database');
      } catch (error) {
        logger.error(`Error closing connection ${connectionName}:`, error);

        throw error;
      }
    }
  }
}

export default Database;
