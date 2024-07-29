"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FormValues, NewAccountForm } from "./new-account-form";
import { useOpenAccount } from "@/hooks/finance/account/use-open-account";
import { useGetFinanceAccount } from "@/hooks/finance/account/use-get-account";
import LoadingCarrot from "@/components/ui/loading/loading-carrot";
import { useUpdateFinanceAccount } from "@/hooks/finance/accounts/use-update-account";

export const EditFinanceAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const accountQuery = useGetFinanceAccount(id);
  const editMutation = useUpdateFinanceAccount(id ?? "account_undefined");
  const isPending = editMutation.isPending;
  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : { name: "" };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Finance Account</SheetTitle>
          <SheetDescription>Edit an existing finance account</SheetDescription>
        </SheetHeader>
        {accountQuery.isLoading ? (
          <LoadingCarrot></LoadingCarrot>
        ) : (
          <NewAccountForm
            id={id}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            disabled={isPending}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
