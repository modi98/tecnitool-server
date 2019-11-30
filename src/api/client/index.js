import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Client, { schema } from './model'

const router = new Router()
const { name, phone, email, address, company } = schema.tree

/**
 * @api {post} /clients Create client
 * @apiName CreateClient
 * @apiGroup Client
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Client's name.
 * @apiParam phone Client's phone.
 * @apiParam email Client's email.
 * @apiParam address Client's address.
 * @apiParam company Client's company.
 * @apiSuccess {Object} client Client's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Client not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, phone, email, address, company }),
  create)

/**
 * @api {get} /clients Retrieve clients
 * @apiName RetrieveClients
 * @apiGroup Client
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} clients List of clients.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /clients/:id Retrieve client
 * @apiName RetrieveClient
 * @apiGroup Client
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} client Client's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Client not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /clients/:id Update client
 * @apiName UpdateClient
 * @apiGroup Client
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Client's name.
 * @apiParam phone Client's phone.
 * @apiParam email Client's email.
 * @apiParam address Client's address.
 * @apiParam company Client's company.
 * @apiSuccess {Object} client Client's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Client not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, phone, email, address, company }),
  update)

/**
 * @api {delete} /clients/:id Delete client
 * @apiName DeleteClient
 * @apiGroup Client
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Client not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
