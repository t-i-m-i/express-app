import type { Request, Response, NextFunction } from 'express';

// Fastify: app.setErrorHandler((error, request, reply) => ...)
// Express: a middleware with FOUR parameters. Express detects error handlers by
// counting them, so keep `_next` even though it's unused. Register it LAST.
//
// Express 5 forwards thrown errors and rejected promises from async handlers here
// automatically (Express 4 required try/catch + next(err)).
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  console.error(`✖ ${req.method} ${req.originalUrl}`, err);

  if (res.headersSent) return; // response already started; nothing we can do
  res.status(500).json({ error: 'Internal Server Error' });
}
