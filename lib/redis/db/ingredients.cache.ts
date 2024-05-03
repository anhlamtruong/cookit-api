import { EntityId } from "redis-om";
import { TTL_SECONDS, ingredientRepository } from "./repository";

export async function createIngredientRedis(data: Ingredient, id: string) {
  console.info(`Written data ${data.name} to Redis Cache`);
  const ingredient_q = {
    name: data.name,
    category: data.category,
    source: data.source,
    measurement: data.measurement,
    description: data.description,
    imageURL: data.imageURL,
    iconURL: data.iconURL,
  };
  const ingredient = await ingredientRepository.save(id, ingredient_q);
  await ingredientRepository.expire(ingredient[EntityId] ?? id, TTL_SECONDS);
  return ingredient[EntityId];
}

export async function createIndex() {
  await ingredientRepository.createIndex();
}

export async function searchIngredientRedis(q: string) {
  console.info(`Search data using query: ${q} from Redis Cache`);
  const ingredients = await ingredientRepository
    .search()
    .where("name")
    .match(q, { fuzzyMatching: true, levenshteinDistance: 2 })
    .or("category")
    .match(q)
    .return.all();

  return ingredients;
}
