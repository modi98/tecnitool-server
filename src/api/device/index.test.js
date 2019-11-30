import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Device } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, device

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  device = await Device.create({ createdBy: user })
})

test('POST /devices 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, clientId: 'test', manufacturer: 'test', model: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.clientId).toEqual('test')
  expect(body.manufacturer).toEqual('test')
  expect(body.model).toEqual('test')
  expect(body.description).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /devices 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /devices 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].createdBy).toEqual('object')
})

test('GET /devices 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /devices/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${device.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(device.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /devices/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${device.id}`)
  expect(status).toBe(401)
})

test('GET /devices/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /devices/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${device.id}`)
    .send({ access_token: userSession, clientId: 'test', manufacturer: 'test', model: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(device.id)
  expect(body.clientId).toEqual('test')
  expect(body.manufacturer).toEqual('test')
  expect(body.model).toEqual('test')
  expect(body.description).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /devices/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${device.id}`)
    .send({ access_token: anotherSession, clientId: 'test', manufacturer: 'test', model: 'test', description: 'test' })
  expect(status).toBe(401)
})

test('PUT /devices/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${device.id}`)
  expect(status).toBe(401)
})

test('PUT /devices/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, clientId: 'test', manufacturer: 'test', model: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /devices/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${device.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /devices/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${device.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /devices/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${device.id}`)
  expect(status).toBe(401)
})

test('DELETE /devices/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
