import request from 'supertest'
import { server } from '../../server'

const BASE_URL = '/user'

const mockUser = {
  email: 'test@example.com',
  password: 'password',
  name: 'Test Example',
}

describe('Test Auth', () => {
  afterAll(() => {
    process.stdin.emit('SIGTERM')
    server?.close()
  })

  let data

  it('should register user', async () => {
    const result = await request(server)
      .post(`${BASE_URL}/register`)
      .send(mockUser)
    data = result.body
    expect(result.status).toBe(200)
    expect(result.body.id).toBeDefined()
  })

  it('should not login with invalid body', async () => {
    const result = await request(server).post(`${BASE_URL}/login`).send({})
    expect(result.status).toBe(400)
  })

  it('should not login with wrong credentials', async () => {
    const result = await request(server)
      .post(`${BASE_URL}/login`)
      .send({ email: 'no-one', password: 'no-one' })
    expect(result.status).toBe(400)
  })

  it('should login with correct credentials', async () => {
    const result = await request(server)
      .post(`${BASE_URL}/login`)
      .send({ email: mockUser.email, password: mockUser.password })
    data = { ...data, token: result.body.token }
    expect(result.status).toBe(200)
    expect(result.body.auth).toEqual(true)
  })

  it('should access private route', async () => {
    const result = await request(server)
      .get(`${BASE_URL}/protected`)
      .set({ authorization: `Bearer ${data.token}` })
    expect(result.status).toBe(200)
  })

  it('should delete user', async () => {
    const result = await request(server).delete(`${BASE_URL}/${data.id}`)
    expect(result.status).toBe(204)
  })
})
