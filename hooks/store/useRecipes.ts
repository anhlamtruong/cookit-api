import { create } from "zustand";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewRecipe, fetchRecipes } from "@/lib/service/api/recipes";

interface useRecipeModalStore {
  recipeData: null | Recipe;
  setRecipeData: (data: Recipe) => void;
  removeRecipeData: () => void;
}

const useRecipe = create<useRecipeModalStore>((set) => ({
  recipeData: null,
  setRecipeData: (data) => set({ recipeData: data }),
  removeRecipeData: () => set({ recipeData: null }),
}));

export default useRecipe;

export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: () => fetchRecipes(),
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
