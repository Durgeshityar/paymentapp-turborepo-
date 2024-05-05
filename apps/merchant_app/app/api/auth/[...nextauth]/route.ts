import NextAuth from 'next-auth/next'
import { authOptionsMerchant } from '../../../lib/auth'

const handler = NextAuth(authOptionsMerchant)

export { handler as GET, handler as POST }
