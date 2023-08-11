import {MongoClient} from 'mongodb'

export {}

declare global {
    var mongoClientPromise: Promise<MongoClient>
}