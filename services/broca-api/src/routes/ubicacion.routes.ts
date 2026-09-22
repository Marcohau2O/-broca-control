import { Router } from "express";

import { createUbicacion, getUbicaciones, getUbicacionById, updateUbicacion, updateEstadoUbicacion } from "../controllers/ubicacion.controller.js";

import { authenticate } from "../middlewares/authenticate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { requireJson } from "../middlewares/require-json.middleware.js";

import { createUbicacionSchema, ubicacionIdSchema, updateEstadoUbicacionSchema, updateUbicacionSchema } from "../validators/ubicacion.validator.js";

const router = Router()

router.use(authenticate)

router.get('/',  authorize('instrumento.ver'), getUbicaciones )
router.get('/:id', authorize('instrumento.ver'), validate(ubicacionIdSchema), getUbicacionById)
router.post('/', requireJson, authorize('catalogo.administrar'), validate(createUbicacionSchema), createUbicacion)
router.patch('/:id', requireJson, authorize('catalogo.administrar'), validate(updateUbicacionSchema), updateUbicacion)
router.patch('/:id/estado', requireJson, authorize('catalogo.administrar'), validate(updateEstadoUbicacionSchema),updateEstadoUbicacion)

export default router