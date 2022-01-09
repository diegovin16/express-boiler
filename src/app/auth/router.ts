import Controller from './controller'
import { Router, Request, Response } from 'express'
import { ensureAuthenticated } from '../../middleware'

const AuthController = new Controller()

const router = Router()

router.post('/register', async (req: Request, res: Response) =>
  AuthController.register(req, res)
)

router.post('/login', async (req: Request, res: Response) =>
  AuthController.login(req, res)
)

router.delete('/:id', async (req: Request, res: Response) =>
  AuthController.remove(req, res)
)

router.get('/protected', ensureAuthenticated, (req: Request, res: Response) =>
  res.json({ auth: true })
)

module.exports = { base: '/user', router }
