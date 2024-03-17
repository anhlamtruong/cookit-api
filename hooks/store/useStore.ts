import { create } from "zustand";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewStore, fetchStores } from "@/lib/service/api/stores";
import { Store } from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";

interface useStoreModalStore {
  storeData: null | Store;
  setStoreData: (data: Store) => void;
  removeStoreData: () => void;
}

const useStore = create<useStoreModalStore>((set) => ({
  storeData: null,
  setStoreData: (data) => set({ storeData: data }),
  removeStoreData: () => set({ storeData: null }),
}));

export default useStore;

export const useStores = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: () => fetchStores(),
  });
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
};
