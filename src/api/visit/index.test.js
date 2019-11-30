import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Visit } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, visit

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  visit = await Visit.create({ createdBy: user })
})

test('POST /visits 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, clientId: 'test', startDate: 'test', endDate: 'test', coordinate: 'test', maintenance: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.clientId).toEqual('test')
  expect(body.startDate).toEqual('test')
  expect(body.endDate).toEqual('test')
  expect(body.coordinate).toEqual('test')
  expect(body.maintenance).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /visits 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /visits 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].createdBy).toEqual('object')
})

test('GET /visits 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /visits/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${visit.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(visit.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /visits/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${visit.id}`)
  expect(status).toBe(401)
})

test('GET /visits/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /visits/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${visit.id}`)
    .send({ access_token: adminSession, clientId: 'test', startDate: 'test', endDate: 'test', coordinate: 'test', maintenance: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(visit.id)
  expect(body.clientId).toEqual('test')
  expect(body.startDate).toEqual('test')
  expect(body.endDate).toEqual('test')
  expect(body.coordinate).toEqual('test')
  expect(body.maintenance).toEqual('test')
})

test('PUT /visits/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${visit.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /visits/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${visit.id}`)
  expect(status).toBe(401)
})

test('PUT /visits/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, clientId: 'test', startDate: 'test', endDate: 'test', coordinate: 'test', maintenance: 'test' })
  expect(status).toBe(404)
})
