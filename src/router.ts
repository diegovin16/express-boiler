import glob from 'glob'
import os from 'os'
import { Application } from 'express'

const hostName = os.hostname()

const routes = [
  {
    ...require('./app/auth/router'),
  },
]

function AppRouter(app: Application) {
  for (const route of routes) {
    app.use(route.base, route.router)
  }
}

export default async function Initializer(app: Application) {
  app.get('/', (req, res) => res.send(`Welcome! ${hostName}`))
  AppRouter(app)
}
