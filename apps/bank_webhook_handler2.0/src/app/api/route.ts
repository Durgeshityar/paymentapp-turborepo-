import { prisma } from '@repo/db/client'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { token, user_identifier, amount } = await req.json()
    console.log(token, user_identifier, amount)
    await prisma.$transaction(async (tx) => {
      await tx.balance.updateMany({
        where: {
          userId: user_identifier,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      })

      await tx.onRampTransactions.updateMany({
        where: {
          token: token,
        },
        data: {
          status: 'success',
        },
      })
    })

    return NextResponse.json({ message: 'Captured' })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Error while processing webHook' })
  }
}
