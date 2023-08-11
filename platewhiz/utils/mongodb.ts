import { MongoClient } from 'mongodb'

async function createIndexes(client: MongoClient) {
    return client;
}

export async function getMongoClient() {
    if (!globalThis.mongoClientPromise) {
        const mongoUrl = process.env.MONGO_URL
        if (!mongoUrl) {
            throw new Error("MONGO_URL Required")
        }
        const client = new MongoClient(mongoUrl);
        globalThis.mongoClientPromise = client
            .connect()
            .then((client) => createIndexes(client))
    }
    return globalThis.mongoClientPromise;
}

export async function getMongoDb() {
    const mongoClient = await getMongoClient();
    return mongoClient.db()
}
