import { Router } from 'express'

import { createModelo, getModeloById, getModelos, updateEstadoModelo, updateModelo } from '../controllers/modelo.controller.js'

import { authenticate } from '../middlewares/authenticate.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { requireJson } from '../middlewares/require-json.middleware.js'

import { createModeloSchema, getModelosSchema, modeloIdSchema, updateEstadoModeloSchema, updateModeloSchema } from '../validators/modelo.validator.js'

const router = Router()

router.use(authenticate)

router.get('/', authorize('instrumento.ver'), validate(getModelosSchema), getModelos)

router.get('/:id', authorize('instrumento.ver'), validate(modeloIdSchema), getModeloById)

router.post('/', authorize('catalogo.administrar'), requireJson, validate(createModeloSchema), createModelo)

router.patch('/:id', authorize('catalogo.administrar'), requireJson, validate(updateModeloSchema), updateModelo)

router.patch('/:id/estado', authorize('catalogo.administrar'), requireJson, validate(updateEstadoModeloSchema), updateEstadoModelo)

export default router