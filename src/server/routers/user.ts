import { publicProcedure } from "../trpc";
import { prisma } from "../db";
import { router } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),
  createUser: publicProcedure
    .input(z.object({ name: z.string(), email: z.string().email() }))
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),
});
