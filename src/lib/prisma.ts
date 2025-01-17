import { PrismaClient } from "@prisma/client";
import exp from "constants";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: prismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;
if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}
