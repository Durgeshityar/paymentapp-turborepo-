import { InputBox } from '../components/InputBox'

interface Props {
  children: React.ReactNode
}

export default function ({ children }: Props) {
  return (
    <div className="bg-slate-100 h-screen">
      {children}
      <div className="flex flex-col items-center text-center pb-2 pt-36">
        As this is a Dummy NetBanking server designed <br></br>to simulate net
        banking, please enter random <br></br> credentials to simplify the
        process. :) <br></br>
        eg .CID : 2376033453 | M-PIN : 1234
      </div>
      <div className="flex items-center flex-col ">
        <InputBox />
      </div>
    </div>
  )
}
