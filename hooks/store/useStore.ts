import { create } from "zustand";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewStore, fetchStores } from "@/lib/service/api/stores";
import { Store } from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";

import { fetchStore, removeStore, updateStore } from "@/lib/service/api/store";

interface useStoreModalStore {
  storeData: null | Store;
  setStoreData: (data: Store) => void;
  removeStoreData: () => void;
}

export const useStore = create<useStoreModalStore>((set) => ({
  storeData: null,
  setStoreData: (data) => set({ storeData: data }),
  removeStoreData: () => set({ storeData: null }),
}));

export const useStoreData = (storeId: string) => {
  return useQuery({
    queryKey: ["storeData", storeId], // Cache key, include storeId
    queryFn: () => fetchStore(storeId),
  });
};
export const useUpdateStore = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStore,
    onSuccess: (data) => {
      queryClient.setQueryData(["storeData", { storeId }], data);
    },
  });
};
export const useRemoveStore = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeStore,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["storeData", storeId] });
    },
  });
};

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
