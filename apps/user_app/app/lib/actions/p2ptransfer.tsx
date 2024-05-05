'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import { prisma } from '@repo/db/client'

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions)
  const existingUser = await prisma.app_User.findUnique({
    where: {
      email: session?.user?.email!,
    },
  })

  //if user is not logged in
  const from = existingUser?.id

  if (!from) {
    return {
      message: 'Error while sending money',
    }
  }

  const toUser = await prisma.app_User.findFirst({
    where: {
      phone: to,
    },
  })

  const toUserId = toUser?.id

  // if  to user is not found

  if (!toUser) {
    return {
      message: 'User not found',
    }
  }

  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`
    const fromBalance = await tx.balance.findUnique({
      where: {
        userId: from,
      },
    })

    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error('Insufficient Balance')
    }

    await tx.balance.update({
      where: { userId: from },
      data: { amount: { decrement: amount } },
    })

    await tx.balance.update({
      where: { userId: toUserId },
      data: { amount: { increment: amount } },
    })

    // updating database

    await tx.p2pTransfer.create({
      data: {
        amount: amount,
        timestamp: new Date(),
        fromUserId: from,
        toUserId: toUserId!,
      },
    })
  })
}
