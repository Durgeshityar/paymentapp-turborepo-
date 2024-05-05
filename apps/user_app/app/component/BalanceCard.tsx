import { Card } from '@repo/ui/card'

type BalanceCardProps = {
  amount: number
  locked: number
}

export const BalanceCard = ({ amount, locked }: BalanceCardProps) => {
  return (
    <Card title="Balance">
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div> Unlocked Balance</div>
        <div> {amount / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div> Total Locked Balance</div>
        <div>{locked / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div> Total Balance </div>
        <div> {(locked + amount) / 100} </div>
      </div>
    </Card>
  )
}
