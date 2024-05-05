'use client'

import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/textinput'
import React, { useState } from 'react'
import { createUser } from '../lib/actions/createUser'

const Profile = () => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const message = 'Succesfully profile created :) Go to Transfer/p2p section'
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <Card title="comple your profile">
        <div className="pt-4 w-full">
          <TextInput
            label="Name"
            placeholder="name"
            onChange={(e) => {
              setName(e)
            }}
          ></TextInput>
        </div>
        <div className="pt-4 w-full">
          <TextInput
            label="Phone Number"
            placeholder="number"
            onChange={(e) => {
              setNumber(e)
            }}
          ></TextInput>
          <div className="pt-4 w-full">
            <TextInput
              label="Email"
              placeholder="email"
              onChange={(e) => {
                setEmail(e)
              }}
            ></TextInput>
          </div>
          <div className="pt-4 w-full">
            <p> Password</p>
            <input
              className="outline-none border border-slate-300 w-full rounded-md py-1.5 bg-slate-50"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            ></input>
          </div>
          <div className="pt-4 w-full">
            <Button
              onClick={() => {
                createUser({ name, number, email, password }).then((r) => {
                  if (r?.msg === 'success') {
                    setVisible(!visible)
                  }
                })
              }}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full"
            >
              Submit!
            </Button>
          </div>
        </div>
      </Card>
      <div className="font-medium pt-2">{visible ? message : ''}</div>
    </div>
  )
}

export default Profile
