const glob = require('glob')
const hostName = require('os').hostname()

function AppRouter(app) {
  const files = glob.sync('../src/app/**/router.ts', { cwd: __dirname })

  files.forEach((file) => {
    const route = require(file)

    const routes = Array.isArray(route) ? route : [route]

    for (const route of routes) {
      const routesMessage = route.router.stack.flatMap((item) =>
        Object.keys(item.route.methods).map(
          (method) => method.toUpperCase() + ' ' + item.route.path
        )
      )

      const infoMessage = `Route initialized: ${route.base}\n\t${routesMessage
        .sort()
        .join('\n\t')}`
      console.info(infoMessage)

      app.use(route.base, route.router)
    }
  })
}

export default async function Initializer(app) {
  app.get('/', (req, res) => res.send(`Welcome! ${hostName}`))
  AppRouter(app)
}
