import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@repo/db/client'
import bcrypt from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { env } from 'node:process'

export const authOptionsMerchant: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID || '',
      clientSecret: env.GOOGLE_SECRET || '',
    }),
    GithubProvider({
      clientId: env.GITHUB_ID || '',
      clientSecret: env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'durgeshityar@example.com',
        },
        password: { label: 'Password', type: 'Password' },
      },
      async authorize(credentials: any) {
        const existingUser = await prisma.merchant.findUnique({
          where: {
            email: credentials.email,
          },
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
          const user = await prisma.merchant.create({
            data: {
              email: credentials.email,
              password: await bcrypt.hash(credentials.password, 5),
              phone: credentials.phone,
            },
          })
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          }
        } catch (e) {
          console.error(e)
          return null // login failed
        }
      }, // authroize end scope
    }),
  ],
  secret: env.JWT_SECRET, // TODO : add env in final
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub
      return session
    },
    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
}
