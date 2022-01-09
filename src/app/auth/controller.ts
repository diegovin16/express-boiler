import { Request, Response } from 'express'
import Service from './service'
import { AuthError } from '../../utils/enums'

const AuthService = new Service()

export default class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body
      const person = await AuthService.register({ email, password, name })
      if (!person) {
        return res.status(400).send(AuthError.EMAIL_ALREADY_EXISTS)
      }
      return res.json(person)
    } catch (err) {
      return res.status(500).send(err.message)
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const result = await AuthService.login({ email, password })
      return res.json(result)
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }

  async remove(req: Request, res: Response) {
    try {
      await AuthService.remove(req.params.id)
      return res.status(204).send()
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }
}
