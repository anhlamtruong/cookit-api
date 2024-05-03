import axios from "axios";

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const { data } = await axios.get<Recipe[]>("/api/admin/recipes");

  return data;
};

export const createNewRecipe = async ({
  newRecipe,
}: {
  newRecipe: Recipe;
}): Promise<Recipe> => {
  return newRecipe;
};
