// Fastify: fastify.decorateRequest('user', ...) + a fastify.d.ts type extension.
// Express: nothing to register at runtime. `req.user = ...` just works because
// `req` is a plain object. This file only tells TypeScript the property exists.

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export {};
