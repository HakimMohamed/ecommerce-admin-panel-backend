'use strict';

import mongoose, { Connection, Collection } from 'mongoose';

class SecondaryDB {
  private static instance: SecondaryDB;
  private connection: Connection;

  private constructor(uri: string) {
    if (!uri) {
      throw new Error('MongoDB URI for secondary connection is required.');
    }

    this.connection = mongoose.createConnection(uri);
    this.connection.set('strictQuery', true);

    this.connection.on('connected', () => console.info('MongoDB secondary connection succeeded!'));
    this.connection.on('error', (err: Error) => {
      console.error('MongoDB secondary connection failed:', err);
      this.connection.close();
    });
    this.connection.on('disconnected', () =>
      console.info('MongoDB secondary connection disconnected!')
    );

    process.on('SIGINT', async () => {
      await this.connection.close();
      console.info('Mongoose secondary connection disconnected through app termination!');
      process.exit(0);
    });
  }

  public static getInstance(): SecondaryDB {
    if (!SecondaryDB.instance) {
      SecondaryDB.instance = new SecondaryDB(process.env.SECONDARY_MONGODB_URI!);
    }
    return SecondaryDB.instance;
  }

  public getCollection(name: string): Collection {
    if (!this.connection.readyState) {
      throw new Error('Database connection is not established.');
    }
    return this.connection.collection(name);
  }
}

export default SecondaryDB;
