import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type RequestType = {
  id: string;
};

export const useDeleteFinanceAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const res = await axios.delete(`/api/admin/finance/accounts/${data.id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Accounts deleted");
      queryClient.invalidateQueries({ queryKey: ["finance_accounts"] });
      //TODO: Also invalidate summary
    },
    onError: () => {
      toast.error("Fail to delete account....");
    },
  });

  return mutation;
};
