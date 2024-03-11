import { ENV_KEY, getEnvValue } from "@/utils/geEnv";
import mongoose from "mongoose";

const DB_URL = getEnvValue(ENV_KEY.MONGODB_URL);

if (!DB_URL) {
  throw new Error(
    "Please define the DB_URL environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose ?? { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("--- db connected ---");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DB_URL, opts).then((mongoose) => {
      console.log("--- db connected ---");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  console.log("--- db connected ---");
  return cached.conn;
}

export default dbConnect;
