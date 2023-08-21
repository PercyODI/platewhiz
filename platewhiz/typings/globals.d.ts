import { MongoClient } from "mongodb";

export interface global{};
// export {};

declare global {
  namespace globalThis {
    var mongoClientPromise: Promise<MongoClient>;
  }
}
