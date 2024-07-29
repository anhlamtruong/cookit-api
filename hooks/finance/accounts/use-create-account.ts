import { Accounts } from "@/generated/cookit-finance-service/@prisma-client-cookit-finance-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type RequestType = {
  name: string;
};
type ResponseType = Accounts;

export const useCreateNewFinanceAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const res = await axios.post(`/api/admin/finance/accounts`, {
        ...data,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created");
      queryClient.invalidateQueries({ queryKey: ["finance_accounts"] });
    },
    onError: () => {
      toast.error("Fail to create account....");
    },
  });

  return mutation;
};
