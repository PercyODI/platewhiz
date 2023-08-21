import { MongoClient } from "mongodb";
import mongoose from "mongoose";

async function createIndexes(client: MongoClient) {
  return client;
}

export async function getMongoClient() {
  if (!globalThis.mongoClientPromise) {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL Required");
    }
    console.log(`Using MongoURL ${mongoUrl}`);
    const client = new MongoClient(mongoUrl);
    globalThis.mongoClientPromise = client
      .connect()
      .then((client) => createIndexes(client));
  }
  return globalThis.mongoClientPromise;
}

export async function getMongoDb() {
  const mongoClient = await getMongoClient();
  return mongoClient.db();
}

let isConnected = false;

export async function connectMongooseDb(): Promise<void> {
  mongoose.set("strictQuery", true);

  if ((isConnected = false)) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL Required");
    }
    console.log("Connecting to " + mongoUrl)
    await mongoose.connect(mongoUrl, {
      dbName: "platewhiz",
      // useUnifiedTopology: true
    });

    isConnected = true;
    console.log("MongoDB Mongoose Connected");
  } catch (error) {
    console.log(error);
  }
}
