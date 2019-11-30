import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Device } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Device.create({ ...body, createdBy: user })
    .then((device) => device.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Device.find(query, select, cursor)
    .populate('createdBy')
    .then((devices) => devices.map((device) => device.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Device.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((device) => device ? device.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Device.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((device) => device ? Object.assign(device, body).save() : null)
    .then((device) => device ? device.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Device.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((device) => device ? device.remove() : null)
    .then(success(res, 204))
    .catch(next)
