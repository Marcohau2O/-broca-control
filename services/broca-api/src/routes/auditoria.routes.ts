import { Router } from "express";

import { getAuditoriaById, getAuditorias } from "../controllers/auditoria.controller.js";

import { authenticate } from "../middlewares/authenticate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import { auditoriaIdSchema, getAuditoriasSchema } from "../validators/auditoria.validator.js";

const router = Router()

router.use(authenticate)

router.get('/', authorize('auditoria.ver'), validate(getAuditoriasSchema), getAuditorias)

router.get('/:id', authorize('auditoria.ver'), validate(auditoriaIdSchema), getAuditoriaById)

export default router