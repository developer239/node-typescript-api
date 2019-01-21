import Boom from 'boom'
import logger from "~/utils/logger";

const handleError = (message: string, data: { code: number }, error?: string): Boom => {
  if (data.code === 500) {
    logger.error(`SERVER 500 💣💥: ${error}`)
  }
  return Boom.badData(message, data)
}

export enum ErrorCodes {
  VALIDATION_ERROR = 400,
  NOT_FOUND_ERROR = 404,
  UNAUTHORIZED_ERROR = 401,
  IDLE_TIMEOUT_ERROR = 401,
  CONFLICT_ERROR = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export const validationError = (customMessage?: string) =>
  handleError(customMessage || 'Invalid or missing request data.', {
    code: ErrorCodes.VALIDATION_ERROR,
  })

export const notFoundError = (customMessage?: string) =>
  handleError(customMessage || 'Resource not found', {
    code: ErrorCodes.NOT_FOUND_ERROR,
  })

export const unauthorizedError = () =>
  handleError('Access denied', {
    code: ErrorCodes.UNAUTHORIZED_ERROR,
  })

export const idleTimeoutError = () =>
  handleError('Access denied [timeout] ', {
    code: ErrorCodes.IDLE_TIMEOUT_ERROR,
  })

export const conflictError = (message: string) =>
  handleError(
    message || 'The request could not be completed due to a conflict with the current state of the resource.',
    {
      code: ErrorCodes.CONFLICT_ERROR,
    }
  )

export const invalidCredentials = () =>
  handleError('Invalid credentials', {
    code: ErrorCodes.UNAUTHORIZED_ERROR,
  })

export const internalServerError = (responseError: string) =>
  handleError(
    'Something went wrong. Please try again later..', {
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
    },
    responseError
  )

export default {
  validationError,
  notFoundError,
  unauthorizedError,
  idleTimeoutError,
  conflictError,
  invalidCredentials,
  internalServerError,
}
