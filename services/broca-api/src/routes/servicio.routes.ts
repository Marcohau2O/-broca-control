import { Router } from "express";

import { createServicio, getServicioById, getServicios, updateEstadoServicio, updateServicio } from '../controllers/servicio.controller.js'

import { authenticate } from '../middlewares/authenticate.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { requireJson } from "../middlewares/require-json.middleware.js";

import { createServicioSchema, servicioIdSchema, updateEstadoServicioSchema, updateServicioSchema } from '../validators/servicio.validator.js'

const router = Router()

router.use(authenticate)

router.get('/', authorize('instrumento.ver'), getServicios)

router.get('/:id', authorize('instrumento.ver'), validate(servicioIdSchema), getServicioById)

router.post('/', authorize('catalogo.administrar'), requireJson, validate(createServicioSchema), createServicio)

router.patch('/:id', authorize('catalogo.administrar'), requireJson, validate(updateServicioSchema), updateServicio)

router.patch('/:id/estado', authorize('catalogo.administrar'), requireJson, validate(updateEstadoServicioSchema),updateEstadoServicio)

export default router