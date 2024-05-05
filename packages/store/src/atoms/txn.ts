import { atom } from 'recoil'

export const amountAtom = atom<number>({
  key: 'amount',
  default: 0,
})

export const userIdAtom = atom<number>({
  key: 'userId',
  default: 0,
})

export const tokenAtom = atom<string>({
  key: 'token',
  default: '',
})
