import { RoleGate } from "@/components/auth/role_gate";

import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import { NavigationBar } from "../../_components/finance_main_navigation_bar";
import { SheetProvider } from "@/providers/sheet-provider";
import { QueryProviders } from "@/providers/query-provider";
const FinanceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RoleGate allowedRole={[UserRole.CHEF, UserRole.ADMIN]}>
        <QueryProviders>
          <SheetProvider></SheetProvider>
          <NavigationBar></NavigationBar>
          <main className="px-3 lg:px-14">{children}</main>
        </QueryProviders>
      </RoleGate>
    </>
  );
};

export default FinanceLayout;
