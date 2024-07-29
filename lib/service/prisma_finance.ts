import { PrismaClient as PrismaClientFinance } from "@/generated/cookit-finance-service/@prisma-client-cookit-finance-service";

const prismaClientSingleton = () => {
  return new PrismaClientFinance();
};

declare global {
  var prismaFinance: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prismaFinance = global.prismaFinance ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") global.prismaFinance = prismaFinance;

export default prismaFinance;
