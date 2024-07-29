"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSheetNewAccount } from "@/hooks/finance/accounts/use-sheet-account";
import { Plus } from "lucide-react";
import React from "react";
import { AccountClient } from "./_components/accounts_client";

const AccountPage: React.FC = ({}) => {
  const sheet = useSheetNewAccount();
  return (
    <>
      <div className=" max-w-screen-2xl mx-auto w-full">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className=" text-xl line-clamp-1">
              Account page
            </CardTitle>
            <Button onClick={sheet.onOpen} size="sm">
              <Plus className=" size-4 mr-2" />
              Add new account
            </Button>
          </CardHeader>
          <CardContent>
            <AccountClient></AccountClient>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default AccountPage;
