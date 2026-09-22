import { Router } from "express";

import { getAlertaById, getAlertas, revisarAlerta } from "../controllers/alerta.controller.js";

import { authenticate } from "../middlewares/authenticate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { requireJson } from "../middlewares/require-json.middleware.js";

import { alertaIdSchema, getAlertasSchema } from "../validators/alerta.validator.js";

const router = Router()

router.use(authenticate)

router.get('/', authorize('instrumento.ver'), validate(getAlertasSchema), getAlertas)

router.get('/:id', authorize('instrumento.ver'), validate(alertaIdSchema), getAlertaById)

router.patch('/:id/revisar', authorize('instrumento.editar'), requireJson, validate(alertaIdSchema), revisarAlerta)

export default router