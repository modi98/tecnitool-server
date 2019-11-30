import { success, notFound } from '../../services/response/'
import { Visit } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Visit.create({ ...body, createdBy: user })
    .then((visit) => visit.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Visit.find(query, select, cursor)
    .populate('createdBy')
    .then((visits) => visits.map((visit) => visit.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Visit.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((visit) => visit ? visit.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Visit.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((visit) => visit ? Object.assign(visit, body).save() : null)
    .then((visit) => visit ? visit.view(true) : null)
    .then(success(res))
    .catch(next)
