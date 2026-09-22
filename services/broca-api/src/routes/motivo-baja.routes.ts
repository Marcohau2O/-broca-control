import { Router } from "express";

import { createMotivoBaja, getMotivoBajaById, getMotivosBaja, updateEstadoMotivoBaja, updateMotivoBaja } from "../controllers/motivo-baja.controller.js";

import { authenticate } from "../middlewares/authenticate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { requireJson } from "../middlewares/require-json.middleware.js";

import { createMotivoBajaSchema, motivoBajaIdSchema, updateEstadoMotivoBajaSchema, updateMotivoBajaSchema } from "../validators/motivo-baja.validator.js";

const router = Router()

router.use(authenticate)

router.get('/', authorize('instrumento.ver'), getMotivosBaja)

router.get('/:id', authorize('instrumento.ver'), validate(motivoBajaIdSchema),getMotivoBajaById)

router.post('/', authorize('catalogo.administrar'), requireJson, validate(createMotivoBajaSchema), createMotivoBaja,)

router.patch('/:id', authorize('catalogo.administrar'), requireJson, validate(updateMotivoBajaSchema), updateMotivoBaja)

router.patch('/:id/estado', authorize('catalogo.administrar'), requireJson, validate(updateEstadoMotivoBajaSchema), updateEstadoMotivoBaja)

export default router