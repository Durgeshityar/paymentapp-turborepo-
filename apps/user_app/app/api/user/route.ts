import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const session = await getServerSession(authOptions)
  try {
    if (session?.user) {
      return NextResponse.json({
        session,
      })
    }
  } catch (e) {
    // User is not logged in, return 403
    return NextResponse.json(
      {
        message: 'You are not logged in',
      },
      { status: 403 }
    )
  }

  // User is not logged in, return 403
  return NextResponse.json(
    {
      message: 'You are not logged in',
    },
    { status: 403 }
  )
}
