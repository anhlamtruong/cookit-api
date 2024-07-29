import { RoleGate } from "@/components/auth/role_gate";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import { NavigationBar } from "../../_components/recipes_main_navigation_bar";
import { QueryProviders } from "@/providers/query-provider";

const RecipesAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProviders>
        <RoleGate allowedRole={[UserRole.CHEF, UserRole.ADMIN]}>
          <NavigationBar></NavigationBar>
          {children}
        </RoleGate>
      </QueryProviders>
    </>
  );
};

export default RecipesAdminLayout;
