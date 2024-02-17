import { Billboard } from "@/generated/mysql/@prisma-client-mysql";
import axios from "axios";

export const fetchBillboards = async (url: string): Promise<Billboard[]> => {
  const { data } = await axios.get<Billboard[]>(url);
  return data;
};

export const createBillboard = async ({
  newBillboard,
}: {
  newBillboard: Billboard;
}): Promise<Billboard> => {
  return newBillboard;
};
