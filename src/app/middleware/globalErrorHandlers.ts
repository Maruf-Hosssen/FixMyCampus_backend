import {
  Request,
  Response,
  NextFunction,
} from 'express'

import { ZodError } from 'zod'
import config from '../config'

import handleCastError, { TerrorSources } from '../error/castError'
import handleZodError from '../error/zodError'
import handleValidationError from '../error/validationError'
import { AppError } from '../error/appError'
import handleDuplicateError from '../error/duplicateError'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong!'
  let errorMessage = err.message || 'Something went wrong'

  let errorDetails: TerrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
    errorDetails = simplifiedError.errorDetails
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
    errorDetails = simplifiedError.errorDetails
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
    errorDetails = simplifiedError.errorDetails
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
    errorDetails = simplifiedError.errorDetails
  } else if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
    errorMessage = err.message

    errorDetails = [
      {
        path: '',
        message: err.message,
      },
    ]
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler