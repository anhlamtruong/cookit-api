"use client";

import { RoleGate } from "@/components/auth/role_gate";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import { ModalProvider } from "@/providers/modal_provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RoleGate allowedRole={[UserRole.CHEF, UserRole.ADMIN]}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider />
          {children}
        </QueryClientProvider>
      </RoleGate>
    </>
  );
};

export default AdminLayout;
