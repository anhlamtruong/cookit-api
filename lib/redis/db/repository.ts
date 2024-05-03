import { Schema, Repository } from "redis-om";
import { redis } from "./redis";

//TODO: Add search function
const ingredientSchema = new Schema(
  "ingredient",
  {
    name: { type: "text" },
    category: { type: "text" },
    source: { type: "string" },
    measurement: { type: "string" },
    description: { type: "string" },
    imageURL: { type: "string" },
    iconURL: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

export const ingredientRepository = new Repository(ingredientSchema, redis);
export const TTL_SECONDS = 12 * 60 * 60;

await ingredientRepository.createIndex();
