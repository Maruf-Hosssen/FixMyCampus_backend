import { ZodObject } from 'zod'
import { NextFunction, Request, Response } from 'express'
const validateRequest =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ body: req.body })
      return next()
    } catch (err) {
      next(err)
    }
  }

export default validateRequest
