'use client'

import { Appbar } from '@repo/ui/appbar'
import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export function AppbarClient() {
  const session = useSession()

  return (
    <div>
      <Appbar
        user={session?.data?.user}
        onSignin={signIn}
        onSignout={async () => {
          await signOut()
          redirect('/api/auth/signin')
        }}
      />
    </div>
  )
}
