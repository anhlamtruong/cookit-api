import { Accounts } from "@/generated/cookit-finance-service/@prisma-client-cookit-finance-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type RequestType = {
  name: string;
};
type ResponseType = Accounts;

export const useUpdateFinanceAccount = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const res = await axios.patch(`/api/admin/finance/accounts/${id}`, {
        ...data,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account updated");
      queryClient.invalidateQueries({ queryKey: ["finance_accounts"] });
    },
    onError: () => {
      toast.error("Fail to updated account....");
    },
  });

  return mutation;
};
