import { useRecoilValue } from 'recoil'
import { balanceAtom } from '../atmos/balance'

export const useBalance = () => {
  const value = useRecoilValue(balanceAtom)
  return value
}
