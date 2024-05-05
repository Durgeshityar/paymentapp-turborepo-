'use server'

import { prisma } from '@repo/db/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'

interface Props {
  name: string
  number: string
  email: string
  password: string
}

export async function createUser({ name, number, email, password }: Props) {
  const session = await getServerSession(authOptions)
  const userMail = session?.user?.email!

  try {
    const user = await prisma.app_User.upsert({
      where: {
        email: userMail,
      },
      update: {
        name: name,
        phone: number,
        email: email,
        password: password,
      },
      create: {
        name: name,
        phone: number,
        email: email,
        password: password,
      },
    })
    return {
      user,
      msg: 'success',
    }
  } catch (e) {
    console.error(e)
    return { message: 'error while creating user through server actions' }
  }
}
