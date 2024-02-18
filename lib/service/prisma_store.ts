import { PrismaClient as PrismaClientStore } from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";

const prismaClientSingleton = () => {
  return new PrismaClientStore();
};

declare global {
  var prismaStore: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prismaStore = global.prismaStore ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") global.prismaStore = prismaStore;

export default prismaStore;
