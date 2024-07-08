import mongoose from "mongoose";

class MongoDBConnection {
  private static instance: MongoDBConnection;
  private connection: mongoose.Connection | null = null;

  private constructor() {}

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async connect(uri: string): Promise<void> {
    if (this.connection) {
      return;
    }

    try {
      await mongoose.connect(uri);
      this.connection = mongoose.connection;
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
      throw error;
    }
  }

  public getConnection(): mongoose.Connection | null {
    return this.connection;
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
      console.log("Disconnected from MongoDB");
    }
  }
}

export default MongoDBConnection;
