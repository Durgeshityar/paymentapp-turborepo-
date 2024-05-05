'use server'
import axios from 'axios'

interface Props {
  token: string
  userId: number
  amount: number
}

export async function webHookMock({ token, userId, amount }: Props) {
  let data = JSON.stringify({
    token: token,
    user_identifier: userId,
    amount: amount,
  })

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3002/api',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  }

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error)
    })

  return {
    message: 'webhook updated',
  }
}
