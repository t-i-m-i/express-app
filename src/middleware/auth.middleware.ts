import type { Request, Response, NextFunction } from 'express';

// Fastify: authPlugin = decorateRequest('user') + addHook('preHandler', ...) wrapped in fp().
// Express: just a function. Register it with app.use() and everything below it is protected.
//
// The caller sends `x-user-id: <anything>`; that value IS the user id.
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = req.header('x-user-id');

  if (!userId) {
    // Respond and RETURN. Do not also call next().
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  req.user = { id: userId }; // this is the whole "decorateRequest"
  next(); // hand over to the next function in the chain
}
