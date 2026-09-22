import type { NextFunction, Request, Response } from 'express'
import type { ZodType } from 'zod'

interface ValidatedRequest {
  body?: unknown
  query?: unknown
  params?: unknown
}

export function validate<T extends ValidatedRequest>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
        const result = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        })
        
        
        if (result.body !== undefined) {
            req.body = result.body
        }

        next()
        } catch (error) {
        next(error)
        }
    }
}