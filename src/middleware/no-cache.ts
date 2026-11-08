import type { Request, Response, NextFunction } from 'express';

// Fastify: addHook('onSend', ...) sets Cache-Control just before the response leaves.
// Express has no onSend. The header doesn't depend on the body, so set it up front.
export function noCache(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('Cache-Control', 'no-store');
  next();
}
