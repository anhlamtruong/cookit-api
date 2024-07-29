import { Accounts } from "@/generated/cookit-finance-service/@prisma-client-cookit-finance-service";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFinanceAccount = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["finance_account", { id }],
    queryFn: () => fetchFinanceAccounts((id = id)),
  });
};
export const fetchFinanceAccounts = async (id?: string): Promise<Accounts> => {
  try {
    const { data } = await axios.get<Accounts>(
      `/api/admin/finance/accounts/${id}`
    );

    return data;
  } catch (error) {
    console.error(`Fail to fetch accounts: ${error}`);
    throw new Error(
      "Fail to fetch accounts, please take a look at the server log"
    );
  }
};
