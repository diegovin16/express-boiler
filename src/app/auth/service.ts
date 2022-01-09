import jwt from 'jsonwebtoken'
import { encrypt, decrypt } from '../../services'
import { PrismaClient } from '@prisma/client'
import { AuthError } from '../../utils/enums'

const prisma = new PrismaClient()

interface PersonCreateInput {
  email: string
  password: string
  name: string
}

interface PersonLogin {
  email: string
  password: string
}

export default class AuthService {
  async login(person: PersonLogin) {
    const user = await prisma.person.findUnique({
      where: { email: person.email },
    })

    if (!user) {
      throw new Error(AuthError.AUTH_WRONG)
    }

    const result = await decrypt(person.password, user.password)

    if (!result) {
      throw new Error(AuthError.AUTH_WRONG)
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }

    const token = jwt.sign({ user: payload }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    })

    return { auth: true, token }
  }

  async register(person: PersonCreateInput) {
    const encryptedPassword = await encrypt(person.password)
    return prisma.person.create({
      data: { ...person, password: encryptedPassword },
    })
  }

  async remove(id: string) {
    return prisma.person.delete({ where: { id } })
  }
}
