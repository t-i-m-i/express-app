import type { Request, Response, NextFunction, RequestHandler } from 'express';
import type { TSchema } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';

// Fastify: `{ schema: { body } }` on a route; Fastify compiles and validates for you.
// Express: validation is a middleware you put in front of the controller.
//
// This is a "factory": calling validateBody(schema) RETURNS a (req, res, next) function,
// the same pattern as cors({...}) and helmet().
export function validateBody(schema: TSchema): RequestHandler {
  const check = TypeCompiler.Compile(schema); // compiled once, at startup

  return (req: Request, res: Response, next: NextFunction) => {
    if (check.Check(req.body)) {
      next();
      return;
    }
    const details = [...check.Errors(req.body)].map(e => `${e.path || '/'}: ${e.message}`);
    res.status(400).json({ error: 'Invalid request body', details });
  };
}
