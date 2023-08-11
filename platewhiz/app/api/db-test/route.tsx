import { getMongoDb } from "@/utils/mongodb"

export const POST = async (_request: Request) => {
    const db = await getMongoDb();

    const testContent = {
        "type": "test",
        "time": new Date().toISOString()
    }

    const {insertedId } = await db.collection('test').insertOne(testContent);
    return new Response(insertedId.toString())
}