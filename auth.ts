import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import type { Role } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { loginSchema } from "@/lib/schemas/auth.schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })
        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(
          parsed.data.password,
          user.password
        )
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // @auth/core JWT extends Record<string,unknown>; cast via any to assign typed fields
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as any
        token.id = u.id as string
        token.role = u.role as Role
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as Role
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
})
