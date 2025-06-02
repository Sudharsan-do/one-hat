import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "~/lib/validations/auth";
import bcrypt from "bcryptjs";

import { db } from "~/server/db";

/**
 * User roles enum
 */
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
  interface User {
    role: UserRole;
  }
}

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      async authorize(credentials, _req) {
        const model = loginSchema.safeParse({
          email: credentials.email,
          password: credentials.password
        });
        if(model.error) return null;
        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string
          }
        });
        if(user){
          const match = await bcrypt.compare(model.data.password, user.hashedPassword!);
          if(match) return {id: user.id, role: user.role as UserRole, email: user.email, name: user.name};
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),
  },
} satisfies NextAuthConfig;