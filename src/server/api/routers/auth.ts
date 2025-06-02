import { signupSchema } from "~/lib/validations/auth";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from 'bcryptjs';

const saltRounds = 10;

export const authRouter = createTRPCRouter({
    signup: publicProcedure
        .input(signupSchema)
        .mutation(async ({ctx, input}) => {
            const hashedPass = await bcrypt.hash(input.password, saltRounds);
            return await ctx.db.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    hashedPassword: hashedPass
                }   
            });
        })
});