"use client";

import { RoleGate } from "@/components/auth/role_gate";
import { ModalProvider } from "@/providers/modal_provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import { NavigationBar } from "../../_components/recipes_main_navigation_bar";
const queryClient = new QueryClient();
const RecipesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RoleGate allowedRole={[UserRole.CHEF, UserRole.ADMIN]}>
          <NavigationBar></NavigationBar>
          {children}
        </RoleGate>
      </QueryClientProvider>
    </>
  );
};

export default RecipesLayout;
