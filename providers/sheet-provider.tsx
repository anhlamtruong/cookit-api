"use client";

import { EditFinanceAccountSheet } from "@/app/(protected)/(finance)/(routes)/finance/_components/edit-account-sheet";
import { NewFinanceAccountSheet } from "@/app/(protected)/(finance)/(routes)/finance/_components/new-account-sheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;

  return (
    <>
      <NewFinanceAccountSheet></NewFinanceAccountSheet>
      <EditFinanceAccountSheet></EditFinanceAccountSheet>
    </>
  );
};
