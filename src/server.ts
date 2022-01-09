import express from 'express'
import router from './router'

const PORT = process.env.PORT || 8088

const app = express()
app.use(express.json())

const initializeRouter = async () => router(app)
initializeRouter()

app.get('/', (req, res) => {
  return res.send('Express boilerplate by Diego Vinicius')
})

export const server = app.listen(PORT, () =>
  console.log('Server listening on port ' + PORT)
)
