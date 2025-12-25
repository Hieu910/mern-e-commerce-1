// backend/lib/redis.js
import Redis from "ioredis";
import dotenv from "dotenv";
import path from "path";

const __dirname = path.resolve();
// Ensure dotenv loads the backend .env 
dotenv.config({ path: path.resolve(__dirname, "backend", ".env") });

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);