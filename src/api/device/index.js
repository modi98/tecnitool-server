import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Device, { schema } from './model'

const router = new Router()
const { clientId, manufacturer, model, description } = schema.tree

/**
 * @api {post} /devices Create device
 * @apiName CreateDevice
 * @apiGroup Device
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam clientId Device's clientId.
 * @apiParam manufacturer Device's manufacturer.
 * @apiParam model Device's model.
 * @apiParam description Device's description.
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ clientId, manufacturer, model, description }),
  create)

/**
 * @api {get} /devices Retrieve devices
 * @apiName RetrieveDevices
 * @apiGroup Device
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} devices List of devices.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /devices/:id Retrieve device
 * @apiName RetrieveDevice
 * @apiGroup Device
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /devices/:id Update device
 * @apiName UpdateDevice
 * @apiGroup Device
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam clientId Device's clientId.
 * @apiParam manufacturer Device's manufacturer.
 * @apiParam model Device's model.
 * @apiParam description Device's description.
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ clientId, manufacturer, model, description }),
  update)

/**
 * @api {delete} /devices/:id Delete device
 * @apiName DeleteDevice
 * @apiGroup Device
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Device not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
