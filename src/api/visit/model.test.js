import { Visit } from '.'
import { User } from '../user'

let user, visit

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  visit = await Visit.create({ createdBy: user, clientId: 'test', startDate: 'test', endDate: 'test', coordinate: 'test', maintenance: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = visit.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(visit.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.clientId).toBe(visit.clientId)
    expect(view.startDate).toBe(visit.startDate)
    expect(view.endDate).toBe(visit.endDate)
    expect(view.coordinate).toBe(visit.coordinate)
    expect(view.maintenance).toBe(visit.maintenance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = visit.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(visit.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.clientId).toBe(visit.clientId)
    expect(view.startDate).toBe(visit.startDate)
    expect(view.endDate).toBe(visit.endDate)
    expect(view.coordinate).toBe(visit.coordinate)
    expect(view.maintenance).toBe(visit.maintenance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
