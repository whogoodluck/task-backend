import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger.js'

interface ErrorType extends Error {
  statusCode?: number
  isJoi?: boolean
  details?: { message: string }[]
}

const getErrorResponse = (err: ErrorType) => {
  const types: Record<string, { statusCode: number; message: string }> = {
    CastError: {
      statusCode: 400,
      message: 'malformatted id',
    },
    ValidationError: {
      statusCode: 422,
      message: err.isJoi && err.details ? err.details[0].message : 'validation failed',
    },
    HttpError: {
      statusCode: err.statusCode || 500,
      message: err.message,
    },
    default: {
      statusCode: err.statusCode || 500,
      message: 'something went wrong',
    },
  }
  return types[err.name] || types['default']
}

const errorHandler = (err: ErrorType, _req: Request, res: Response, next: NextFunction): any => {
  logger.error(err.message)
  const { statusCode, message } = getErrorResponse(err)

  next()
  return res.status(statusCode).json({ message })
}

export default errorHandler
