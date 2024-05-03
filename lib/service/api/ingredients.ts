import axios from "axios";

export const fetchAdminIngredientsFirebase = async (): Promise<
  Ingredient[]
> => {
  const { status, data } = await axios.get<Ingredient[]>(
    "/api/admin/ingredients",
    {}
  );

  return data ?? [];
};
export const fetchAdminIngredientsFirebaseById = async (
  id: string
): Promise<Ingredient | null> => {
  if (id === "new") return null;
  const { data } = await axios.get<Ingredient>(
    `/api/admin/ingredients/${id}`,
    {}
  );
  return data;
};
export const fetchPublicIngredientsFirebase = async (
  searchTerm: string
): Promise<Ingredient[]> => {
  const { data } = await axios.get<Ingredient[]>("/api/ingredients", {
    params: {
      query: searchTerm,
    },
  });
  return data ?? [];
};
