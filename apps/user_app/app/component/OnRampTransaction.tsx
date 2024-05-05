import { Card } from '@repo/ui/card'

interface OnRampTransactionProps {
  transactions: OnRampTransactionType[] // Array of OnRampTransaction objects
}

interface OnRampTransactionType {
  time: Date
  amount: Number // Consider using a more precise type like number or string
  status: string
  provider: string
}

export const OnRampTransaction = ({ transactions }: OnRampTransactionProps) => {
  if (!transactions.length) {
    return (
      <Card title={'Recent Transactions'}>
        <div className='"text-center pb-8 pt-8"'>No recent transactions</div>
      </Card>
    )
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between" key={Number(t.time)}>
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {Number(t.amount) / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
