import { Router } from "express";

import { createInstrumento , getInstrumentoById, getInstrumentoByQrToken, getInstrumentos, updateEstadoInstrumento, updateInstrumento, updateUbicacionInstrumento, registrarUsoInstrumento, getUsosInstrumento, darBajaInstrumento } from "../controllers/instrumento.controller.js";

import { authenticate } from "../middlewares/authenticate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { requireJson } from "../middlewares/require-json.middleware.js";

import { createInstrumentoSchema, getInstrumentosSchema, instrumentoIdSchema, instrumentoQrSchema, updateEstadoOperativoInstrumentoSchema, updateInstrumentoSchema, updateUbicacionInstrumentoSchema, registrarUsoInstrumentoSchema, bajaInstrumentoSchema } from "../validators/instrumento.validator.js";

const router = Router()

router.use(authenticate)

router.get('/', authorize('instrumento.ver'), validate(getInstrumentosSchema), getInstrumentos)

router.get('/qr/:qrToken', authorize('instrumento.ver'), validate(instrumentoQrSchema), getInstrumentoByQrToken)

router.get('/:id/usos', authorize('instrumento.ver'), validate(instrumentoIdSchema), getUsosInstrumento)

router.get('/:id', authorize('instrumento.ver'), validate(instrumentoIdSchema), getInstrumentoById)


router.post('/', authorize('instrumento.crear'), requireJson, validate(createInstrumentoSchema), createInstrumento)

router.post('/:id/usos', authorize('uso.registrar'), requireJson, validate(registrarUsoInstrumentoSchema), registrarUsoInstrumento)

router.post('/:id/baja', authorize('baja.gestionar'), requireJson, validate(bajaInstrumentoSchema), darBajaInstrumento)


router.patch('/:id', authorize('instrumento.editar'), requireJson, validate(updateInstrumentoSchema), updateInstrumento)

router.patch('/:id/ubicacion', authorize('instrumento.editar'), requireJson, validate(updateUbicacionInstrumentoSchema), updateUbicacionInstrumento)

router.patch('/:id/estado', authorize('instrumento.editar'), requireJson, validate(updateEstadoOperativoInstrumentoSchema), updateEstadoInstrumento)


export default router