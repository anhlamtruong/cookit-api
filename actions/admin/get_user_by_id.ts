import { User } from "@/generated/authenticate/@prisma-client-authenticate";
import prismaAuthenticate from "@/lib/service/authenticate_db";

export const getUserById = async (userId: string) => {
  console.log(userId);
  const user = await prismaAuthenticate.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return { name: "Unknown Name", email: "Unknown Email", image: "" };
  }
  const { name, email, image } = user as User;

  return { name, email, image };
};
