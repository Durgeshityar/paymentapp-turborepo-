import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt' //
const prisma = new PrismaClient()

async function main() {
  const passwordDurgesh = 'durgesh'
  const passwordBittu = 'bittu'
  const Durgesh = await prisma.app_User.upsert({
    where: { phone: '7249545825' },
    update: {},
    create: {
      phone: '7249545825',
      password: await bcrypt.hash(passwordDurgesh, 5),
      name: 'Durgesh',
      email: 'dc@gmail.com',
      Balance: {
        create: {
          amount: 20000,
          locked: 333,
        },
      },
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: 'success',
          amount: 200000,
          token: '122',
          provider: 'HDFC Bank',
        },
      },
    },
  })

  const Bittu = await prisma.app_User.upsert({
    where: { phone: '7249545836' },
    update: {},
    create: {
      phone: '7249545836',
      password: await bcrypt.hash(passwordBittu, 5),
      name: 'biitu',
      email: 'bittu@gmail.com',
      Balance: {
        create: {
          amount: 30000,
          locked: 30000,
        },
      },

      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: 'Failure',
          amount: 2000,
          token: '123',
          provider: 'HDFC Bank',
        },
      },
    },
  })
  console.log(Durgesh, Bittu)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
