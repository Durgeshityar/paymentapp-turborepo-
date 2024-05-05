'use client'

import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/textinput'
import { useState } from 'react'
import { p2pTransfer } from '../lib/actions/p2ptransfer'

export function SendCard() {
  const [number, setNumber] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <div className="h-[90vh]">
      <Card title="Send">
        <div className=" mini-w-72 pt-2">
          <TextInput
            placeholder="Number"
            label="Number"
            onChange={(v) => setNumber(v)}
          ></TextInput>
          <TextInput
            placeholder="Amount"
            label="Amount"
            onChange={(v) => setAmount(v)}
          ></TextInput>
          <div className="pt-4 flex justify-center">
            <Button
              onClick={async () => {
                await p2pTransfer(number, Number(amount) * 100)
              }}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
