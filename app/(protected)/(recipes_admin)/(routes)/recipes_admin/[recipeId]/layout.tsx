"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import LoadingCarrot from "@/components/ui/loading/loading-carrot";
import { Skeleton } from "@/components/ui/skeleton";

import useAsyncDataFetcher from "@/hooks/store/useAsyncDataFetcher";
import { Store } from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";

import { RoleGate } from "@/components/auth/role_gate";
import { NavigationBar } from "../../../_components/recipes_main_navigation_bar";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <>
      <RoleGate allowedRole={[UserRole.CHEF, UserRole.ADMIN]}>
        <NavigationBar className=""></NavigationBar>
        {children}
      </RoleGate>
    </>
  );
}
