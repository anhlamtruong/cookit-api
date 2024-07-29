import { Accounts } from "@/generated/cookit-finance-service/@prisma-client-cookit-finance-service";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFinanceAccounts = () => {
  return useQuery({
    queryKey: ["finance_accounts"],
    queryFn: () => fetchFinanceAccounts(),
  });
};
export const fetchFinanceAccounts = async (): Promise<Accounts[]> => {
  try {
    const { data } = await axios.get<[]>("/api/admin/finance/accounts", {});

    return data;
  } catch (error) {
    console.error(`Fail to fetch accounts: ${error}`);
    throw new Error(
      "Fail to fetch accounts, please take a look at the server log"
    );
  }
};
