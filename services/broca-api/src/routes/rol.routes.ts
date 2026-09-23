import { Router } from "express";

import { getRoles } from "../controllers/rol.controller.js";

import { authenticate } from '../middlewares/authenticate.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'


const router = Router()

router.use(authenticate)

router.get('/', authorize('rol.administrar'), getRoles)

export default router