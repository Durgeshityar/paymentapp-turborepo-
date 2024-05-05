import { Button } from './button'
interface AppbarProps {
  user?: {
    name?: string | null
  }
  // TODO: figure out what the type should be here?
  onSignin: any
  onSignout: any
}
export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between bg-blue-400 p-4 border-b">
      <div className="text-3xl font-bold text-slate-200">PayLeap</div>
      <div>
        <Button
          className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          onClick={user ? onSignout : onSignin}
        >
          {user ? 'Logout' : 'Login'}
        </Button>
      </div>
    </div>
  )
}
