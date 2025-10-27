// Singleton pattern to mitigate hot reload connection dupes

import { PrismaClient } from '@/generated/prisma/client';

/* casting to unknown firts, allows us to cancel the type it was before so we can recast it to a new type.
 It's essentially saying: "I know globalThis doesn't officially have a prisma property, but trust me—I'm adding it at runtime." */

/* using this syntax forces the property prisma to exist, and allows it to be undefined
   if we make this optiona, the option could be not there, but we know is going to be
   because it's going to be generated at runtime. */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
