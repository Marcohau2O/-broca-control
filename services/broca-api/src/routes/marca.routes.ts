import { Router } from 'express'

import { createMarca, getMarcaById, getMarcas, updateEstadoMarca, updateMarca } from '../controllers/marca.controller.js'

import { authenticate } from '../middlewares/authenticate.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { requireJson } from '../middlewares/require-json.middleware.js'

import { createMarcaSchema, marcaIdSchema, updateEstadoMarcaSchema, updateMarcaSchema } from '../validators/marca.validator.js'

const router = Router()

router.use(authenticate)

router.get('/', authorize('instrumento.ver'), getMarcas)

router.get('/:id', authorize('instrumento.ver'), validate(marcaIdSchema), getMarcaById)

router.post('/', authorize('catalogo.administrar'), requireJson, validate(createMarcaSchema), createMarca)

router.patch('/:id', authorize('catalogo.administrar'), requireJson, validate(updateMarcaSchema), updateMarca)

router.patch('/:id/estado', authorize('catalogo.administrar'), requireJson, validate(updateEstadoMarcaSchema), updateEstadoMarca)

export default router