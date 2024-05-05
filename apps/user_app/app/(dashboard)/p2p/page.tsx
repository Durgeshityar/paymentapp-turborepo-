import { SendCard } from '../../component/SendCard'

export default function () {
  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfer
      </div>
      <p className="p-2 bg-blue-200 mb-3 border rounded">
        Hey i'm low on money 😣 would you mind sending me ? here is my number
        7249545825 , pretty Please 🙏
      </p>
      <SendCard />
    </div>
  )
}
