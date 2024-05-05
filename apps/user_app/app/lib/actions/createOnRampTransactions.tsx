'use server'

import { prisma } from '@repo/db/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import { webHookMock } from './sendWebHook'

export async function createOnRampTransactions(
  provider: string,
  amount: number
) {
  // Ideally the token should come from the banking provider
  const session = await getServerSession(authOptions)

  const currentUser = await prisma.app_User.findUnique({
    where: {
      email: session?.user?.email!,
    },
  })

  const userId = currentUser?.id!

  if (!session?.user || !currentUser?.id) {
    return {
      message: 'Unauthenticated Request',
    }
  }
  // setId(userId!)
  const token = (Math.random() * 1000).toString()
  // setTkn(token)

  const recentTransation = await prisma.onRampTransactions.create({
    data: {
      provider,
      status: 'Processing',
      startTime: new Date(),
      token: token,
      userId: userId!,
      amount: amount * 100,
    },
  })

  await webHookMock({ token, userId, amount })

  console.log(recentTransation)

  return {
    message: 'Done',
  }
}
