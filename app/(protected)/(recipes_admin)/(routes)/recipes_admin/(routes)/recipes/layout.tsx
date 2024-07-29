import { RoleGate } from "@/components/auth/role_gate";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";

const RecipesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RoleGate allowedRole={[UserRole.CHEF, UserRole.ADMIN]}>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </RoleGate>
    </>
  );
};

export default RecipesLayout;
