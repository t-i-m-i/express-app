import type { Request, Response, NextFunction } from 'express';

// A teaching middleware: watch the request enter the chain and leave it.
//
// Fastify: addHook('onRequest') for the first line, addHook('onResponse') for the second.
// Express: one function. The "after" part is an event listener on `res`.
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  console.log(`→ ${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    console.log(`← ${req.method} ${req.originalUrl} ${res.statusCode} (${Date.now() - start}ms)`);
  });

  next(); // without this line the request would hang forever
}
