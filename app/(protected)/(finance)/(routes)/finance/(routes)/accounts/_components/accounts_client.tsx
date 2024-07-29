"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { AccountsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data_table";
import { useDeleteFinanceAccounts } from "@/hooks/finance/accounts/use-delete-accounts";
import { useGetFinanceAccounts } from "@/hooks/finance/accounts/use-get-accounts";
import ErrorComponent from "@/components/ui/error";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingCarrot from "@/components/ui/loading/loading-carrot";

export const AccountClient: React.FC = () => {
  const { data: accounts, error, isLoading } = useGetFinanceAccounts();

  const deleteAccounts = useDeleteFinanceAccounts();
  const isDisabled = isLoading || deleteAccounts.isPending;
  const formattedAccounts: AccountsColumn[] = !accounts
    ? []
    : accounts.map((account) => ({
        id: account.id,
        name: account.name,
        amount: 100,
        createAt: account.createAt ? account.createAt : "MM/DD/YYYY",
      }));

  return (
    <>
      {error && (
        <ErrorComponent
          message={`Found an error getting data: ${error.message}`}
        ></ErrorComponent>
      )}
      {isLoading && (
        <div className=" max-w-screen-2xl mx-auto w-full">
          <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
              <Skeleton className="h-8 w-48"></Skeleton>
            </CardHeader>
            <CardContent>
              <div className=" h-[500px] w-full flex items-center justify-center">
                <LoadingCarrot text={"Loading ingredients"}></LoadingCarrot>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="flex items-center justify-between">
        <Heading
          title={`Accounts (${formattedAccounts.length})`}
          description="Manage account for your financing"
        />
      </div>
      <Separator />
      <DataTable
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id);
          deleteAccounts.mutate({ ids });
        }}
        searchKey={"name"}
        columns={columns}
        data={formattedAccounts}
        disabled={isDisabled}
      />
    </>
  );
};
