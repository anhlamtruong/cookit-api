"use client";

import { RoleGate } from "@/components/auth/role_gate";
import { ModalProvider } from "@/providers/modal_provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationBar } from "../../_components/main_navigation_bar";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
const queryClient = new QueryClient();
const RecipesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default RecipesLayout;
