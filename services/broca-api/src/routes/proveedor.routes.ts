import { Router } from "express";
import { createProveedor, getProveedorById, getProveedores, updateEstadoProveedor, updateProveedor } from "../controllers/proveedor.controller.js";

import { authenticate } from '../middlewares/authenticate.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { requireJson } from "../middlewares/require-json.middleware.js";

import { createProveedorSchema, proveedorIdSchema, updateEstadoProveedorSchema, updateProveedorSchema } from "../validators/proveedor.validator.js";

const router = Router()

router.use(authenticate)

router.get('/', authorize('instrumento.ver'), getProveedores)

router.get('/:id', authorize('instrumento.ver'), validate(proveedorIdSchema), getProveedorById)

router.post('/', authorize('catalogo.administrar'), requireJson, validate(createProveedorSchema), createProveedor)

router.patch('/:id', authorize('catalogo.administrar'), requireJson, validate(updateProveedorSchema), updateProveedor)

router.patch('/:id/estado', authorize('catalogo.administrar'), requireJson, validate(updateEstadoProveedorSchema), updateEstadoProveedor)

export default router