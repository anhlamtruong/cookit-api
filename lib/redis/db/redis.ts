import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL_DB,
});
redis.on("error", (error) => console.error(error));
await redis.connect();
