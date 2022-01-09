import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { AuthError } from '../utils/enums'

const prisma = new PrismaClient()

interface Payload {
  user: {
    id: string
    email: string
    name: string
  }
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error(AuthError.TOKEN_MISSING)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, process.env.SECRET_KEY) as Payload
    if (!decoded) {
      throw new Error(AuthError.INVALID_TOKEN)
    }
    const user = await prisma.person.findUnique({
      where: { id: decoded.user.id },
    })

    if (!user) {
      throw new Error(AuthError.USER_OR_PASSWORD_NOT_FOUND)
    }

    return next()
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
