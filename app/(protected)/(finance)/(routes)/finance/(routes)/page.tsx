"use client";

import React from "react";
import { Suspense } from "react";

import { useSheetNewAccount } from "@/hooks/finance/accounts/use-sheet-account";

import { Button } from "@/components/ui/button";
const RecipesPage: React.FC = ({}) => {
  const { onOpen } = useSheetNewAccount();
  return (
    <Suspense fallback={<p>Loading recipes client...</p>}>
      <Button onClick={onOpen}> Add an account </Button>
    </Suspense>
  );
};
export default RecipesPage;
