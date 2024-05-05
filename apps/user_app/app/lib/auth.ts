import { prisma } from '@repo/db/client'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { env } from 'node:process'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID || '',
      clientSecret: env.GOOGLE_SECRET || '',
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'durgeshityar@example.com',
          required: true,
        },

        password: { label: 'Password', type: 'Password', required: true },
      },
      // TODO: User credentials type from next-aut

      async authorize(credentials: any) {
        // ... other validation logic (zod, OTP)

        const existingUser = await prisma.app_User.findFirst({
          where: { email: credentials.email },
        })

        if (existingUser) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            existingUser.password
          )

          if (isPasswordValid) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            }
          }
          return null // Login failed
        }

        try {
          const user = await prisma.app_User.create({
            data: {
              email: credentials.email,
              password: await bcrypt.hash(credentials.password, 5), // Hash password on server
            },
          })

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          console.error('Error creating user:', error)
          //  return a generic error message to the client here
          return null
        }
      },
      // authorize ends here
    }),
  ],
  secret: env.JWT_SECRET,
  callbacks: {
    // TODO: Fix the type here
    async session({ token, session }: any) {
      session.user.id = token.sub
      return session
    },

    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
}
