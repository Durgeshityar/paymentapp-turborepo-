import { prisma } from '@repo/db/client'
import { AddMoney } from '../../component/AddMoneyCard'
import { BalanceCard } from '../../component/BalanceCard'
import { OnRampTransaction } from '../../component/OnRampTransaction'
import { getServerSession } from 'next-auth'

async function getBalance() {
  const session = await getServerSession()
  const ExistingUser = await prisma.app_User.findUnique({
    where: {
      email: session?.user?.email!,
    },
  })
  const balance = await prisma.balance.findFirst({
    where: {
      userId: ExistingUser?.id,
    },
  })

  return {
    balance: balance?.amount || 0,
    locked: balance?.locked || 0,
  }
}

async function getOnRampTransactions() {
  const session = await getServerSession()
  const ExistingUser = await prisma.app_User.findUnique({
    where: {
      email: session?.user?.email!,
    },
  })

  const txns = await prisma.onRampTransactions.findMany({
    where: {
      userId: ExistingUser?.id,
    },
  })

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }))
}

export default async function () {
  const balance = await getBalance()
  const txns = await getOnRampTransactions()

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.balance} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransaction transactions={txns} />
          </div>
        </div>
      </div>
    </div>
  )
}
