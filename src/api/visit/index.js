import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update } from './controller'
import { schema } from './model'
export Visit, { schema } from './model'

const router = new Router()
const { clientId, startDate, endDate, coordinates, maintenance } = schema.tree

/**
 * @api {post} /visits Create visit
 * @apiName CreateVisit
 * @apiGroup Visit
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam clientId Visit's clientId.
 * @apiParam startDate Visit's startDate.
 * @apiParam endDate Visit's endDate.
 * @apiParam coordinates Visit's coordinates.
 * @apiParam maintenance Visit's maintenance.
 * @apiSuccess {Object} visit Visit's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Visit not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ clientId, startDate, endDate, coordinates, maintenance }),
  create)

/**
 * @api {get} /visits Retrieve visits
 * @apiName RetrieveVisits
 * @apiGroup Visit
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} visits List of visits.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /visits/:id Retrieve visit
 * @apiName RetrieveVisit
 * @apiGroup Visit
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} visit Visit's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Visit not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /visits/:id Update visit
 * @apiName UpdateVisit
 * @apiGroup Visit
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam clientId Visit's clientId.
 * @apiParam startDate Visit's startDate.
 * @apiParam endDate Visit's endDate.
 * @apiParam coordinates Visit's coordinates.
 * @apiParam maintenance Visit's maintenance.
 * @apiSuccess {Object} visit Visit's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Visit not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ clientId, startDate, endDate, coordinates, maintenance }),
  update)

export default router
