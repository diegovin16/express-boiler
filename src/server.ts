import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  const result = await prisma.courses.create({
    data: {
      duration: 200,
      name: 'Curso de NodeJS',
      description: 'description',
    },
  })

  console.log('result', result)
}
main()
const app = express()

app.get('/', (req, res) => {
  return res.send('alo')
})

app.listen(3333)
