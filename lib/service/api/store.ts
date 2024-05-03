import { Store } from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";
import axios from "axios";

export const fetchStore = async (storeId: string): Promise<Store> => {
  const { data } = await axios.get<Store>(`/api/admin/${storeId}`);

  return data;
};

export const updateStore = async ({
  updateStore,
}: {
  updateStore: Store;
}): Promise<Store> => {
  return updateStore;
};

export const removeStore = async ({ storeId }: { storeId: string }) => {
  await axios.delete(`/api/admin/${storeId}`);
};
