"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSheetNewAccount } from "@/hooks/finance/accounts/use-sheet-account";
import { FormValues, NewAccountForm } from "./new-account-form";
import { useCreateNewFinanceAccount } from "@/hooks/finance/accounts/use-create-account";

export const NewFinanceAccountSheet = () => {
  const { isOpen, onClose } = useSheetNewAccount();

  const mutation = useCreateNewFinanceAccount();
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Finance Account</SheetTitle>
          <SheetDescription>
            Create a new finance account to track your transaction
          </SheetDescription>
        </SheetHeader>
        <NewAccountForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};
