import { Request, Response, NextFunction } from 'express';

export const notFound = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const error = new Error(`Not Found - ${request.originalUrl}`);
  response.status(404);
  next(error);
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  response.status(statusCode);

  response.json({
    message: error.message,
    stack:
      process.env.NODE_ENV === 'production'
        ? 'Please contact our support.'
        : error.stack,
  });
};
