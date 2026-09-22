import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";

type BodyParserError = SyntaxError & {
    status?: number
    statusCode?: number
    type?: string
    body?: unknown
    limit?: number
    length?: number
}


export const errorHandler: ErrorRequestHandler = (error, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ZodError) {
        res.status(400).json({
            status: 'error',
            message: 'Datos de entrada inválidos',
            errors: error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message
            })),
        })

        return
    }

    const bodyParserError = error as BodyParserError

    if (bodyParserError instanceof SyntaxError && bodyParserError.status === 400 && bodyParserError.type === 'entity.parse.failed') {
        res.status(400).json({
            status: 'error',
            message: 'JSON inválido',
            code: 'INVALID_JSON',
        })

        return
    }

    if (bodyParserError.status === 413 && bodyParserError.type === 'entity.too.large') {
         res.status(413).json({
            status: 'error',
            message:
            'El cuerpo de la solicitud es demasiado grande',
            code: 'PAYLOAD_TOO_LARGE',
        })

        return
    }

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
            ...(error.code && { code: error.code }),
        })

        return
    }

    console.error('Error no controlado:', error)

    res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor',
    })
}