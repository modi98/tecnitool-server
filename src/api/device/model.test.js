import { Device } from '.'
import { User } from '../user'

let user, device

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  device = await Device.create({ createdBy: user, clientId: 'test', manufacturer: 'test', model: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = device.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(device.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.clientId).toBe(device.clientId)
    expect(view.manufacturer).toBe(device.manufacturer)
    expect(view.model).toBe(device.model)
    expect(view.description).toBe(device.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = device.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(device.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.clientId).toBe(device.clientId)
    expect(view.manufacturer).toBe(device.manufacturer)
    expect(view.model).toBe(device.model)
    expect(view.description).toBe(device.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
