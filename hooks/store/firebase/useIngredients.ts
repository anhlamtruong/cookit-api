import {
  fetchAdminIngredientsFirebase,
  fetchAdminIngredientsFirebaseById,
  fetchPublicIngredientsFirebase,
} from "@/lib/service/api/ingredients";
import { useQuery } from "@tanstack/react-query";

export const useAdminIngredients = () => {
  return useQuery({
    queryKey: ["admin_ingredients"],
    queryFn: () => fetchAdminIngredientsFirebase(),
  });
};

export const useAdminIngredientQuery = (id: string) => {
  return useQuery({
    queryKey: ["admin_ingredients", id],
    queryFn: () => fetchAdminIngredientsFirebaseById(id),
    enabled: !!id,
    retry: 1,
  });
};

export const usePublicIngredients = (q: string) => {
  return useQuery({
    queryKey: ["public_ingredients"],
    queryFn: () => fetchPublicIngredientsFirebase(q),
    enabled: !!q,
  });
};
