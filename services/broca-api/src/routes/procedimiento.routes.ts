import { Router } from "express";

import { createProcedimiento, getProcedimientoById, getProcedimientos, updateEstadoProcedimiento, updateProcedimiento } from "../controllers/procedimiento.controller.js";

import { authenticate } from '../middlewares/authenticate.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { requireJson } from "../middlewares/require-json.middleware.js";

import { createProcedimientoSchema, procedimientoIdSchema, updateEstadoProcedimientoSchema, updateProcedimientoSchema } from "../validators/procedimiento.validator.js";

const router = Router()

router.use(authenticate)

router.get('/', authorize('instrumento.ver'), getProcedimientos)

router.get('/:id', authorize('instrumento.ver'), validate(procedimientoIdSchema), getProcedimientoById)

router.post('/', authorize('catalogo.administrar'), requireJson, validate(createProcedimientoSchema), createProcedimiento)

router.patch('/:id', authorize('catalogo.administrar'), requireJson, validate(updateProcedimientoSchema), updateProcedimiento)

router.patch('/:id/estado', authorize('catalogo.administrar'), requireJson, validate(updateEstadoProcedimientoSchema), updateEstadoProcedimiento)

export default router