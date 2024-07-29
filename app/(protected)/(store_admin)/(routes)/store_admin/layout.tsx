import { RoleGate } from "@/components/auth/role_gate";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import { ModalProvider } from "@/providers/modal-provider";
import { QueryProviders } from "@/providers/query-provider";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProviders>
        <RoleGate allowedRole={[UserRole.CHEF, UserRole.ADMIN]}>
          <ModalProvider />
          {children}
        </RoleGate>
      </QueryProviders>
    </>
  );
};

export default AdminLayout;
