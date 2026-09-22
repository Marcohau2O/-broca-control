import { Router } from "express";

import { getDashboardDistribucionUsos, getDashboardResumen, getDashboardUsos } from "../controllers/dashboard.controller.js";

import { authenticate } from '../middlewares/authenticate.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'
import { validate } from "../middlewares/validate.middleware.js";

import { dashboardUsosQuerySchema } from "../validators/ashboard.validator.js";

const router = Router()

router.use(authenticate)

router.get('/resumen', authorize('instrumento.ver'), getDashboardResumen)

router.get('/usos', authorize('instrumento.ver'), validate(dashboardUsosQuerySchema), getDashboardUsos)

router.get('/distribucion-usos', authorize('instrumento.ver'), validate(dashboardUsosQuerySchema), getDashboardDistribucionUsos)

export default router