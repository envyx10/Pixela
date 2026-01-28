import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          
          const user = await prisma.user.findUnique({
            where: { email }
          })

          if (!user) return null
          
          // Nota: Laravel usa BCRYPT, así que esto debería validar contraseñas migradas si usamos bcryptjs
          // Si el usuario no tiene password (social login), fallará aquí
          if (!user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) {
            // Retornamos el objeto usuario (sin la contraseña)
            return {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                image: user.photoUrl,
                isAdmin: user.isAdmin
            }
          }
        }

        console.log("Invalid credentials")
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
        if (user) {
            token.id = user.id
            token.isAdmin = (user as any).isAdmin
        }
        return token
    },
    async session({ session, token }) {
        if (session.user && token.id) {
            session.user.id = token.id as string
            // añadimos tipos personalizados luego
            (session.user as any).isAdmin = token.isAdmin
        }
        return session
    }
  },
  session: {
      strategy: "jwt"
  },
  pages: {
      signIn: "/login"
  }
})
