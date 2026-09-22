import { Router } from 'express'

import { createTipoInstrumento, getTipoInstrumentoById, getTiposInstrumento, updateEstadoTipoInstrumento, updateTipoInstrumento } from '../controllers/tipo-instrumento.controller.js'

import { authenticate } from '../middlewares/authenticate.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { requireJson } from '../middlewares/require-json.middleware.js'

import { createTipoInstrumentoSchema, tipoInstrumentoIdSchema, updateEstadoTipoInstrumentoSchema, updateTipoInstrumentoSchema } from '../validators/tipo-instrumento.validator.js'

const router = Router()

router.use(authenticate)

router.get('/', authorize('instrumento.ver'), getTiposInstrumento)

router.get('/:id', authorize('instrumento.ver'), validate(tipoInstrumentoIdSchema), getTipoInstrumentoById)

router.post('/', authorize('catalogo.administrar'), requireJson, validate(createTipoInstrumentoSchema), createTipoInstrumento)

router.patch('/:id', authorize('catalogo.administrar'), requireJson, validate(updateTipoInstrumentoSchema), updateTipoInstrumento)

router.patch('/:id/estado', authorize('catalogo.administrar'), requireJson, validate(updateEstadoTipoInstrumentoSchema), updateEstadoTipoInstrumento)

export default router