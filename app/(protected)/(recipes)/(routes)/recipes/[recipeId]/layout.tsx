"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import LoadingCarrot from "@/components/ui/loading/loading-carrot";
import { Skeleton } from "@/components/ui/skeleton";
import useStoreData from "@/hooks/store/useStore";
import useAsyncDataFetcher from "@/hooks/store/useAsyncDataFetcher";
import { Store } from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";

import { RoleGate } from "@/components/auth/role_gate";
import { NavigationBar } from "../../../_components/main_navigation_bar";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  // const router = useRouter();
  // const { storeId } = params;
  // const { setStoreData } = useStoreData();

  // const {
  //   data: storeData,
  //   isLoading: isStoreLoading,
  //   error: storeError,
  // } = useAsyncDataFetcher<Store>(`/api/admin/${storeId}`);

  // useEffect(() => {
  //   if ((!storeData?.id || storeError) && !isStoreLoading) {
  //     router.push(`/store_admin`);
  //   }

  //   setStoreData(storeData as Store);
  // }, [storeData, storeError, router, setStoreData, isStoreLoading]);

  // if (isStoreLoading) {
  //   return <LoadingCarrot text={"Loading Admin Dashboard"}></LoadingCarrot>;
  // }

  // if (!storeData?.id) {
  //   return <Skeleton></Skeleton>;
  // }

  return (
    <>
      <RoleGate allowedRole={[UserRole.CHEF, UserRole.ADMIN]}>
        <NavigationBar className=""></NavigationBar>
        {children}
      </RoleGate>
    </>
  );
}
