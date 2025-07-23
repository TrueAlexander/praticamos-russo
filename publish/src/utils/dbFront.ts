import mongoose from "mongoose"
import type { MongooseCache } from "../../types/global"

const MONGO_URI = process.env.MONGO as string

if (!MONGO_URI) {
  throw new Error("Please define the MONGO environment variable in .env")
}

// Declara cache explicitamente com tipo
let cached: MongooseCache = global.mongoose ?? {
  conn: null,
  promise: null,
}

// Salva no global se ainda não estiver salvo
if (!global.mongoose) {
  global.mongoose = cached
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      console.log("Connected to MongoDB")
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
