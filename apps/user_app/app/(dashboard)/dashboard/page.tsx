import Profile from '../../component/Profile'

export default function Page() {
  return (
    <div>
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Dashboard page
      </div>
      <div className="pl-5 flex flex-col gap-2">
        <p className="font-medium">
          Complete your profile to perform transactions.
        </p>
        <Profile />
      </div>
    </div>
  )
}
