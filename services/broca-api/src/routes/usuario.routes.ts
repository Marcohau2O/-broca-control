import { Router } from "express";

import { getUsuarioById, getUsuarios, createUsuario, updateUsuario, updateEstadoUsuario, updatePasswordUsuario } from "../controllers/usuario.controller.js";

import { authenticate } from '../middlewares/authenticate.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'

import { usuarioIdSchema, createUsuarioSchema, updateUsuarioSchema, updateEstadoUsuarioSchema, updatePasswordUsuarioSchema } from "../validators/usuario.validator.js";

import { requireJson } from "../middlewares/require-json.middleware.js";

const router = Router()

router.use(authenticate)

router.get('/', authorize('usuario.ver'), getUsuarios)

router.post('/', authorize('usuario.crear'), requireJson, validate(createUsuarioSchema), createUsuario)

router.get('/:id', authorize('usuario.ver'), validate(usuarioIdSchema), getUsuarioById)

router.patch('/:id', authorize('usuario.editar'), requireJson, validate(updateUsuarioSchema), updateUsuario)

router.patch('/:id/estado', authorize('usuario.editar'), requireJson, validate(updateEstadoUsuarioSchema), updateEstadoUsuario)

router.patch('/:id/password', authorize('usuario.editar'), requireJson, validate(updatePasswordUsuarioSchema), updatePasswordUsuario)

export default router