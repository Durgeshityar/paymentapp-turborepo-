'use client'

import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { Select } from '@repo/ui/select'
import { TextInput } from '@repo/ui/textinput'
import { useState } from 'react'
import { createOnRampTransactions } from '../lib/actions/createOnRampTransactions'

const SUPPORTED_BANKS = [
  {
    name: 'HDFC Bank',
    redirectUrl: 'http://localhost:3002/hdfc',
  },
  {
    name: 'AXIS Bank',
    redirectUrl: 'http://localhost:3002/axis',
  },
]

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  )
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || '')
  const [value, setValue] = useState(0)

  return (
    <div>
      <Card title="Add Money" />
      <div className="w-full pt-4">
        <TextInput
          label={'Amount'}
          placeholder={'Amount'}
          onChange={(val) => {
            setValue(Number(val))
          }}
        />
      </div>
      <div className="py-4 text-left">Bank</div>
      <Select
        onSelect={(value) => {
          setRedirectUrl(
            SUPPORTED_BANKS.find((x) => {
              x.name === value
            })?.redirectUrl || ''
          )

          setProvider(SUPPORTED_BANKS.find((x) => x.name === value)?.name || '')
        }}
        options={SUPPORTED_BANKS.map((x) => ({
          key: x.name,
          value: x.name,
        }))}
      />
      <p className="text-sm pl-4">
        Axis bank dummy srver might not work will fix it soon :)
      </p>
      <div className=" flex justify-center pt-4">
        <Button
          onClick={async () => {
            await createOnRampTransactions(provider, value)

            window.location.href = redirectUrl || ''
          }}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Add Money
        </Button>
      </div>
    </div>
  )
}
